import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) return null;

  return prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
}