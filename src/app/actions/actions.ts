"use server";

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ApplicationStatus, JobType, Priority, WorkMode } from "@prisma/client";
import { revalidatePath } from "next/cache";

type ActionResult = { success: true } | { success: false; error: string };

// ─────────────────────────────────────────────
// USER
// ─────────────────────────────────────────────

export async function syncUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  return prisma.user.upsert({
    where: { clerkId: userId },
    update: {
      email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
      name: clerkUser.fullName ?? "",
    },
    create: {
      clerkId: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
      name: clerkUser.fullName ?? "",
    },
  });
}

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { clerkId: userId },
  });
}

// ─────────────────────────────────────────────
// READ
// ─────────────────────────────────────────────

export async function getJobs() {
  const { userId } = await auth();
  if (!userId) return [];

  return prisma.job.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getJobById(id: string) {
  const { userId } = await auth();
  if (!userId) return null;

  return prisma.job.findFirst({
    where: { id, userId },
  });
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function parseFormData(formData: FormData) {
  return {
    company:     formData.get("company") as string,
    role:        formData.get("role") as string,
    location:    (formData.get("location") as string) || null,
    salaryMin:   formData.get("salaryMin") ? Number(formData.get("salaryMin")) : null,
    salaryMax:   formData.get("salaryMax") ? Number(formData.get("salaryMax")) : null,
    jobType:     formData.get("jobType") as JobType,
    workMode:    formData.get("workMode") as WorkMode,
    status:      formData.get("status") as ApplicationStatus,
    priority:    formData.get("priority") as Priority,
    appliedDate: formData.get("appliedDate")
                   ? new Date(formData.get("appliedDate") as string)
                   : null,
    jobUrl:      (formData.get("jobUrl") as string) || null,
    notes:       (formData.get("notes") as string) || null,
  };
}

// ─────────────────────────────────────────────
// CREATE
// ─────────────────────────────────────────────

export async function createJob(formData: FormData): Promise<ActionResult> {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const data = parseFormData(formData);

    if (!data.company || !data.role) {
      return { success: false, error: "Company and role are required" };
    }

    await prisma.job.create({ data: { ...data, userId } });

    revalidatePath("/jobs");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to create job" };
  }
}

// ─────────────────────────────────────────────
// UPDATE
// — id comes from a hidden <input name="id"> in the form
// ─────────────────────────────────────────────

export async function updateJob(formData: FormData): Promise<ActionResult> {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const id = formData.get("id") as string;
    if (!id) return { success: false, error: "Job ID is required" };

    // ownership check — never skip this
    const existing = await prisma.job.findFirst({ where: { id, userId } });
    if (!existing) return { success: false, error: "Job not found" };

    const data = parseFormData(formData);

    await prisma.job.update({ where: { id }, data });

    revalidatePath("/jobs");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update job" };
  }
}

// ─────────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────────

export async function deleteJob(id: string): Promise<ActionResult> {
  try {
    if (!id) return { success: false, error: "Job ID is required" };

    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    // ownership check — prevents deleting another user's job
    const existing = await prisma.job.findFirst({ where: { id, userId } });
    if (!existing) return { success: false, error: "Job not found" };

    await prisma.job.delete({ where: { id } });

    revalidatePath("/jobs");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete job" };
  }
}

// ─────────────────────────────────────────────
// QUICK UPDATES
// ─────────────────────────────────────────────

export async function updateJobStatus(
  id: string,
  status: ApplicationStatus
): Promise<ActionResult> {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const existing = await prisma.job.findFirst({ where: { id, userId } });
    if (!existing) return { success: false, error: "Job not found" };

    await prisma.job.update({ where: { id }, data: { status } });

    revalidatePath("/jobs");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update status" };
  }
}

export async function updateJobPriority(
  id: string,
  priority: Priority
): Promise<ActionResult> {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const existing = await prisma.job.findFirst({ where: { id, userId } });
    if (!existing) return { success: false, error: "Job not found" };

    await prisma.job.update({ where: { id }, data: { priority } });

    revalidatePath("/jobs");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update priority" };
  }
}