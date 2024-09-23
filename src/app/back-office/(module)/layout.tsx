'use client'

import NavbarBo from '@/components/partials/navbar-bo'
import SidebarBo from '@/components/partials/sidebar-bo'
import React, { useContext, useEffect } from 'react'
import MainLayout from '../../main-layout'
import { useRouter } from 'next/navigation'
import LoadingState from '@/components/ui/loading-state'
import { useProfile } from '@/store/use-profile'
import toast from 'react-hot-toast'
import { AuthContex } from '@/providers/auth-provider'

const BackOfficeLayout = ({children}: {children: React.ReactNode}) => {

  const {authState} = useContext(AuthContex)
  
  const router = useRouter()
  const { data:user, role } = useProfile()

  const initState = () => {
    if (authState._auth && authState._is_auth && authState._avaibility) {
      if(authState._avaibility === 'customer'){
        router.push('/customer/dashboard')
        toast.error('You are not authorized to access this page')
      }
    }else{
      router.push('/back-office/login')
      toast.error('You are not authorized to access this page')
    }
  }

  useEffect(() => {
    initState()
  }, [])

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
      {
        !user  && <LoadingState />
      }
    </>
  )
}

export default BackOfficeLayout