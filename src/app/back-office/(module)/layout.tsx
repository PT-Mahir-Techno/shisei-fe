import NavbarBo from '@/components/partials/navbar-bo'
import SidebarBo from '@/components/partials/sidebar-bo'
import React from 'react'
import MainLayout from '../../main-layout'

const BackOfficeLayout = ({children}: {children: React.ReactNode}) => {


  return (
    <>
      <section className='flex'>
        
        <SidebarBo/>
        
        <div className='bg-secondary/30 flex-1'>
          
          <NavbarBo/>
          
          <MainLayout>
            <main className='p-8 h-[92vh] overflow-auto'>
                {children}
            </main>
          </MainLayout>
        </div>
        
      </section>
    </>
  )
}

export default BackOfficeLayout