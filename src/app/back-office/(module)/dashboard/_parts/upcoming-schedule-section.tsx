'use client'

import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { formatedDate } from '@/lib/utils'
import { baseUrl } from '@/lib/variable'
import Image from 'next/image'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { RiCalendar2Fill, RiCalendarCheckFill, RiMap2Fill, RiProgress1Fill, RiTimeFill, RiTimerFill } from 'react-icons/ri'

const LoadingSkeleton = () =>
  <div className='flex flex-col gap-2'>
    {
      Array(5).fill(0).map((_, index) => (
        <div key={index}>
            <Skeleton className='w-1/4 h-4 mb-2'/>
            <Skeleton className='w-full h-6 mb-2'/>
            <Skeleton className='w-full h-6 mb-2'/>
          </div>
        )
      )
    }
  </div>

const UpcomingScheduleSection = () => {

  const [loading, setLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<[]>([])

  const init = async () => {
    try {
      setLoading(true)
      const res = await api.get(`${baseUrl}/staff/dashboard/upcoming-schedule`)
      setData(res.data)
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      toast.error(error.data.message)
    }
  }

  useEffect(() => {
    init()
  },[])

  return (
    <div className='my-8 bg-background rounded-md p-5'>
      <div className='font-semibold text-gray-500 border-b-[1px] border-gray-200 pb-4 mb-4'>
        Upcoming Schedule
      </div>

      {
        loading
        ? <LoadingSkeleton />
        : data.length > 0
          ? (
              data.map((item:any, index:any) =>
                <div key={index} className='flex justify-between items-center mb-4 border-b-[1px] border-gray-300 pb-4'>
                  <div className='flex gap-4 items-center'>
                    <Image src={item?.image_url ?? "/img/img_placeholder.png"} alt="photo" width={60} height={60} className='rounded-md'></Image>
                    <div>
                      <div className='mb-4'>
                        <p className='mb-2 text-gray-600 font-semibold'>
                          {item?.name}
                        </p>
                      </div>

                      <div className='flex gap-8'>
                        <div className='flex items-center gap-2'>
                          <p className='text-sm text-gray-600 font-semibold flex items-center gap-1 '> <RiTimeFill className='text-primary' size={18}/> Start :</p>
                          <p className='text-sm text-gray-600'>{item?.time}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                        <p className='text-sm text-gray-600 font-semibold flex items-center gap-1 '> <RiTimerFill className='text-primary' size={18}/> Duration :</p>
                          <p className='text-sm text-gray-600'>{item?.duration} minutes</p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <p className='text-sm text-gray-600 font-semibold flex items-center gap-1 '> <RiCalendarCheckFill className='text-primary' size={18}/> Date :</p>
                          <p className='text-sm text-gray-600'>{formatedDate(new Date(item?.date))}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <p className='text-sm text-gray-600 font-semibold flex items-center gap-1 '> <RiMap2Fill className='text-primary' size={18}/> Location :</p>
                          <p className='text-sm text-gray-600'>{item?.location?.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='py-2 px-3 rounded-md flex items-center gap-1 bg-sky-700 text-white'>
                    <RiProgress1Fill/>
                    <p className='text-sm font-semibold'>Upcoming </p>
                  </div>
                </div>
              )
            )
          : <div className='flex justify-center items-center'>
              <p className='text-gray-500 font-semibold'>No Upcoming Schedule</p>
            </div>
      }

    </div>
  )
}

export default UpcomingScheduleSection