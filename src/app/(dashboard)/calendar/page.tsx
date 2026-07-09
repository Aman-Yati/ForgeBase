import CalendarView from '@/components/calendar/calendar';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import {prisma} from "@/lib/prisma";
import React from 'react'

const Calendar = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

 const jobs = await prisma.job.findMany({
  orderBy: {
    createdAt: "desc",
  },
});
  return (
    <div>
      <CalendarView jobs={jobs}/>
    </div>
  )
}

export default Calendar