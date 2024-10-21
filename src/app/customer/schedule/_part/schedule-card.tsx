'use client'

import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custoom-dialog'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'

import { RiCalendarScheduleFill, RiMapPin2Fill, RiTimeFill, RiUser3Fill } from 'react-icons/ri'
import LoadingIcons from 'react-loading-icons'

const ScheduleCard = ({data, fetch}:any) => {
  const dateNow = new Date()
  const [isOpen, setIsOpen] = React.useState(false)
  const [loadingCancel, setLoadingCancel] = React.useState(false)

  const handleCancel = async () => {
    setLoadingCancel(true)
    try {
      await api.put(`${baseUrl}/dashboard/schedule/cancel/${data?.id}`)
      await toast.success('cancel success')
      fetch()
      setIsOpen(false)
    } catch (error:any) {
      setLoadingCancel(false)
      toast.error(error.data.message)
    }
  }

  return (
    <>
      <div className='w-full p-5 bg-gray-50 border border-gray-200 rounded-lg mb-6'>
        <div className='flex flex-wrap justify-between items-center'>
          <h2 className='font-noto_serif font-bold text-2xl text-gray-700 max-w-2xl'>{data?.name}</h2>
          <div className='flex flex-wrap gap-2 items-center'>
            <p className='text-primary font-semibold text-sm'>status   :</p>
            <div className='bg-background px-3 py-2 border border-gray-200 rounded-lg font-semibold text-sm text-gray-700'>
              {
                dateNow > new Date(data?.date) ? 'Finished' : 'Active'
              }
              {/* 3 day 5 hours 30 mins */}
            </div>
          </div>
        </div>
        <p className='text-primary font-semibold font-noto_serif text-sm mb-3 max-w-2xl line-clamp-1'>
          {data?.description}
        </p>
        <Button className='mb-8'>{data.location}</Button>

        <div className='flex flex-wrap justify-between items-center gap-4'>
          <div className='grid grid-rows-4 md:grid-rows-2 grid-flow-col gap-4'>
            <div className='flex gap-2 items-center'>
              <RiCalendarScheduleFill className='text-primary' size={26} />
              <p className='text-foreground font-medium text-sm'>{data.date}</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiTimeFill className='text-primary' size={26} />
              <p className='text-foreground font-medium text-sm'>{data?.time}, {data?.duration} mins</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiUser3Fill className='text-primary' size={26} />
              <p className='text-foreground font-medium text-sm'>{data?.staff}</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiMapPin2Fill className='text-primary' size={26} />
              <p className='text-foreground font-medium text-sm'>{data?.location}</p>
            </div>
          </div>
          <div>
            {/* <p className='text-primary mb-1 text-sm'>cancel before : {settingSchedule?.set_hour_to_cancel}</p> */}
            <Button className='bg-foreground'
            onClick={() => setIsOpen(true)}
            disabled={dateNow > new Date(data?.date) ? true : false}
            >
              Cancel Booking
            </Button>
          </div>
        </div>
      </div>
      
      <CustomModal open={isOpen} onOpenChange={setIsOpen} >
          <div className='text-center flex justify-center items-center flex-col'>
              <p className='text-gray-600 font-semibold'>Are you sure want to cancel this schedule?</p>
              <p className='text-gray-500 mb-4'> This action can't be undone </p>
              <Image src="/img/icon/cancel.png" width={100} height={100} alt="empty"/>
            </div>
            <div className='flex justify-end gap-3 mt-4'>
              <Button variant={"outline"} onClick={() => setIsOpen(false)}>Close</Button>
              <Button onClick={() => handleCancel()} disabled={loadingCancel}> 
                {
                  loadingCancel && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                }
                yes cancel
              </Button>
            </div>
      </CustomModal>

    </>
  )
}

export default ScheduleCard