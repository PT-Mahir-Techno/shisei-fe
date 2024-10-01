import React from 'react'
import {RiCalendarScheduleFill, RiMapPin2Fill, RiTimeFill, RiUser3Fill} from 'react-icons/ri'

const ScheduleHistoryCard = ({data}:any) => {
  return (
    <>
      <div className='w-full p-5 bg-gray-50 border border-gray-200 rounded-lg mb-6'>
        <h2 className='font-noto_serif font-bold text-2xl text-gray-700'>
          {data?.name}
        </h2>
        <p className='text-primary font-semibold font-noto_serif text-sm mb-7 max-w-2xl line-clamp-1'>
          {data?.description}
        </p>

        <div className='grid grid-rows-4 md:grid-rows-1 grid-flow-col gap-4'>
          <div className='flex gap-2 items-center'>
            <RiCalendarScheduleFill className='text-primary' size={26} />
            <p className='text-foreground font-medium text-sm'>{data?.date}</p>
          </div>
          <div className='flex gap-2 items-center'>
            <RiTimeFill className='text-primary' size={26} />
            <p className='text-foreground font-medium text-sm'>{data?.date}, {data?.duration} mins</p>
          </div>
          <div className='flex gap-2 items-center'>
            <RiUser3Fill className='text-primary' size={26} />
            <p className='text-foreground font-medium text-sm'>{data?.staff}</p>
          </div>
          <div className='flex gap-2 items-center'>
            <RiMapPin2Fill className='text-primary' size={26} />
            <p className='text-foreground font-medium text-sm'>{data?.location}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScheduleHistoryCard