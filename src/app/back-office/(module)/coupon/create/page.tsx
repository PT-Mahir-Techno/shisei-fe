'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { RiArrowGoBackFill } from 'react-icons/ri'

const CreateCouponPage = () => {
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <div className='font-noto_serif font-bold text-xl text-gray-800 dark:text-white'>
          Create Coupon
        </div>
        <div>
          <Link href={'/back-office/coupon'}>
            <Button className='bg-primary text-white'> <RiArrowGoBackFill className='mr-2'/> Back</Button>
          </Link>
        </div>
      </div>

      <div className='bg-background p-4 rounded-lg'>
        
      </div>
    </>
  )
}

export default CreateCouponPage