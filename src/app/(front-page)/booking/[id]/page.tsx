'use client'

import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custoom-dialog'
import Link from 'next/link'
import React, { use, useContext, useEffect } from 'react'
import { RiCalendar2Fill, RiCalendarScheduleLine, RiMapPin2Fill, RiMapPin2Line, RiQuestionFill, RiRefundLine, RiTimeFill, RiUser3Fill } from 'react-icons/ri'

import "../../../styles/animations.css";
import { AuthContex } from '@/providers/auth-provider'
import { useSchedulePage } from '@/store/use-schedule-page'
import { useParams, useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
const DetailBookingPage = () => {
  
  const {} = useContext(AuthContex)
  const {loading, getSingleSchedule, schedule } = useSchedulePage()
  const [showCancelModal, setShowCancelModal] = React.useState<boolean>(false)

  const param = useParams()
  const {id} = param

  useEffect(() => {
    getSingleSchedule(`/schedule/${id}`)
  }, [param])
  

  return (
    <div className='page-animation'>
      <div className='container pt-20 pb-10 mt-20'>
        <div className={"font-noto_serif text-3xl font-bold text-gray-700 dark:text-slate-300"}>Booking.</div>
      </div>
      <div className='container flex flex-wrap gap-4 mb-16'>
        
        <div className='flex-1 border border-slate-200 dark:border-slate-700 rounded-lg p-5'>
          <div>
            <img src={schedule?.image_url ?? '/img/img_placeholder.png'} alt="logo" className='w-full max-h-[477px] object-cover rounded-lg'/>
          </div>
          
          {
            loading 
            ? 
            (
              <Skeleton className="w-full h-10 mt-4 mb-8" />
            )
            : (
              <div>
                <h2 className='font-noto_serif font-bold text-2xl text-gray-600 mt-4 mb-8 dark:text-slate-300'>{schedule?.name}</h2>
              </div>
            )
          }
          {/* <p className='text-sm text-primary mb-4'>2 classes remaining</p> */}
          
          {/* <div claz */}

          {/* <p className='text-sm text-destructive mb-12'>You do not have an eligible package, Buy a package to continue booking.</p> */}
          
          <h2 className='font-bold text-xl text-gray-600 dark:text-slate-300 border-b border-slate-300 pb-4 mb-4'>Description</h2>
          {
            loading 
            ? 
            (
              <div className='flex flex-col gap-4'>
                {
                  Array(10).fill(0).map((_, index) => (
                    <Skeleton key={index} className="w-full h-6 " />
                  ))
                }
              </div>
            )
            : (
              <div>
                <p className='text-md text-gray-700 dark:text-slate-300 leading-relaxed' dangerouslySetInnerHTML={{ __html: schedule?.description }}>
                </p>
              </div>
            )
          }
        </div>
        
        {/* side */}
        <div className='w-full h-auto md:w-2/6'>

          <div className='border border-slate-200 dark:border-slate-600 rounded-lg p-5 mb-5'>
            <div className='font-noto_serif font-bold text-gray-700 text-2xl border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              Your Schedule
            </div>

            {
              loading
              ? <div className='flex flex-col gap-4'>
                {
                  Array(10).fill(0).map((_, index) => (
                    <div key={index}>
                      <Skeleton className="w-1/4 h-4 mb-4" />
                      <Skeleton className="w-full h-10 " />
                    </div>
                  ))
                }
              </div>
              : (
                <div>
                  <div className='font-noto_serif font-bold text-gray-700 text-xl border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
                    {schedule?.name}
                  </div>
                  
                  <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
                    <div className='flex items-center gap-2 mb-1'>
                      <RiCalendar2Fill className='text-primary text-xl'/>
                      <span className='text-lg'>Date</span>
                    </div>
                    <div className='text-xl font-bold'>
                      {schedule?.date}
                    </div>
                  </div>

                  <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
                    <div className='flex items-center gap-2 mb-1'>
                      <RiTimeFill className='text-primary text-xl'/>
                      <span className='text-lg'>Time and duration</span>
                    </div>
                    <div className='text-xl font-bold'>
                      {schedule?.time}, {schedule?.duration} mins
                    </div>
                  </div>

                  <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
                    <div className='flex items-center gap-2 mb-1'>
                      <RiUser3Fill className='text-primary text-xl'/>
                      <span className='text-lg'>Instructor</span>
                    </div>
                    <div className='text-xl font-bold'>
                      {schedule?.staff?.name}
                    </div>
                  </div>

                  <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
                    <div className='flex items-center gap-2 mb-1'>
                      <RiMapPin2Fill className='text-primary text-xl'/>
                      <span className='text-lg'>Location</span>
                    </div>
                    <div className='text-xl font-bold'>
                      {schedule.location?.name}
                    </div>
                  </div>

                </div>
              )
            }


          </div>

          <div>

            <p className='text-primary mb-3'>Cancel before one day prior</p>
            <div className='flex gap-4 mb-3'>
              <Button onClick={() => setShowCancelModal(true)} size={"lg"} className='w-full bg-gray-800 text-white hover:bg-gray-600'>Cancel Booking</Button>
              <Button className='w-full' size={"lg"}>Booking Success!</Button>
            </div>

            {/* <Link href={"/customer/schedule"}>
              <Button className='w-full mb-4' size={"lg"}>See Detail</Button>
            </Link> */}

                  
            {/* <Link href={"/booking/package"}>
              <Button className='w-full mb-3' size={"lg"}>BUY PACKAGE</Button>
            </Link> */}

            <p className='text-center text-primary'>Check-in 3 hours before class begins</p>
          

          </div>
        </div>
        {/* end side */}
      </div>

      <CustomModal open={showCancelModal} onOpenChange={() => setShowCancelModal(false)}>
        <div className='flex flex-col items-center'>
          <RiQuestionFill className='text-primary mb-3' size={50}/>
          <h1 className='font-noto_serif font-bold text-2xl mb-3'>Cancel Booking</h1>
          <p className='text-sm text-gray-500 mb-5'>Are you sure you want to cancel this booking?</p>
          <div className='flex gap-3'>
            <Button onClick={() => setShowCancelModal(false)} variant={"outline"} className='w-full' size={"lg"}>Back</Button>
            <Button className='w-full' size={"lg"}>yes Cancel</Button>
          </div>
        </div>
      </CustomModal>

    </div>
  )
}

export default DetailBookingPage