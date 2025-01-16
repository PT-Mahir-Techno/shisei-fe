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

const CardSection = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)

  const init  = async () => {
    try {
      setLoading(true)
      const res = await api.get(`${baseUrl}/admin/dashboard`)
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
            count={data?.schedule}
            icon="/img/icon/calendar.png"
            link="/back-office/calendar/schedule"
            is_curency={false}
          />
        }
      </div>

      <div>
        {
          loading ? <LoadingSkeleton /> :
          <DashboardCard
            title="Total package"
            subtitle="schedules"
            count={data?.package}
            icon="/img/icon/list.png"
            link="/back-office/booking/package"
            is_curency={false}
          />
        }
      </div>

      <div>
        {
          loading ? <LoadingSkeleton /> :
          <DashboardCard
            title="Schedule Booked"
            subtitle="schedules"
            count={data?.schedule}
            icon="/img/icon/booked.png"
            link="/back-office/transaction/schedule"
            is_curency={false}
          />
        }
      </div>

      <div>
        {
          loading ? <LoadingSkeleton /> :
          <DashboardCard
            title="Package Sold"
            subtitle="schedules"
            count={data?.sold}
            icon="/img/icon/sold.png"
            link="/back-office/transaction/package"
            is_curency={false}
          />
        }
      </div>

      <div>
        {
          loading ? <LoadingSkeleton /> :
          <DashboardCard
            title="Total Income"
            count={data?.income}
            icon="/img/icon/income.png"
            is_curency={true}
          />
        }
      </div>

      <div>
        {
          loading ? <LoadingSkeleton /> :
          <DashboardCard
            title="Total Customer"
            subtitle="customers"
            count={data?.customer}
            icon="/img/icon/customer.png"
            link="/back-office/user/customer"
            is_curency={false}
          />
        }
      </div>

      <div>
        {
          loading ? <LoadingSkeleton /> :
          <DashboardCard
            title="Total Staff"
            subtitle="staffs"
            count={data?.staff}
            icon="/img/icon/staff.png"
            link="/back-office/user/instructor"
            is_curency={false}
          />
        }
      </div>

      <div>
        {
          loading ? <LoadingSkeleton /> :
          <DashboardCard
            title="Canceled Schedule"
            subtitle="schedules"
            count={data?.cancel}
            icon="/img/icon/cancel.png"
            is_curency={false}
          />
        }
      </div>
    </div>
  )
}

export default CardSection