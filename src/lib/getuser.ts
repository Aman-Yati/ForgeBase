import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) return null;

  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  return await prisma.user.upsert({
    where: {
      clerkId: userId,
    },
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