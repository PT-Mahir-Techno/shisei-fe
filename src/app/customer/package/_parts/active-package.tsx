import { Button } from '@/components/ui/button'
import React from 'react'
import { RiCalendarScheduleLine, RiMapPin2Line, RiRefundLine } from 'react-icons/ri'

const ActivePackageCard = () => {
  return (
    <>
      <div className='w-full p-5 bg-gray-50 border border-gray-200 rounded-lg mb-6'>
        <div className='mb-12 flex gap-3 md:items-center flex-col md:flex-row'>
          <h2 className='font-noto_serif font-bold text-2xl text-gray-700'>20 Session Package - 1 year</h2>
          <div>
            <span className='bg-foreground px-3 py-2 text-white rounded-md text-xs'>2 credit left</span>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
          <div className='flex flex-col md:flex-row gap-4 flex-wrap'>
            <div className='flex gap-2 items-center'>
              <RiCalendarScheduleLine className='text-primary' size={26} />
              <p className='text-foreground font-semibold text-md'>Valid for 1 year</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiRefundLine className='text-primary' size={26} />
              <p className='text-foreground font-semibold text-md'>4 Credit</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiMapPin2Line className='text-primary' size={26} />
              <p className='text-foreground font-semibold text-md'>For all location</p>
            </div>
          </div>
          <div>
            <span className='bg-destructive px-3 py-2 text-white rounded-md text-xs'>
              Expired on August 10, 2025
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActivePackageCard