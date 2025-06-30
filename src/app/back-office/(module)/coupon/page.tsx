import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const title = "Coupon"

const CouponPage = () => {
  return (
    <>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-noto_serif font-bold text-2xl text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-500 text-sm">List of all {title} </p>
          </div>
          <div>
            <Link href={`/back-office/coupon/create`}>
              <Button className="bg-primary text-white">Add {title}</Button>
            </Link>
          </div>
        </div>
        <div></div>
    </>
  )
}

export default CouponPage