'use client'

import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { RiArrowDropDownLine, RiBox1Fill, RiCheckDoubleFill, RiCoupon2Fill, RiCoupon3Fill, RiDeleteBin2Fill, RiHourglassFill, RiLockPasswordLine, RiShoppingBag2Fill, RiStackFill, RiUser3Fill } from 'react-icons/ri'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { formatDate2, formatedDate, numberToIdr } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { get } from 'http'
import Image from 'next/image'

type Checked = DropdownMenuCheckboxItemProps["checked"]

const LoadingSkeleton = () => (
  <div className='flex flex-col gap-4'>
    <Skeleton className="w-1/2 h-6" />
    <Skeleton className="w-full h-8" />
    <Skeleton className="w-full h-8" />
  </div>
)

const CorporatePage = () => {
  const [activePackages, setActivePackages] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(false)
  const [corporate, setCorporate] = React.useState<any>(null)

  const {getMe} = useAuth()

  useEffect(() => {
    initState()
  }, [])

  const initState = async () => {
    setLoading(true)
    try {
      const profile = await getMe('/dashboard/profile')
      const corporate_id = profile?.corporate_pic?.id

      const resCorporate = await api.get(`${baseUrl}/dashboard/corporate/${corporate_id}`)
      setCorporate(resCorporate?.data)


      console.log(resCorporate?.data)

      setActivePackages(profile?.corporate_pic)
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      toast.error(error.data.message)
    }
  } 

  const handleApprove = async (corporate_id:any, id:any) => {
    try {
      setLoading(true)
      const payload = {
        "corporate_id" : corporate_id,
        "user_id"      : [id]
      }

      const res = await api.post(`${baseUrl}/dashboard/corporate/approve-member`, payload)
      await initState()
      console.log(res)
      toast.success('Corporate approved successfully')
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      toast.error(error.message)
      console.log(error?.message)
    }
  }

  const handleRemoveMember = async (corporate_id:any, id:any) => {
    try {
      setLoading(true)
      const res = await api.post(`${baseUrl}/dashboard/corporate/remove-member/${corporate_id}`, {
        "user_id" : id
      })
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


  return (
    <>
      <section className='bg-background p-5 rounded-lg mb-8'>
        <div className='flex justify-between items-center pb-3 border-b border-gray-200 mb-5'>
          <div className='flex gap-2 items-center'>
            <RiBox1Fill className='text-primary' size={26} />
            <h2 className='font-noto_serif font-bold text-xl text-gray-800'>Corporate</h2>
          </div>
        </div>
        

        <div>
          {
          loading ? <LoadingSkeleton /> : (
            activePackages ? (
              <div className=''>
                <div className='flex gap-2 mb-4'>
                  <div className='text-gray-600 min-w-[200px]'>Corporate Name</div>
                  <div className='text-gray-700 max-w-[200px]'>{activePackages?.name}</div>
                </div>
                <div className='flex gap-2 mb-4'>
                  <div className='text-gray-600 min-w-[200px]'>Status</div>
                  <div className='text-gray-700 max-w-[200px]'>{activePackages?.pic_status}</div>
                </div>
                <div className='flex gap-2 mb-4'>
                  <div className='text-gray-600 min-w-[200px]'>Register At</div>
                  <div className='text-gray-700 max-w-[200px]'>{formatedDate(activePackages?.created_at)}</div>
                </div>
              </div>
            ): (
              <div className='flex flex-col gap-4 text-center'>
                <p className='text-gray-400'>No corporate available</p>
              </div>
            )
          )
          }
        </div>

      </section>

      <section className='bg-background p-5 rounded-lg mb-8'>
        <div className='flex justify-between items-center pb-3 border-b border-gray-200 mb-5'>
          <div className='flex gap-2 items-center'>
            <RiUser3Fill className='text-primary' size={26} />
            <h2 className='font-noto_serif font-bold text-xl text-gray-800'>Corporate Member  </h2>
          </div>
        </div>

        {
          loading ? <LoadingSkeleton /> : (
            (
              corporate?.member?.length > 0 && corporate?.member?.map((member:any, index:number) => (
                <div key={index} className='mb-8'>
                  <div className='grid grid-cols-7 pb-2 mb-2 border-b-2 border-gray-400'>
                      <div className='mr-0'>
                        <Image alt="photo" src={member?.user?.photo_url ?? "/img/img_placeholder.png"} width={60} height={60} className="rounded-full object-cover object-center h-14 w-14"/>
                      </div>
                      <div>
                        <div className='text-gray-500'> Name</div>
                        <div>{member?.user?.name}</div>
                      </div>
                      <div>
                        <div className='text-gray-500'>Email</div>
                        <div>{member?.user?.email}</div>
                      </div>
                      <div>
                        <div className='text-gray-500'>Phone Number</div>
                        <div>{member?.user?.phone}</div>
                      </div>
                      <div>
                        <div className='text-gray-500'>Gender</div>
                        <div>{member?.user?.gender}</div>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <div>
                          <RiLockPasswordLine className='text-primary' size={26} />
                        </div>
                        <p className='bg-sky-600 text-white px-2 py-1 rounded-md font-semibold text-md'>{member?.status}</p>
                      </div>
                      <div>
                        <div className='text-gray-500'>Action</div>
                        <div className='flex gap-2'>
                          {
                            corporate?.pic_email != member?.user?.email ?
                            (
                              <>
                                <Button onClick={() => handleApprove(corporate?.id, member?.user?.id)} size='sm'  className='bg-primary text-white hover:bg-primary/80'> <RiCheckDoubleFill size={20} /> Approve</Button>
                                <Button onClick={() => handleRemoveMember(corporate?.id, member?.user?.id)}  size='sm'  className='bg-gray-800 text-white hover:bg-primary/80'> <RiDeleteBin2Fill size={18}  className='mr-2'/> Remove</Button>
                              </>
                            ) : <div className='text-gray-500 text-sm'>No action needed for PIC</div>
                          }
                        </div>
                      </div>
                  </div>
                </div>
              ))
            )
          )
        }


      </section>
    </>
  )
}

export default CorporatePage  