import { Button } from '@/components/ui/button'
import React from 'react'

import { RiCalendarScheduleFill, RiMapPin2Fill, RiTimeFill, RiUser3Fill } from 'react-icons/ri'

const ScheduleCard = () => {
  return (
    <>
      <div className='w-full p-5 bg-gray-50 border border-gray-200 rounded-lg mb-6'>
        <div className='flex flex-wrap justify-between items-center'>
          <h2 className='font-noto_serif font-bold text-2xl text-gray-700'>Private Reformer Class B</h2>
          <div className='flex flex-wrap gap-2 items-center'>
            <p className='text-primary font-semibold text-sm'>class stars in :</p>
            <div className='bg-background px-3 py-2 border border-gray-200 rounded-lg font-semibold text-sm text-gray-700'>
              3 day 5 hours 30 mins
            </div>
          </div>
        </div>
        <p className='text-primary font-semibold font-noto_serif text-sm mb-3'>4 Session Package - month</p>
        <Button className='mb-8'>Room number 2</Button>

        <div className='flex flex-wrap justify-between items-center gap-4'>
          <div className='grid grid-rows-4 md:grid-rows-2 grid-flow-col gap-4'>
            <div className='flex gap-2 items-center'>
              <RiCalendarScheduleFill className='text-primary' size={26} />
              <p className='text-foreground font-medium text-sm'>08 August 2024</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiTimeFill className='text-primary' size={26} />
              <p className='text-foreground font-medium text-sm'>8:15 AM, 50 mins</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiUser3Fill className='text-primary' size={26} />
              <p className='text-foreground font-medium text-sm'>Hendra Gunawan</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiMapPin2Fill className='text-primary' size={26} />
              <p className='text-foreground font-medium text-sm'>Atrium Mulia Kuningan Studio</p>
            </div>
          </div>
          <div>
            <p className='text-primary mb-1 text-sm'>Calcel by H-1</p>
            <Button className='bg-foreground'>Cancel Booking</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScheduleCard