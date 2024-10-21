'use client'

import React, { useContext } from 'react'
import ScheduleBooked from './scheule-booked'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import toast from 'react-hot-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { AuthContex } from '@/providers/auth-provider'

const LoadingSkeleton = () => 
<div className='flex flex-col gap-2 mb-6'>
    <Skeleton className='w-1/2 h-4' />
    <Skeleton className='w-full h-7' />
    <Skeleton className='w-full h-3' />
  </div>

const ScheduleBookedSection = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState
  
  const [loading, setLoading]  = React.useState(false)
  const [data, setData] = React.useState<any>()

  const init = async () => {
    try {
      setLoading(true)
      const res = await api.get(`${baseUrl}/admin/dashboard-schedule`)
      setData(res.data)
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      console.log(toast.error(error.data.message))
    }
  }

  React.useEffect(() => {
    init()
  },[prefix])

  return (
    <div>
      <p className='text-gray-500 mb-6 font-semibold'>Latest Schedule Transaction</p>
      {
        loading ? (
          <div>
            {
              Array(5).fill(0).map((_, index) => (
                <LoadingSkeleton key={index}/>
              ))
            }
          </div>
        )
        : data?.map((item:any, index:number) => <ScheduleBooked key={index} num={index} data={item}/>)
        // <ScheduleBooked key={index} num={index}/>
      }
    </div>
  )
}

export default ScheduleBookedSection