'use client'

import NavbarBo from '@/components/partials/navbar-bo'
import SidebarCustomer from '@/components/partials/sidebar-customer'
import React, { useContext, useEffect } from 'react'
import MainLayout from '../main-layout'
import toast from 'react-hot-toast'
import { useProfile } from '@/store/use-profile'
import { useRouter } from 'next/navigation'
import LoadingState from '@/components/ui/loading-state'
import { AuthContex } from '@/providers/auth-provider'

const CustomerLayout = ({children}: {children: React.ReactNode}) => {

  const router = useRouter()
  
  const { data:user, role } = useProfile()

  const {authState} = useContext(AuthContex)
  // console.log(authState)

  const initState = () => {
    if (authState._auth && authState._is_auth && authState._avaibility) {
      if(authState._avaibility !== 'customer'){
        router.push('/back-office/dashboard')
        toast.error('You are not authorized to access this page')
      }
    }else{
      router.push('/login')
      toast.error('You are not authorized to access this page')
    }
  }

  useEffect(() => {
    initState()
  }, [])

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
      {
        !user  && <LoadingState />
      }
    </>
  )
}

export default CustomerLayout