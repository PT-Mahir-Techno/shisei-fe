import NavbarBo from '@/components/partials/navbar-bo'
import SidebarBo from '@/components/partials/sidebar-bo'
import SidebarCustomer from '@/components/partials/sidebar-customer'
import React from 'react'
import MainLayout from '../main-layout'

const CustomerLayout = ({children}: {children: React.ReactNode}) => {


  return (
    <>
      <section className='flex'>
        
        <SidebarCustomer/>
        
        <div className='bg-secondary/30 flex-1'>
          
          <NavbarBo/>

          <MainLayout>
            <main className='p-8 h-[90vh] overflow-auto'>
                {children}
            </main>
          </MainLayout>
          
        </div>
        
      </section>
    </>
  )
}

export default CustomerLayout