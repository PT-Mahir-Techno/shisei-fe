'use client'

import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { RiArrowGoBackFill, RiShoppingBag2Fill, RiShutDownFill, RiStackFill } from 'react-icons/ri'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { formatedDate, numberToIdr } from '@/lib/utils'
import HistortCard from '@/app/back-office/(module)/booking/shared-credit/_part/history-card'

type Checked = DropdownMenuCheckboxItemProps["checked"]

const LoadingSkeleton = () => (
  <div className='flex flex-col gap-4'>
    <Skeleton className="w-1/2 h-6" />
    <Skeleton className="w-full h-8" />
    <Skeleton className="w-full h-8" />
  </div>
)

const DetailSharedCreditPage = () => {
  const [activePackages, setActivePackages] = React.useState<any>({})
  const [historyUsed, setHistoryUsed] = React.useState<any>([])
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    initState()
  }, [])

  const {id} = useParams()

  const initState = async () => {
    setLoading(true)
    try {
      const activePackage = await api.get(`${baseUrl}/shared-package/${id}`)
      const historyRes    = await api.get(`${baseUrl}/shared-package/${id}/history-schedule`)
      console.log(historyRes?.data)   
      console.log(activePackage?.data)   
      setActivePackages(activePackage.data)
      setHistoryUsed(historyRes?.data)
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      toast.error(error.data.message)
    }
  } 


  const handleDeleteParticipant = async (credit:any, member:any) => {
    try {
      setLoading(true)
      const res = await api.post(`${baseUrl}/shared-package/${credit}/remove-member/${member}`)
      await initState()
      console.log(res)
      toast.success('Member deleted successfully')
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      toast.error(error.message)
      console.log(error?.message)
    }
  }

  const RenderTable = ({data}:any) => (
    <div className='flex-1 max-w-full p-5 bg-background rounded-lg'>
      <table className='w-full table-auto'>
        <tbody>
          <tr>
            <td className='py-1 font-semibold text-gray-500'>Trx</td>
            <td className='py-1'>:</td>
            <td className='py-1'>{data?.trx ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1 font-semibold text-gray-500'>Membership</td>
            <td className='py-1'>:</td>
            <td className='py-1'>{data?.membership?.name ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1 font-semibold text-gray-500'>Price</td>
            <td className='py-1'>:</td>
            <td className='py-1'>{numberToIdr(data?.price) ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1 font-semibold text-gray-500'>Payment method</td>
            <td className='py-1'>:</td>
            <td className='py-1'>{data?.payment_method ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1 font-semibold text-gray-500'>Shared Type</td>
            <td className='py-1'>:</td>
            <td className='py-1'>{data?.shared_type ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1 font-semibold text-gray-500'>Total Credit</td>
            <td className='py-1'>:</td>
            <td className='py-1'>{data?.total_credit ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1 font-semibold text-gray-500'>Credit Left</td>
            <td className='py-1'>:</td>
            <td className='py-1'>{data?.credit_left ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1 font-semibold text-gray-500'>Total Member</td>
            <td className='py-1'>:</td>
            <td className='py-1'>{data?.member_count ?? '-'} Participant</td>
          </tr>
          <tr>
            <td className='py-1 font-semibold text-gray-500'>Paidat</td>
            <td className='py-1'>:</td>
            <td className='py-1'>{formatedDate(data?.paid_at) ?? '-'}</td>
          </tr>
          <tr>
            <td className='py-1 font-semibold text-gray-500'>Coupon Code</td>
            <td className='py-1'>:</td>
            <td className='py-1'>{data?.coupon_code ?? '-'}</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  )


  return (
    <>
      <section className='bg-background p-5 rounded-lg mb-8'>
        <div className='mb-6 flex justify-end'>
          <Link href='/customer/shared-credit'>
            <Button size={"lg"}> <RiArrowGoBackFill className='mr-2'/> Back</Button>
          </Link>
        </div>
        <div className='flex justify-between items-center pb-3 border-b border-gray-200 mb-5'>
          <div className='flex gap-2 items-center'>
            <RiStackFill className='text-primary' size={26} />
            <h2 className='font-noto_serif font-bold text-xl text-gray-800'>Detail Credit</h2>
          </div>
        </div>

        {
         loading ? <LoadingSkeleton /> : (
          <div> 

            <RenderTable data={activePackages} />

            <div className='flex-1 max-w-full p-5 bg-background rounded-lg my-8'>
              <div className='font-noto_serif font-bold text-xl pb-2 mb-2 border-b border-gray-200'>Participants</div>
              <div>
                {
                  activePackages?.shared_credit_member?.length > 0 ? 
                  activePackages?.shared_credit_member?.map((item:any, index:number) => (
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
                          activePackages?.user_id != item?.user_id  ?
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
                        activePackages?.user_id != item?.user_id &&
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
                  historyUsed?.length > 0 ? 
                  historyUsed?.map((item:any, index:number) => (
                      <HistortCard key={index} data={item} />
                    ))
                    :<p className='text-gray-500'>No data</p>
                  
                }
              </div>
            </div>

          </div>


          // activePackages.length > 0 ? (
          //   <div>
          //     {
          //       activePackages.map((item:any, index:number) => (
              
          //       ))
          //     }
          //   </div>
          // ): (
          //   <div className='flex flex-col gap-4 text-center'>
          //     <p className='text-gray-400'>No active package</p>
          //   </div>
          // )
         )
        }

      </section>
    </>
  )
}

export default DetailSharedCreditPage