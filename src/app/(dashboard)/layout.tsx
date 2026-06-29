import DashboardNavbar from '@/components/ui/dashboardnav';
import Sidebar from '@/components/ui/sidebar';
import React from 'react'


const layout = ({children }: {children: React.ReactNode}) => {
  return (
    <div>
      <Sidebar/>
      <DashboardNavbar/>
      <main>
        {children}
      </main>
    </div>
  )
}

export default layout