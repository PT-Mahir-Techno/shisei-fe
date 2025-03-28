'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { RiCalendarScheduleLine, RiHourglass2Fill, RiMapPin2Line, RiRefundLine } from 'react-icons/ri'

const ActivePackageCard = ({data}:{data:any}) => {
  return (
    <>
      <div className='w-full p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-900 rounded-lg mb-6'>
        <div className='mb-12 flex gap-3 md:items-center flex-col md:flex-row justify-between'>
          <h2 className='font-noto_serif font-bold text-2xl text-gray-700 dark:text-foreground'>{data?.name}</h2>
          <div>
            <span className='bg-primary px-3 py-2 text-white rounded-md text-xs'>{data?.credit_left} credit left</span>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
          <div className='flex text-sm flex-col md:flex-row gap-4 flex-wrap'>
            <div className='flex gap-2 items-center'>
              <RiCalendarScheduleLine className='text-primary' size={20} />
              <p className='text-foreground font-semibold text-md'>Valid for {data?.duration} days</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiHourglass2Fill className='text-primary' size={20} />
              <p className='text-foreground font-semibold text-md'>Remainig {data?.validity_period} days</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiRefundLine className='text-primary' size={20} />
              <p className='text-foreground font-semibold text-md'>{data?.total_credit} Credit</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiMapPin2Line className='text-primary' size={20} />
              {
                data.location != null ? (
                  <p className='text-foreground font-semibold text-md'>{data?.location}</p>
                ) : (
                  <p className='text-foreground font-semibold text-md'>For all location</p>
                )
              }
            </div>
          </div>
          <div className='max-w-md'>
            <span className='bg-destructive px-3 py-2 text-white rounded-md text-xs'>
              Expired on {data?.expired}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActivePackageCard