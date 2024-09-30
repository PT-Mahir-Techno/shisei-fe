'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DashboardCard from './_parts/card'
import CardSection from './_parts/card-section'
import { useProfile } from '@/store/use-profile'
import { color } from 'framer-motion'
import ChartSection from './_parts/chart-section'
import ScheduleBookedSection from './_parts/schedule-booked-section'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import LatestPackageTransaction from './_parts/latest-package-transaction'
import LatestCustomerSection from './_parts/latest-customer-section'



const DashboardPage = () => {
  
  
  const {data:user} = useProfile()

  return (
    <>
      <div className='mb-4 text-lg flex gap-1'>
        <p className='text-gray-500'>Hi welcome back, </p> <span className='font-semibold'>{user?.name}</span>
      </div>

      <CardSection/>

      <div className='grid grid-cols-12 my-6 gap-6'>
        <div className='col-span-12 md:col-span-8 bg-background p-4 rounded-lg'>
          <ChartSection/>
        </div>
        <div className='col-span-12 md:col-span-4 bg-background p-4 rounded-lg'>
          <ScheduleBookedSection/>
        </div>
      </div>

      <div className='grid grid-cols-12 my-6 gap-6'>
        <div className='col-span-12 md:col-span-8 bg-background p-4 rounded-lg'>
          <LatestPackageTransaction/>
        </div>
        <div className='col-span-12 md:col-span-4 bg-background p-4 rounded-lg'>
          <LatestCustomerSection/>
        </div>
      </div>
      
    </>
  )
}

export default DashboardPage