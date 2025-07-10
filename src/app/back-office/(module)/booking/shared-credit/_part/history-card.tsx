import { Button } from '@/components/ui/button'
import { formatedDate, handleStringToDate } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { RiCalendarScheduleLine, RiHourglass2Fill, RiLockPasswordLine, RiMapPin2Line, RiRefundLine, RiShoppingBag3Fill } from 'react-icons/ri'

const HistortCard = ({data}:{data:any}) => {
  return (
    <>
      <div className='w-full p-5 bg-gray-50 border border-gray-200 rounded-lg mb-6'>
        <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
          <div className='flex flex-col md:flex-row gap-4 flex-wrap'>
            <div className='flex gap-2 items-center mr-12'>
              <Image alt="photo" src={data?.user?.photo_url ?? "/img/img_placeholder.png"} width={60} height={60} className="rounded-full object-cover object-center h-14 w-14"/>
              <div>
                <p className='text-foreground font-semibold text-sm'>{data?.user?.name}</p>
                <p className='text-foreground font-semibold text-sm'>{data?.user?.email}</p>
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <RiCalendarScheduleLine className='text-primary' size={26} />
              <p className='text-foreground font-semibold text-md'>{formatedDate(data?.package?.date)} at {data?.package?.time} </p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiHourglass2Fill className='text-primary' size={26} />
              <p className='text-foreground font-semibold text-md'>{data?.package?.name}</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiRefundLine className='text-primary' size={26} />
              <p className='text-foreground font-semibold text-md'>Spend {data?.package?.credit} Credit</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiShoppingBag3Fill className='text-primary' size={26} />
              <p className='text-foreground font-semibold text-md'>{handleStringToDate(data?.created_at)}</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiLockPasswordLine className='text-primary' size={26} />
              <p className='bg-sky-600 text-white px-2 py-1 rounded-md font-semibold text-md'>{data?.status}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistortCard