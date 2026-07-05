import Jobcard from '@/components/jobs/jobcard';
import { prisma } from '@/lib/prisma';
import React from 'react'

const Jobs = async () => {
  const jobs = await prisma.job.findMany({
    where: {
      userId: 'clerk_user_id',
    },
  });

  return (
    <div>
      {jobs.map((job) => (
        <Jobcard
          key={job.id}
          company={job.company}
          role={job.role}
          status={job.status}
          priority={job.priority}
          location={job.location}
          appliedDate={job.appliedDate}
        />
      ))}
    </div>
  )
}

export default Jobs