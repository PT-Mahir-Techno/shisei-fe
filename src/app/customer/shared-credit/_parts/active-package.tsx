import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { RiCalendarScheduleLine, RiHourglass2Fill, RiMapPin2Line, RiPriceTag2Fill, RiRefundLine, RiUserSharedFill } from 'react-icons/ri'

const ActivePackageCard = ({data}:{data:any}) => {
  return (
    <>
    <Link href={`/customer/shared-credit/${data.payment_id}`}>
      <div className='w-full p-5 bg-gray-50 border border-gray-200 rounded-lg mb-6'>
        <div className='mb-12 flex gap-3 md:items-center flex-col md:flex-row'>
          <h2 className='font-noto_serif font-bold text-2xl text-gray-700 '>{data?.name}</h2>
          <div>
            <span className='bg-foreground px-3 py-2 text-white rounded-md text-xs'>{data?.credit_left} credit left</span>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
          <div className='flex flex-col md:flex-row gap-4 flex-wrap'>
            <div className='flex gap-2 items-center'>
              <RiCalendarScheduleLine className='text-primary' size={26} />
              <p className='text-foreground font-semibold text-md'>Valid for {data?.duration} days</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiHourglass2Fill className='text-primary' size={26} />
              <p className='text-foreground font-semibold text-md'>Remainig {data?.validity_period} days</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiRefundLine className='text-primary' size={26} />
              <p className='text-foreground font-semibold text-md'>{data?.total_credit} Credit</p>
            </div>
            <div className='flex gap-2 items-center'> 
              <RiPriceTag2Fill className='text-primary' size={26} />
              <p className='text-foreground font-semibold text-md'>{data?.shared_type}</p>
            </div>
            <div className='flex gap-2 items-center'> 
              <RiUserSharedFill className='text-primary' size={26} />
              <p className='text-foreground font-semibold text-md'>{data?.member_count + 1} Member</p>
            </div>
            <div className='flex gap-2 items-center'>
              <RiMapPin2Line className='text-primary' size={26} />
              {
                data.location != null ? (
                  <p className='text-foreground font-semibold text-md'>{data?.location?.name}</p>
                ) : (
                  <p className='text-foreground font-semibold text-md'>For all location</p>
                )
              }
            </div>
          </div>
          <div>
            <span className='bg-destructive px-3 py-2 text-white rounded-md text-xs'>
              Expired on {data?.expired}
            </span>
          </div>
        </div>
      </div>
    </Link>
    </>
  )
}

export default ActivePackageCard