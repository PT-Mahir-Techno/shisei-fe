import { formatedDate } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const LatestCustomer = ({data}:{data:any}) => {
  return (
    <div className='flex justify-between border-b border-gray-200 pb-4 mb-4'>
      <div className='flex items-center gap-3'>
        <div
          className=' w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'
          style={{backgroundImage: `url(${data?.photo_url ?? "/img/img_placeholder.png"})`}}
        >
        </div>
        {/* <Image src={"/img/img_placeholder.png"} alt="photo" width={40} height={40} className='rounded-full'></Image> */}
        <div>
          <p className='text-xs text-gray-600 font-semibold'>
            {data?.name}
          </p>
          <p className='text-xs text-gray-400'>
            {data?.email}
          </p>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <p className='text-xs font-semibold text-gray-500 mb-1'>Joinded at :</p>
        <p className='text-xs text-gray-600 font-semibold max-w-[230px] mb-2 Customtruncate'>
          {formatedDate(data?.created_at)}
        </p>
      </div>
    </div>
  )
}

export default LatestCustomer