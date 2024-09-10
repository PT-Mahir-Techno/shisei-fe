'use client'

import NavbarBo from '@/components/partials/navbar-bo'
import SidebarBo from '@/components/partials/sidebar-bo'
import React, { useEffect } from 'react'
import MainLayout from '../../main-layout'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import LoadingState from '@/components/ui/loading-state'
import Cookies from 'js-cookie'
import { useProfile } from '@/store/use-profile'

const BackOfficeLayout = ({children}: {children: React.ReactNode}) => {
  
  const router = useRouter()
  
  const { data:user, getPorfile } = useProfile()
  const {logout} = useAuth()

  useEffect(() => {

    const auth = Cookies.get('_auth')

    if (auth) {
      getPorfile()
      console.log(user)
    }else{
      console.log(user)
      logout("/admin/logout")
      router.replace('/back-office/login')
    }
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