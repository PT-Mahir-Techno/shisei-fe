'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const StudioCard = ({data}:any) => {

  return (
    <div className='flex gap-8 items-center flex-wrap lg:flex-nowrap bg-gray-50 rounded-lg shadow'>
      <div className='w-full lg:w-[400px] h-[210px] bg-contain bg-no-repeat bg-center rounded-lg md:rounded-s-lg '
        style={{ backgroundImage: `url(${data.photo_url})` }}
      >
      </div>
      <div className='p-6 max-w-4xl'>
        <div className='font-semibold text-2xl text-gray-600 mb-6'>
          {data.name}
        </div>
        <p className='text-gray-500 mb-4 line-clamp-2'>
          {data.subtitle}
        </p>
        <Link href={`/studio/${data.id}`}>
          <Button size={"lg"}>Detail & Location</Button>
        </Link>
      </div>
    </div>
  )
}

export default StudioCard