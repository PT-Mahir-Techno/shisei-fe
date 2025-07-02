'use client'

import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { RiArrowDropDownLine, RiCoupon2Fill, RiCoupon3Fill, RiHourglassFill, RiShoppingBag2Fill, RiStackFill } from 'react-icons/ri'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { numberToIdr } from '@/lib/utils'

type Checked = DropdownMenuCheckboxItemProps["checked"]

const LoadingSkeleton = () => (
  <div className='flex flex-col gap-4'>
    <Skeleton className="w-1/2 h-6" />
    <Skeleton className="w-full h-8" />
    <Skeleton className="w-full h-8" />
  </div>
)

const PackageCustomerPage = () => {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [activePackages, setActivePackages] = React.useState([])
  const [expiredPackages, setExpiredPackages] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    initState()
  }, [])

  const initState = async () => {
    setLoading(true)
    try {
      const activePackage = await api.get(`${baseUrl}/coupon`)
      const expiredPackage = await api.get(`${baseUrl}/coupon-corporate`)
      
      setActivePackages(activePackage.data)
      setExpiredPackages(expiredPackage.data)
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
          <Link href='/package'>
            <Button size={"lg"}> <RiShoppingBag2Fill className='mr-2'/> Buy a package</Button>
          </Link>
        </div>
        <div className='flex justify-between items-center pb-3 border-b border-gray-200 mb-5'>
          <div className='flex gap-2 items-center'>
            <RiCoupon2Fill className='text-primary' size={26} />
            <h2 className='font-noto_serif font-bold text-xl text-gray-800'>All Coupon</h2>
          </div>
        </div>
        

        <div>
          {
          loading ? <LoadingSkeleton /> : (
            activePackages.length > 0 ? (
              <div className='flex flex-wrap gap-4'>
                {
                  activePackages.map((item:any, index:number) => (
                    <div key={index} className='relative bg-primary rounded-lg px-4 py-3 h-[85px] w-[220px] flex flex-col gap-1 justify-center cursor-pointer'>
                        <div className='bg-white dark:bg-gray-900 w-[20px] h-[20px] rounded-full absolute top-[-10px] left-[20px]'></div>
                        <div className='bg-white dark:bg-gray-900 w-[20px] h-[20px] rounded-full absolute bottom-[-10px] left-[20px]'></div>
                        <div className='flex justify-between items-center'>
                          <div className='text-white font-bold'>{item.code}</div>
                          {/* <RiClipboardFill className='text-white' /> */}
                        </div>
                        <div className='text-white flex justify-between'>
                            {
                              item?.type_discount == 'percent' ?
                              <p>{item?.discount}% off</p>
                              :
                              <p>{numberToIdr(item?.discount)}</p>
                            }
                            <div className='text-xs cursor-pointer hover:text-gray-400'><i>Details</i></div>
                        </div>
                    </div>
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
        </div>

      </section>

      <section className='bg-background p-5 rounded-lg mb-8'>
        <div className='flex justify-between items-center pb-3 border-b border-gray-200 mb-5'>
          <div className='flex gap-2 items-center'>
            <RiCoupon3Fill className='text-primary' size={26} />
            <h2 className='font-noto_serif font-bold text-xl text-gray-800'>Corporate Coupon</h2>
          </div>  
        </div>

        <div>
          {
          loading ? <LoadingSkeleton /> : (
            expiredPackages.length > 0 ? (
              <div className='flex flex-wrap gap-4'>
                {
                  expiredPackages.map((item:any, index:number) => (
                    <div key={index} className='relative bg-primary rounded-lg px-4 py-3 h-[85px] w-[220px] flex flex-col gap-1 justify-center cursor-pointer'>
                        <div className='bg-white dark:bg-gray-900 w-[20px] h-[20px] rounded-full absolute top-[-10px] left-[20px]'></div>
                        <div className='bg-white dark:bg-gray-900 w-[20px] h-[20px] rounded-full absolute bottom-[-10px] left-[20px]'></div>
                        <div className='flex justify-between items-center'>
                          <div className='text-white font-bold'>{item.code}</div>
                          {/* <RiClipboardFill className='text-white' /> */}
                        </div>
                        <div className='text-white flex justify-between'>
                            {
                              item?.type_discount == 'percent' ?
                              <p>{item?.discount}% off</p>
                              :
                              <p>{numberToIdr(item?.discount)}</p>
                            }
                            <div className='text-xs cursor-pointer hover:text-gray-400'><i>Details</i></div>
                        </div>
                    </div>
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
        </div>

      </section>
    </>
  )
}

export default PackageCustomerPage