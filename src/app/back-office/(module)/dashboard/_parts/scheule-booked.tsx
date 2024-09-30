import Image from 'next/image'
import React from 'react'

const ScheduleBooked = ({num}:any) => {
  return (
    <div className='flex justify-between border-b border-gray-200 pb-4 mb-4'>
      <div className='flex items-center gap-3'>
        <Image src={"/img/img_placeholder.png"} alt="photo" width={40} height={40} className='rounded-full'></Image>
        <div>
          <p className='text-xs text-gray-600 font-semibold'>John Doe</p>
          <p className='text-xs text-gray-400'>joshndoe@gmail.com</p>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <p className='text-xs text-gray-600 font-semibold max-w-[230px] mb-2 Customtruncate'>Class pilates for beginner</p>
        {
          num % 2 === 0
          ? <p className='text-xs text-white bg-green-400 px-2 py-1 rounded inline-block'>Booked</p>
          :<p className='text-xs text-white bg-red-700 px-2 py-1 rounded inline-block'>Canceled</p>
        }
        
      </div>
    </div>
  )
}

export default ScheduleBooked