import Image from 'next/image'
import React from 'react'

const LatestCustomer = () => {
  return (
    <div className='flex justify-between border-b border-gray-200 pb-4 mb-4'>
      <div className='flex items-center gap-3'>
        <Image src={"/img/img_placeholder.png"} alt="photo" width={40} height={40} className='rounded-full'></Image>
        <div>
          <p className='text-xs text-gray-600 font-semibold'>John Doe</p>
          <p className='text-xs text-gray-400'>joshndoe@gmails.com</p>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <p className='text-xs font-semibold text-gray-500 mb-1'>Joinded at :</p>
        <p className='text-xs text-gray-600 font-semibold max-w-[230px] mb-2 Customtruncate'>sunday, 20 march 2022</p>
      </div>
    </div>
  )
}

export default LatestCustomer