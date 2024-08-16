import NavbarBo from '@/components/partials/navbar-bo'
import SidebarBo from '@/components/partials/sidebar-bo'
import React from 'react'

const BackOfficeLayout = ({children}: {children: React.ReactNode}) => {


  return (
    <>
      <section className='flex'>
        
        <SidebarBo/>
        
        <div className='bg-secondary/30 flex-1'>
          
          <NavbarBo/>

          <main className='p-8'>
              {children}
          </main>
        </div>
        
      </section>
    </>
  )
}

export default BackOfficeLayout