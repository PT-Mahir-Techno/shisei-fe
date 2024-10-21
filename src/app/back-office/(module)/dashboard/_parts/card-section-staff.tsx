'use client'

import React, { useContext, useEffect, useState } from 'react'
import DashboardCard from './card'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import toast from 'react-hot-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { numberToIdr } from '@/lib/utils'
import { AuthContex } from '@/providers/auth-provider'

const LoadingSkeleton = () =>
  <div className='flex flex-col gap-2 bg-white p-4 rounded-lg'>
      <Skeleton className='w-1/2 h-3' />
      <Skeleton className='w-full h-4' />
      <Skeleton className='w-full h-4' />
      <Skeleton className='w-1/2 h-2' />
    </div>

const CardStaffSection = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)

  const init  = async () => {
    try {
      setLoading(true)
      const res = await api.get(`${baseUrl}/staff/dashboard`)
      setData(res.data)
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      console.log(toast.error(error.data.message))
    }
  }

  useEffect(() => {
    init()
  },[prefix])

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>

      <div>
        {
          loading ? <LoadingSkeleton /> :
          <DashboardCard
            title="Total Schedules"
            subtitle="schedules"
            count={data?.total_schedule}
            icon="/img/icon/calendar.png"
            link="/back-office/schedule"
            is_curency={false}
          />
        }
      </div>

      <div>
        {
          loading ? <LoadingSkeleton /> :
          <DashboardCard
            title="Upcoming Schedule"
            subtitle="schedules"
            count={data?.upcoming_schedule}
            icon="/img/icon/list.png"
            link="/back-office/schedule"
            is_curency={false}
          />
        }
      </div>

      <div>
        {
          loading ? <LoadingSkeleton /> :
          <DashboardCard
            title="Finished Schedules"
            subtitle="schedules"
            count={data?.finished_schedule}
            icon="/img/icon/booked.png"
            link="/back-office/schedule"
            is_curency={false}
          />
        }
      </div>
    </div>
  )
}

export default CardStaffSection