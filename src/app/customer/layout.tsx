'use client'

import NavbarBo from '@/components/partials/navbar-bo'
import SidebarCustomer from '@/components/partials/sidebar-customer'
import React, { useContext, useEffect, useState } from 'react'
import MainLayout from '../main-layout'
import toast from 'react-hot-toast'
import { useProfile } from '@/store/use-profile'
import { useRouter } from 'next/navigation'
import LoadingState from '@/components/ui/loading-state'
import { AuthContex } from '@/providers/auth-provider'

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { data: user } = useProfile()
  const { authState } = useContext(AuthContex)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    if (authState._auth && authState._is_auth && authState._avaibility) {
      if (authState._avaibility !== 'customer') {
        router.push('/back-office/dashboard')
        toast.error('You are not authorized to access this page')
      }
    } else {
      router.push('/login')
      toast.error('You are not authorized to access this page')
    }
  }, [authState, isClient])

  if (!isClient || !authState._auth || !authState._is_auth || !authState._avaibility) {
    return <LoadingState />
  }

  return (
    <section className='flex'>
      <SidebarCustomer is_corporate={authState._is_pic} />
      <div className='bg-secondary/30 flex-1'>
        <NavbarBo />
        <MainLayout>
          <main className='p-8 h-[90vh] overflow-auto mt-20'>
            {children}
          </main>
        </MainLayout>
      </div>
    </section>
  )
}

export default CustomerLayout
