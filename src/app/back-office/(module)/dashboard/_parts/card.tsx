'use client'

import { numberToIdr } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type CardProps = {
  title: string | null
  subtitle?: string | null
  icon: string  | null
  link?: string  | null
  count: number | null
  is_curency?: boolean

}

const DashboardCard = ({title, subtitle = "", icon, link, count, is_curency=false}: CardProps) => {

  return (
    <div className='bg-background p-4 rounded-lg border-t-2 border-primary/30 shadow'>
        <div className='flex items-center justify-between'>  
          <div>
            <p className='mb-3 text-gray-500 text-sm'>{title}</p>
            <div className='flex items-end gap-3'>
              {
                is_curency 
                ? <p className='text-2xl font-bold text-primary'>{numberToIdr(count!)}</p>
                : <p className='text-2xl font-bold text-primary'>{count}</p>
              }
              <i className='text-xs pb-1'>{subtitle}</i>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            {icon && <Image src={icon} width={40} height={40} alt='photo' className='rounded-md'/>}
           {
            link &&
            <Link href={link || ''}>
              <i className='text-xs text-primary'>see details</i>
            </Link>
           }
          </div>
        </div>
      </div>
  )
}

export default DashboardCard