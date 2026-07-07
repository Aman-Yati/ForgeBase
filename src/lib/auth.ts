// lib/auth.ts
import { auth } from "@clerk/nextjs/server";

export async function requireUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}