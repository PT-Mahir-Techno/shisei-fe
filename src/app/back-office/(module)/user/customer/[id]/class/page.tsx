'use client'

import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useCustomer } from '@/store/use-customer'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { RiMap2Fill } from 'react-icons/ri'

const DetaileUserSchedulePage = () => {
  
  const {authState} = React.useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState
  
  const [userPackage, setUserPackage] = useState<any>([])
  const [loading, setLoading]         = useState<boolean>(false)
  const params = useParams()
  const {id}   = params

  React.useEffect(() => {
    getClass()
  }, [prefix, role, id])


  const getClass = async () => {
    try {
      setLoading(true)
      const res = await api.get(`${baseUrl}${prefix}/user-get-calendar/${id}?type=nopaginate`)
      setUserPackage(res.data) 
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className='bg-background rounded-lg p-4'>
      {/* <div className='text-gray-500 text-sm mb-4'>
        Detail Customer
      </div> */}
      <div>
         <div>
            <div className='text-gray-700 mb-4 font-semibold'>
              Class / Schedule
            </div>
            <div>
              {
                loading ?
                <div className='flex flex-col gap-2'>
                  <Skeleton className='w-1/2 h-2' />
                  <Skeleton className='w-full h-6' />
                  <Skeleton className='w-full h-6' />
                </div>
                :userPackage.length > 0 &&
                userPackage.map((item:any, index:any) => (
                  <div key={index} className='bg-primary/5 p-4 rounded-lg mb-3 flex items-center gap-3'>
                    <Image src={item?.package?.image_url} width={100} height={100} alt='image' className='object-cover rounded-lg' />
                    <div>
                      <p className='text-gray-600 text-xl mb-2 font-semibold'>{item?.package?.name}
                      {
                        item?.status === 'booked'
                        ? <Badge className='ml-2 bg-amber-400'>upcoming</Badge>
                        : <Badge className='ml-2 bg-gray-600'>canceled</Badge>
                      }

                      </p>
                      <div className='flex gap-12'>
                        <div className='flex gap-2'>
                          <div className='text-gray-500 text-sm font-semibold'>location</div>
                          <div className='text-gray-700 text-sm font-semibold'>: {item?.package?.location ?? 'all locations'}</div>
                        </div>
                        <div className='flex gap-2'>
                          <div className='text-gray-500 text-sm font-semibold'>Date/Time</div>
                          <div className='text-gray-700 text-sm font-semibold'>: {item?.package?.date} {item?.package?.time } ({item?.package?.duration } mins)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
         </div>
      </div>
    </div>
  )
}

export default DetaileUserSchedulePage