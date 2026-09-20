import { auth } from '@clerk/nextjs/server';

import type { Job } from '@/types/job';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

function buildQueryString(filters?: Record<string, string | number | undefined | null>) {
  const params = new URLSearchParams();

  Object.entries(filters ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    params.set(key, String(value));
  });

  const query = params.toString();
  return query ? `?${query}` : '';
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const authObject = await auth();
  const token = authObject.userId ? await authObject.getToken() : null;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `API request failed: ${response.statusText}`);
  }

  const responseBody = await response.text();
  return responseBody ? (JSON.parse(responseBody) as T) : (undefined as T);
}

type ApiPayload = Record<string, unknown>;

export interface ApiUser {
  clerkId: string;
  email: string;
  name: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export const api = {
  // User endpoints
  syncUser: (clerkId: string, email: string, name: string): Promise<ApiUser> =>
    apiRequest<ApiUser>('/api/users/sync', {
      method: 'POST',
      body: JSON.stringify({ clerkId, email, name }),
    }),

  getUserById: (id: string): Promise<ApiUser> =>
    apiRequest<ApiUser>(`/api/users/${id}`),

  getUserByEmail: (email: string) =>
    apiRequest(`/api/users/email/${email}`),

  getAllUsers: () =>
    apiRequest('/api/users'),

  checkEmailExists: (email: string) =>
    apiRequest(`/api/users/exists/email/${email}`),

  updateUser: (id: string, data: ApiPayload) =>
    apiRequest(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteUser: (id: string) =>
    apiRequest(`/api/users/${id}`, {
      method: 'DELETE',
    }),

  // Job endpoints
  createJob: (data: ApiPayload) =>
    apiRequest('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getJobById: (id: string): Promise<Job> =>
    apiRequest<Job>(`/api/jobs/${id}`),

  getAllJobs: (filters?: Record<string, string | number | undefined | null>) =>
    apiRequest<Job[]>(`/api/jobs${buildQueryString(filters)}`),

  getJobsByUser: (userId: string): Promise<Job[]> =>
    apiRequest<Job[]>(`/api/jobs/user/${userId}`),

  getJobsByUserAndStatus: (userId: string, status: string): Promise<Job[]> =>
    apiRequest<Job[]>(`/api/jobs/user/${userId}/status/${status}`),

  getJobsByCompany: (company: string): Promise<Job[]> =>
    apiRequest<Job[]>(`/api/jobs/company/${company}`),

  updateJob: (id: string, data: ApiPayload) =>
    apiRequest(`/api/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteJob: (id: string) =>
    apiRequest(`/api/jobs/${id}`, {
      method: 'DELETE',
    }),

  deleteJobsByUser: (userId: string) =>
    apiRequest(`/api/jobs/user/${userId}`, {
      method: 'DELETE',
    }),

  updateJobStatus: (id: string, status: string) =>
    apiRequest(`/api/jobs/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(status),
    }),

  updateJobPriority: (id: string, priority: string) =>
    apiRequest(`/api/jobs/${id}/priority`, {
      method: 'PATCH',
      body: JSON.stringify(priority),
    }),
};
