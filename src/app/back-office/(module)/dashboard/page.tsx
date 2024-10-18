'use client'

import React, { useContext} from 'react'
import CardSection from './_parts/card-section'
import { useProfile } from '@/store/use-profile'
import ChartSection from './_parts/chart-section'
import ScheduleBookedSection from './_parts/schedule-booked-section'
import LatestPackageTransaction from './_parts/latest-package-transaction'
import LatestCustomerSection from './_parts/latest-customer-section'
import { AuthContex } from '@/providers/auth-provider'
import CardStaffSection from './_parts/card-section-staff'
import UpcomingScheduleSection from './_parts/upcoming-schedule-section'
import FinishedScheduleSection from './_parts/finished-schedule-section'


const AdminSection = () => {
  return (
    <>
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

const StaffSection = () => {

  return (
    <>
      <CardStaffSection/>
      <UpcomingScheduleSection/>
      <FinishedScheduleSection/>
    </>
    // <div className='grid grid-cols-12 my-6 gap-6'>
    // </div>
  )
}


const DashboardPage = () => {
  
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _avaibility:avaibility}   = authState
  
  const {data:user} = useProfile()

  return (
    <>
      <div className='mb-4 text-lg flex gap-1'>
        <p className='text-gray-500'>Hi welcome back, </p> <span className='font-semibold'>{user?.name}</span>
      </div>

      {
        avaibility  == 'admin'
        ? <AdminSection/>
        : <StaffSection/>
      }
      
    </>
  )
}

export default DashboardPage