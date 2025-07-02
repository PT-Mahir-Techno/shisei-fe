'use client'

import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { RiShoppingBag2Fill, RiStackFill } from 'react-icons/ri'
import ActivePackageCard from './_parts/active-package'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import toast from 'react-hot-toast'
import Link from 'next/link'

type Checked = DropdownMenuCheckboxItemProps["checked"]

const LoadingSkeleton = () => (
  <div className='flex flex-col gap-4'>
    <Skeleton className="w-1/2 h-6" />
    <Skeleton className="w-full h-8" />
    <Skeleton className="w-full h-8" />
  </div>
)

const SharedCreditPage = () => {
  const [activePackages, setActivePackages] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    initState()
  }, [])

  const initState = async () => {
    setLoading(true)
    try {
      const activePackage = await api.get(`${baseUrl}/shared-package`)
      setActivePackages(activePackage.data)
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      toast.error(error.data.message)
    }
  } 


  return (
    <>
      <section className='bg-background p-5 rounded-lg mb-8'>
        <div className='mb-6 flex justify-end'>
          <Link href='/booking'>
            <Button size={"lg"}> <RiShoppingBag2Fill className='mr-2'/> Buy a package</Button>
          </Link>
        </div>
        <div className='flex justify-between items-center pb-3 border-b border-gray-200 mb-5'>
          <div className='flex gap-2 items-center'>
            <RiStackFill className='text-primary' size={26} />
            <h2 className='font-noto_serif font-bold text-xl text-gray-800'>My Shared Credit</h2>
          </div>
        </div>

        {
         loading ? <LoadingSkeleton /> : (
          activePackages.length > 0 ? (
            <div>
              {
                activePackages.map((item:any, index:number) => (
                    <ActivePackageCard key={index} data={item} />
                ))
              }
            </div>
          ): (
            <div className='flex flex-col gap-4 text-center'>
              <p className='text-gray-400'>No active package</p>
            </div>
          )
         )
        }

      </section>
    </>
  )
}

export default SharedCreditPage