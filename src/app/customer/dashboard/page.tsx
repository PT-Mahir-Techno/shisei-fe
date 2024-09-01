import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import React from 'react'
import { RiCalendarFill, RiCalendarScheduleFill, RiHistoryFill, RiNotification2Fill, RiStackFill } from 'react-icons/ri'

const DahboardCustomerPage = () => {
  return (
    <>
      <div className='mb-5'>
        <p className='text-primary text-sm'>Customer</p>
        <h2 className='font-noto_serif font-bold text-2xl text-gray-800'>Welcome to dashboard John Doe!</h2>
        <p className='text-destructive text-sm'>Complete your profile now before making a reservation !</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-background rounded-lg p-5'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-4'>
              <RiStackFill className='text-primary' size={26}/>
              <p className='font-noto_serif font-bold text-gray-800 text-xl dark:text-gray-200'>My Packages</p>
            </div>
            <Button>See Detail</Button>
          </div>
          <div className='h-[1px] my-4 bg-gray-200'></div>
          <div className='bg-gray-50 border border-gray-200 p-5 rounded-lg'>
            <h2 className='font-noto_serif font-bold text-2xl text-gray-700  mb-4'>4 Session Package - 1 month</h2>
            <Button className='bg-gray-700'>3 credit left</Button>
          </div>
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
          <div className='bg-gray-50 border border-gray-200 p-5 rounded-lg'>
            <h2 className='font-noto_serif font-bold text-2xl text-gray-700  mb-4'>Private Reformer Class B</h2>
            <div className='flex gap-2 items-center'>
              <RiCalendarScheduleFill className='text-primary' size={26}/>
              <p className='font-semibold text-gray-800 text-sm dark:text-gray-200'>10-12-2022</p>
            </div>
          </div>
        </div>
        <div className='bg-background rounded-lg p-5'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-4'>
              <RiNotification2Fill className='text-primary' size={26}/>
              <p className='font-noto_serif font-bold text-gray-800 text-xl dark:text-gray-200'>Notification</p>
            </div>
          </div>
          <div className='h-[1px] my-4 bg-gray-200'></div>
          
          <div>
            <p className='text-primary'>10-Agustus-2022</p>
            <div className='flex justify-between'>
              <h2 className='font-noto_serif font-bold text-lg text-gray-700'>4 Session Package - 1 month</h2>
              <Badge className='rounded' variant={'destructive'}>Expired</Badge>
            </div>
            <div className='h-[1px] my-4 bg-gray-200'></div>
          </div>
        </div>
        <div className='bg-background rounded-lg p-5'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-4'>
              <RiHistoryFill className='text-primary' size={26}/>
              <p className='font-noto_serif font-bold text-gray-800 text-xl dark:text-gray-200'>Log Actifity</p>
            </div>
          </div>
          <div className='h-[1px] my-4 bg-gray-200'></div>
          
          <div>
            <p className='text-primary'>10-Agustus-2022</p>
            <h2 className='font-noto_serif font-bold text-lg text-gray-700'>Buy package : 4 Session Package - 1 month</h2>
            <div className='h-[1px] my-4 bg-gray-200'></div>
          </div>
          <div>
            <p className='text-primary'>10-Agustus-2022</p>
            <h2 className='font-noto_serif font-bold text-lg text-gray-700'>Update Profil Information</h2>
            <div className='h-[1px] my-4 bg-gray-200'></div>
          </div>

        </div>
      </div>
    </>
  )
}

export default DahboardCustomerPage