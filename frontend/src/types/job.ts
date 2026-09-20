export type JobStatus = 'WISHLIST' | 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED' | 'WITHDRAWN';
export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
export type WorkMode = 'REMOTE' | 'HYBRID' | 'ONSITE';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export const JOB_STATUS_OPTIONS: JobStatus[] = [
  'WISHLIST',
  'APPLIED',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
  'WITHDRAWN',
];

export const JOB_TYPE_OPTIONS: JobType[] = [
  'FULL_TIME',
  'PART_TIME',
  'CONTRACT',
  'INTERNSHIP',
];

export const WORK_MODE_OPTIONS: WorkMode[] = ['REMOTE', 'HYBRID', 'ONSITE'];
export const PRIORITY_OPTIONS: Priority[] = ['LOW', 'MEDIUM', 'HIGH'];

export interface Job {
  id: string;
  company: string;
  role: string;
  location: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  jobType: JobType;
  workMode: WorkMode;
  status: JobStatus;
  priority: Priority;
  appliedDate: string | Date | null;
  jobUrl: string | null;
  notes: string | null;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
