'use client'

import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { formatedDate, numberToIdr } from '@/lib/utils'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import Image from 'next/image'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

const LoadingSkeleton = () => 
<tr>
  <td colSpan={5}>
    <div className='flex flex-col gap-2 py-2'>
      <Skeleton className='w-1/2 h-2' />
      <Skeleton className='w-full h-8' />
      <Skeleton className='w-1/4 h-2' />
    </div>
  </td>
</tr>

const LatestPackageTransaction = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const [loading, setLoading]  = React.useState(false)
  const [data, setData] = React.useState<any>()

  const init = async () => {
    try {
      setLoading(true)
      const res = await api.get(`${baseUrl}/admin/dashboard-transaction`)
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
    <>
      <p className='text-gray-500 mb-6 font-semibold'>Latest Package Transaction</p>
          <div>
            <table className='w-full'>
              <thead>
                <tr className='bg-primary/10'>
                  <td className='p-4 text-sm font-semibold text-gray-500'>Customer</td>
                  <td className='p-4 text-sm font-semibold text-gray-500'>Package</td>
                  <td className='p-4 text-sm font-semibold text-gray-500'>Amount</td>
                  <td className='p-4 text-sm font-semibold text-gray-500'>status</td>
                  <td className='p-4 text-sm font-semibold text-gray-500'>Paid At</td>
                </tr>
              </thead>
              <tbody>
                {
                  loading
                  ? Array(5).fill(0).map((_, index) => (
                      <LoadingSkeleton key={index}/>
                    ))
                  : data?.map((item:any, index:any) => (
                    <tr key={index} className='border-b border-gray-200'>
                      <td className='p-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 rounded-full object-contain object-center'
                            style={{backgroundImage: `url(${item?.user?.photo_url ?? "/img/img_placeholder.png"})`}}
                          >
                          </div>
                          <div>
                            <p className='text-xs text-gray-600 font-semibold'>{item?.user?.name}</p>
                            <p className='text-xs text-gray-400'>{item?.user?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className='p-4 text-sm fonr-semibold'>Class pilates for beginner</td>
                      <td className='p-4 text-gray-700 font-semibold'>{numberToIdr(item?.price)}</td>
                      <td className='p-4 text-sm '> 
                        {
                          item?.status == 'berhasil'
                          ? <div className='flex items-center gap-1 text-green-500'>
                              <RiVerifiedBadgeFill size={18}/> <p>Paid</p>
                            </div>
                          : <div className='flex items-center gap-1 text-red-500'>
                              <RiVerifiedBadgeFill size={18}/> <p>UnPaid</p>
                            </div>
                        }
                        
                      </td>
                      <td className='p-4 text-sm'>
                      <p className='text-xs text-gray-400'>{formatedDate(item?.created_at)}</p>
                      </td>
                      </tr>
                  ))
                }
                
                
              </tbody>
            </table>
          </div>
    </>
  )
}

export default LatestPackageTransaction