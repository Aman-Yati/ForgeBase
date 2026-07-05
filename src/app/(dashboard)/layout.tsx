import DashboardNavbar from '@/components/ui/dashboardnav';
import Sidebar from '@/components/ui/sidebar';
import React from 'react'


const layout = ({children }: {children: React.ReactNode}) => {
  return (
    <div>
      <Sidebar/>
      <DashboardNavbar/>
      <main className="lg:ml-72 pt-16 min-h-screen bg-[#070B16] p-6">
        {children}
      </main>
    </div>
  )
}

export default layout