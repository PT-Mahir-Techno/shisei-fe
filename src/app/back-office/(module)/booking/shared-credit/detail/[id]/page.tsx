'use client'

import { Button } from '@/components/ui/button'
import LoadingState from '@/components/ui/loading-state'
import api from '@/lib/api'
import { formatDate2, formatedDate, numberToIdr } from '@/lib/utils'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { RiArrowGoBackFill, RiDeleteBinFill, RiShoppingBag2Fill, RiShutDownFill, RiSkipBackLine } from 'react-icons/ri'
import HistortCard from '../../_part/history-card'

const DetailShareCreditPage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const title = "Shared Credit"
  const {id} = useParams()

  const [detail, setDetail] = useState<any>({})
  const [usedHistory, setUsedHistory] = useState<any>([])
  const [loading, setLoading] = useState(false)


  useEffect(()=>{
    if (prefix){
      init()
    }
  }, [prefix])


  const init = async () => {
    try {
      setLoading(true)
      const resDetail:any   = await api.get(`${baseUrl}${prefix}/payment/shared/${id}`)
      const resHistory:any  = await api.get(`${baseUrl}${prefix}/payment/shared/${id}/history-schedule?type=nopaginate`)
      
      setDetail(resDetail?.message)
      setUsedHistory(resHistory?.message)

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleDeleteParticipant = async (credit:any, member:any) => {
    try {
      setLoading(true)
      const res = await api.post(`${baseUrl}${prefix}/payment/shared/${credit}/remove-member/${member}`)
      await init()
      console.log(res)
      toast.success('Member deleted successfully')
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      toast.error(error.message)
      console.log(error?.message)
    }
  }


  const RenderTable = () => (
    <div className='flex-1 max-w-full p-5 bg-background rounded-lg'>
      <div className='font-noto_serif font-bold text-xl pb-2 mb-2 border-b border-gray-200'>Credit Information</div>
      <table className='w-full table-auto'>
        <tbody>
          <tr>
            <td className='py-1.5 font-semibold text-gray-500'>Trx</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{detail?.trx ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1.5 font-semibold text-gray-500'>Membership</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{detail?.membership?.name ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1.5 font-semibold text-gray-500'>Price</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{numberToIdr(detail?.price) ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1.5 font-semibold text-gray-500'>Payment method</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{detail?.payment_method ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1.5 font-semibold text-gray-500'>Shared Type</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{detail?.shared_type ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1.5 font-semibold text-gray-500'>Total Credit</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{detail?.total_credit ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1.5 font-semibold text-gray-500'>Credit Left</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{detail?.credit_left ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1.5 font-semibold text-gray-500'>Total Member</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{detail?.member_count ?? '-'} Participant</td>
          </tr>
          <tr>
            <td className='py-1.5 font-semibold text-gray-500'>Paidat</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{formatedDate(detail?.paid_at) ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1.5 font-semibold text-gray-500'>Coupon Code</td>
            <td className='py-1.5'>:</td>
            <td className='py-1.5'>{detail?.coupon_code ?? '-'}</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  )

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-900">Shared Credit</h2>
          <p className="text-gray-500 dark:text-gray-900 text-sm">Detail Shared Credit</p>
        </div>
        <div className='flex items-center gap-2'>
          <div>
            <Link href={"/back-office/booking/shared-credit"}>
              <Button className='bg-primary text-white hover:bg-primary'> <RiArrowGoBackFill className="mr-2"/> Back</Button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <RenderTable/>

        <div className='flex-1 max-w-full p-5 bg-background rounded-lg my-8'>
          <div className='font-noto_serif font-bold text-xl pb-2 mb-2 border-b border-gray-200'>Participants</div>
          <div>
            {
              detail?.shared_credit_member?.length > 0 ? 
              detail?.shared_credit_member?.map((item:any, index:number) => (
                <div key={index} className='grid grid-cols-1 md:grid-cols-3 gap-4 bg-primary/20 p-4 rounded-md text-gray-800 mb-4'>
                  <span>
                    <span className='text-gray-900'>Participant Name</span> : <b>{item?.user?.name}</b>
                  </span>
                  <span>
                    <span className='text-gray-900'>Email</span> : <b>{item?.user?.email}</b>
                  </span>
                  <span>
                    <span className='text-gray-900'>Phone number</span> : <b>{item?.user?.phone}</b>
                  </span>
                  <span>
                    <span className='text-gray-900'>Gender</span> : <b>{item?.user?.gender}</b>
                  </span>
                  <span>
                    <span className='text-gray-900'>Status</span> : <b>
                    {
                      detail?.user_id != item?.user_id  ?
                      <span className='text-yellow-500'>Participant</span>
                      :
                      <span className='text-orange-500'>Owner</span>
                    }
                    </b>
                  </span>
                  <span>
                    <span className='text-gray-900'>Status</span> : <b>{item?.status}</b>
                  </span>
                  {
                    detail?.user_id != item?.user_id &&
                    <span>
                      <Button onClick={() => handleDeleteParticipant(item?.payment_id, item?.user_id)} className='bg-red-500 text-white hover:bg-red-600 text-sm' size={'sm'}> <RiShutDownFill className="mr-2"/> Set Inactive</Button>
                    </span>
                  }
                </div>
              ))
              :<p className='text-gray-500'>No data</p>
              
            }
          </div>
        </div>

        <div className='flex-1 max-w-full p-5 bg-background rounded-lg my-8'>
          <div className='font-noto_serif font-bold text-xl pb-2 mb-2 border-b border-gray-200'>Credit History Used</div>
          <div>
            {
              usedHistory?.length > 0 ? 
             usedHistory?.map((item:any, index:number) => (
                <HistortCard key={index} data={item} />
              ))
              :<p className='text-gray-500'>No data</p>
              
            }
          </div>
        </div>
      </div>

      {
        loading  && <LoadingState/>
      }
    </>
  )
}

export default DetailShareCreditPage