'use client'

import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useCustomer } from '@/store/use-customer'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { RiMap2Fill } from 'react-icons/ri'

const DetaileUserPackagePage = () => {
  
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
      const res = await api.get(`${baseUrl}${prefix}/user-get-package/${id}?type=nopaginate`)
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
              Package
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
                  <div key={index} className='bg-primary/10 p-4 rounded-lg mb-3'>
                    <p className='text-gray-700 text-xl mb-2'>{item?.package_name}</p>
                    <div className='flex gap-12'>
                      <div className='flex gap-2'>
                        <div className='text-gray-500 text-sm font-semibold'>location</div>
                        <div className='text-gray-700 text-sm font-semibold'>: {item?.package_location ?? 'all locations'}</div>
                      </div>
                      <div className='flex gap-2'>
                        <div className='text-gray-500 text-sm font-semibold'>Total Credit</div>
                        <div className='text-gray-700 text-sm font-semibold'>: {item?.total_credit}</div>
                      </div>
                      <div className='flex gap-2'>
                        <div className='text-gray-500 text-sm font-semibold'>Credit Left</div>
                        <div className='text-gray-700 text-sm font-semibold'>: {item?.credit_left}</div>
                      </div>
                      <div className='flex gap-2'>
                        <div className='text-gray-500 text-sm font-semibold'>Expired At</div>
                        <div className='text-gray-700 text-sm font-semibold'>: {item?.expired}</div>
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

export default DetaileUserPackagePage