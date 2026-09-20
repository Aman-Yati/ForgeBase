import CalendarView from '@/components/calendar/calendar';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { api } from "@/lib/api";
import React from 'react'

const Calendar = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

 const jobs = await api.getJobsByUser(userId);
  return (
    <div>
      <CalendarView jobs={jobs}/>
    </div>
  )
}

export default Calendar