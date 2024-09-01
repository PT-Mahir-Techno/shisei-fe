'use client'

import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custoom-dialog'
import Link from 'next/link'
import React from 'react'
import { RiCalendar2Fill, RiCalendarScheduleLine, RiMapPin2Fill, RiMapPin2Line, RiQuestionFill, RiRefundLine, RiTimeFill, RiUser3Fill } from 'react-icons/ri'

import "../../../styles/animations.css";
const DetailBookingPage = () => {

  const [showCancelModal, setShowCancelModal] = React.useState<boolean>(false)

  return (
    <div className='page-animation'>
      <div className='container pt-20 pb-10 mt-20'>
        <div className={"font-noto_serif text-3xl font-bold text-gray-700 dark:text-slate-300"}>Booking.</div>
      </div>
      <div className='container flex flex-wrap gap-4 mb-16'>
        
        <div className='flex-1 border border-slate-200 dark:border-slate-700 rounded-lg p-5'>
          <div>
            <img src="/img/why-img.png" alt="logo" className='w-full max-h-[477px] object-cover rounded-lg'/>
          </div>
          
          <h2 className='font-noto_serif font-bold text-2xl text-gray-600 mb-1 mt-4 dark:text-slate-300'>Private Reformer Class B</h2>
          <p className='text-sm text-primary mb-4'>2 classes remaining</p>
          
          <div className='py-[14px] px-5 my-6 bg-gray-100 dark:bg-gray-800 rounded-lg'>
            <div className='flex items-center justify-between pb-3 mb-4 border-b-2 border-gray-200'>
              <h2 className='font-noto_serif font-bold text-xl text-primary'>Your Package</h2>
              <span className='bg-primary py-1.5 px-3 rounded-sm text-sm text-white hover:bg-primary/50'>3 credit left</span>
            </div>
            <p className='font-noto_serif font-bold text-lg mb-4 text-gray-700 dark:text-gray-200'>4 Session Package</p>
            <div className='flex flex-col md:flex-row gap-4 flex-wrap'>
              <div className='flex gap-2 items-center'>
                <RiCalendarScheduleLine className='text-primary' size={24} />
                <p className='text-foreground text-md'>Valid for 1 year</p>
              </div>
              <div className='flex gap-2 items-center'>
                <RiRefundLine className='text-primary' size={24} />
                <p className='text-foreground text-md'>4 Credit</p>
              </div>
              <div className='flex gap-2 items-center'>
                <RiMapPin2Line className='text-primary' size={24} />
                <p className='text-foreground text-md'>For all location</p>
              </div>
            </div>
          </div>

          {/* <p className='text-sm text-destructive mb-12'>You do not have an eligible package, Buy a package to continue booking.</p> */}
          
          <h2 className='font-bold text-xl text-gray-600 dark:text-slate-300 border-b border-slate-300 pb-4 mb-4'>Description</h2>
          <p className='text-md text-gray-700 dark:text-slate-300 leading-relaxed'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pulvinar sem libero, pharetra bibendum dui aliquet at. Duis nulla enim, sollicitudin non nunc eget, ultricies varius libero. Etiam accumsan mi dictum leo aliquam, quis rutrum dolor facilisis. Morbi vitae ligula nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer at risus sit amet leo vehicula vestibulum et vitae lorem. Fusce vel viverra ipsum, id volutpat est. Ut porttitor porttitor venenatis. Nulla a nunc id risus egestas ultricies. Sed odio diam, maximus vitae justo ac, tempus congue mi. Pellentesque facilisis tortor nulla, sed iaculis ex porta eu. Suspendisse porttitor pharetra enim, nec vulputate orci volutpat vel.
          </p>
        </div>
        
        {/* side */}
        <div className='w-full h-auto md:w-2/6'>

          <div className='border border-slate-200 dark:border-slate-600 rounded-lg p-5 mb-5'>
            <div className='font-noto_serif font-bold text-gray-700 text-2xl border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              Your Schedule
            </div>
            <div className='font-noto_serif font-bold text-gray-700 text-xl border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              Private Reformer Class B
            </div>

            <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              <div className='flex items-center gap-2 mb-1'>
                <RiCalendar2Fill className='text-primary text-xl'/>
                <span className='text-lg'>Date</span>
              </div>
              <div className='text-xl font-bold'>
                08 August 2024
              </div>
            </div>

            <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              <div className='flex items-center gap-2 mb-1'>
                <RiTimeFill className='text-primary text-xl'/>
                <span className='text-lg'>Time and duration</span>
              </div>
              <div className='text-xl font-bold'>
                8:15 AM, 50 mins
              </div>
            </div>

            <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              <div className='flex items-center gap-2 mb-1'>
                <RiUser3Fill className='text-primary text-xl'/>
                <span className='text-lg'>Instructor</span>
              </div>
              <div className='text-xl font-bold'>
                Hendra Gunawan
              </div>
            </div>

            <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              <div className='flex items-center gap-2 mb-1'>
                <RiMapPin2Fill className='text-primary text-xl'/>
                <span className='text-lg'>Location</span>
              </div>
              <div className='text-xl font-bold'>
                Atrium Mulia Kuningan Studio
              </div>
            </div>
          </div>

          <div>

            <p className='text-primary mb-3'>Cancel before one day prior</p>
            <div className='flex gap-4 mb-3'>
              <Button onClick={() => setShowCancelModal(true)} size={"lg"} className='w-full bg-gray-800 text-white hover:bg-gray-600'>Cancel Booking</Button>
              <Button className='w-full' size={"lg"}>Booking Success!</Button>
            </div>
            <Link href={"/customer/schedule"}>
              <Button className='w-full mb-4' size={"lg"}>See Detail</Button>
            </Link>

                  
            <Link href={"/booking/package"}>
              <Button className='w-full mb-3' size={"lg"}>BUY PACKAGE</Button>
            </Link>

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