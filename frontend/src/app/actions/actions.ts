"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";

type ActionResult = { success: true } | { success: false; error: string };

export async function syncUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  try {
    return await api.syncUser(
      userId,
      clerkUser.emailAddresses[0]?.emailAddress ?? "",
      clerkUser.fullName ?? ""
    );
  } catch (error) {
    console.error("Failed to sync user:", error);
    return null;
  }
}

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  try {
    return await api.getUserById(userId);
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

export async function getJobs() {
  const { userId } = await auth();
  if (!userId) return [];

  try {
    return await api.getJobsByUser(userId);
  } catch (error) {
    console.error("Failed to get jobs:", error);
    return [];
  }
}

export async function getJobById(id: string) {
  const { userId } = await auth();
  if (!userId) return null;
  if (!id) return null;

  try {
    return await api.getJobById(id);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    // If job not found, return null instead of throwing
    if (message.includes("not found") || message.includes("Job not found")) {
      return null;
    }
    console.error("Failed to get job:", error);
    return null;
  }
}

function parseFormData(formData: FormData) {
  return {
    company:     formData.get("company") as string,
    role:        formData.get("role") as string,
    location:    (formData.get("location") as string) || null,
    salaryMin:   formData.get("salaryMin") ? Number(formData.get("salaryMin")) : null,
    salaryMax:   formData.get("salaryMax") ? Number(formData.get("salaryMax")) : null,
    jobType:     formData.get("jobType") as string,
    workMode:    formData.get("workMode") as string,
    status:      formData.get("status") as string,
    priority:    formData.get("priority") as string,
    appliedDate: formData.get("appliedDate")
                   ? new Date(formData.get("appliedDate") as string).toISOString()
                   : null,
    jobUrl:      (formData.get("jobUrl") as string) || null,
    notes:       (formData.get("notes") as string) || null,
  };
}

export async function createJob(formData: FormData): Promise<ActionResult> {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const data = parseFormData(formData);

    if (!data.company || !data.role) {
      return { success: false, error: "Company and role are required" };
    }

    await api.createJob({ ...data, userId });

    revalidatePath("/jobs");
    return { success: true };
  } catch (error) {
    console.error("Failed to create job:", error);
    return { success: false, error: "Failed to create job" };
  }
}

export async function updateJob(formData: FormData): Promise<ActionResult> {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const id = formData.get("id") as string;
    if (!id) return { success: false, error: "Job ID is required" };

    const data = parseFormData(formData);

    await api.updateJob(id, data);

    revalidatePath("/jobs");
    return { success: true };
  } catch (error) {
    console.error("Failed to update job:", error);
    return { success: false, error: "Failed to update job" };
  }
}

export async function deleteJob(id: string): Promise<ActionResult> {
  try {
    if (!id) return { success: false, error: "Job ID is required" };

    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    await api.deleteJob(id);

    revalidatePath("/jobs");
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Failed to delete job:", error);
    // If the error is about job not found, it was likely already deleted - treat as success
    if (message.includes("not found") || message.includes("Job not found")) {
      revalidatePath("/jobs");
      return { success: true };
    }
    return { success: false, error: message || "Failed to delete job" };
  }
}

export async function updateJobStatus(
  id: string,
  status: string
): Promise<ActionResult> {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    await api.updateJobStatus(id, status);

    revalidatePath("/jobs");
    return { success: true };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function updateJobPriority(
  id: string,
  priority: string
): Promise<ActionResult> {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    await api.updateJobPriority(id, priority);

    revalidatePath("/jobs");
    return { success: true };
  } catch (error) {
    console.error("Failed to update priority:", error);
    return { success: false, error: "Failed to update priority" };
  }
}