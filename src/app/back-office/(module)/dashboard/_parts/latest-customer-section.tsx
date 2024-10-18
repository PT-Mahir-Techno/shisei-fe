'use client'

import React from 'react'
import LatestCustomer from './latest-customer'
import { baseUrl } from '@/lib/variable'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingSkeleton = () => 
<div className='flex flex-col gap-2 py-2'>
  <Skeleton className='w-1/2 h-2' />
  <Skeleton className='w-full h-8' />
  <Skeleton className='w-1/4 h-2' />
</div>


const LatestCustomerSection = () => {
  const [loading, setLoading]  = React.useState(false)
  const [data, setData] = React.useState<any>()

  const init = async () => {
    try {
      setLoading(true)
      const res = await api.get(`${baseUrl}/admin/dashboard-user`)
      setData(res.data)
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      console.log(toast.error(error.data.message))
    }
  }

  React.useEffect(() => {
    init()
  },[])

  return (
    <div>
      <p className='text-gray-500 mb-4 font-semibold'>Latest Customer Joined</p>
      {
        loading ? 
        Array(6).fill(0).map((_, index) => (
          <LoadingSkeleton key={index}/>
        ))
        :
        data?.map((item:any, index:number) => (
          <LatestCustomer key={index} data={item}/>
        ))
      }
    </div>
  )
}

export default LatestCustomerSection