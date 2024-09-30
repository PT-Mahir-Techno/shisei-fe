'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { formatedDate } from '@/lib/utils'
import { baseUrl } from '@/lib/variable'
import { useDashboardCustomer } from '@/store/use-dashboard-customer'
import { set } from 'date-fns'
import Link from 'next/link'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { RiCalendarFill, RiCalendarScheduleFill, RiHistoryFill, RiNotification2Fill, RiStackFill } from 'react-icons/ri'

const LoadingSkeleton = () => (
  <div className='flex flex-col gap-4'>
    <Skeleton className="w-1/2 h-6" />
    <Skeleton className="w-full h-8" />
    <Skeleton className="w-full h-8" />
  </div>
)

const DahboardCustomerPage = () => {

  const {loading, packages, notification, schedule, log, getDashboard} = useDashboardCustomer()

  useEffect(() => {
    initState()
  }, [])

  const initState = async () => {
    try {
      await getDashboard()
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }
  

  return (
    <>
      <div className='mb-5'>
        <p className='text-primary text-sm'>Customer</p>
        <h2 className='font-noto_serif font-bold text-2xl text-gray-800'>Welcome to dashboard John Doe!</h2>
        {/* <p className='text-destructive text-sm'>Complete your profile now before making a reservation !</p> */}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

        <div className='bg-background rounded-lg p-5'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-4'>
              <RiStackFill className='text-primary' size={26}/>
              <p className='font-noto_serif font-bold text-gray-800 text-xl dark:text-gray-200'>My Packages</p>
            </div>
            <Link href={"/customer/package"}>
              <Button>See Detail</Button>
            </Link>
          </div>
          <div className='h-[1px] my-4 bg-gray-200'></div>
          {
            loading ? <LoadingSkeleton /> : (
              <div>
                {
                  packages.length > 0 ? (
                    packages.slice(0,2).map((item:any, index:any) => (
                      <div className='bg-gray-50 border border-gray-200 p-5 rounded-lg mb-3' key={item.id}>
                        <h2 className='font-noto_serif font-bold text-2xl text-gray-700  mb-4'>{item.name}</h2>
                        <div className='flex gap-2 items-center text-sm'>
                          <p className='font-semibold bg-gray-900 text-white px-3 py-2 rounded-md'>{item.credit_left} Credit left</p>
                          <p className='font-semibold bg-red-400 text-white px-3 py-2 rounded-md'>Expired on {item.expired}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='bg-gray-50 border border-gray-200 p-5 rounded-lg'>
                      <h2 className='text-sm text-center text-gray-700  mb-4'>No package available</h2>
                    </div>
                  )
                }
              </div>
            )
          }
        </div>

        <div className='bg-background rounded-lg p-5'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-4'>
              <RiCalendarScheduleFill className='text-primary' size={26}/>
              <p className='font-noto_serif font-bold text-gray-800 text-xl dark:text-gray-200'>My Schedule</p>
            </div>
            <Button>See Detail</Button>
          </div>
          <div className='h-[1px] my-4 bg-gray-200'></div>
          {
            loading ? <LoadingSkeleton /> : (
              <div>
                {
                  schedule.length > 0 ? (
                    schedule.map((item:any, index:any) => (
                      <div key={index} className='bg-gray-50 border border-gray-200 p-5 rounded-lg mb-4'>
                        <h2 className='font-noto_serif font-bold text-2xl text-gray-700  mb-4'>{item?.name}</h2>
                        <div className='flex gap-2 items-center'>
                          <RiCalendarScheduleFill className='text-primary' size={26}/>
                          <p className='font-semibold text-gray-800 text-sm dark:text-gray-200'>{item?.date} {item?.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='bg-gray-50 border border-gray-200 p-5 rounded-lg'>
                      <h2 className='text-sm text-center text-gray-700  mb-4'>No schedule available</h2>
                    </div>
                  )
                }
              </div>
            )
          }
        </div>

        <div className='bg-background rounded-lg p-5'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-4'>
              <RiNotification2Fill className='text-primary' size={26}/>
              <p className='font-noto_serif font-bold text-gray-800 text-xl dark:text-gray-200'>Notification</p>
            </div>
          </div>
          <div className='h-[1px] my-4 bg-gray-200'></div>
          
          {
            loading ? <LoadingSkeleton /> : (
              <div>
                {
                  notification.length > 0 ? (
                    notification.map((item:any, index:any) => (
                      <div key={index}>
                        <p className='text-primary'>{formatedDate(item?.date_start)}</p>
                        <div className='flex justify-between'>
                          <h2 className='font-noto_serif font-bold text-lg text-gray-700'>{item?.name}</h2>
                          <Badge className='rounded' variant={'destructive'}>{item?.status}</Badge>
                        </div>
                        <div className='h-[1px] my-4 bg-gray-200'></div>
                      </div>
                    ))
                  ) : (
                    <div className='bg-gray-50 border border-gray-200 p-5 rounded-lg'>
                      <h2 className='text-sm text-center text-gray-700  mb-4'>No notification available</h2>
                    </div>
                  )
                }
              </div>
            )
          }
        </div>

        <div className='bg-background rounded-lg p-5'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-4'>
              <RiHistoryFill className='text-primary' size={26}/>
              <p className='font-noto_serif font-bold text-gray-800 text-xl dark:text-gray-200'>Log Actifity</p>
            </div>
          </div>
          <div className='h-[1px] my-4 bg-gray-200'></div>
          
          {
            loading ? <LoadingSkeleton /> : (
              <div>
                {
                  log.length > 0 ? (
                    log.slice(0,3).map((item:any, index:any) => (
                      <div key={index}>
                        <p className='text-primary'>{formatedDate(item.created_at)}</p>
                        <h2 className='font-noto_serif font-bold text-lg text-gray-700'>{item.log}</h2>
                        <div className='h-[1px] my-4 bg-gray-200'></div>
                      </div>
                    ))
                  ): (
                    <div className='bg-gray-50 border border-gray-200 p-5 rounded-lg'>
                      <h2 className='text-sm text-center text-gray-700  mb-4'>No logactivity yet</h2>
                    </div>
                  )
                }
              </div>
            )
          }

        </div>
        
      </div>
    </>
  )
}

export default DahboardCustomerPage