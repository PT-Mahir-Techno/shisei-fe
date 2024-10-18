import { formatedDate } from '@/lib/utils'
import { ActivityType } from '@/types/activity-type'
import React from 'react'

const ActivityCard = ({data}:{data:ActivityType}) => {

  return (
    <>
      <div className='pb-3 mb-3 border-b border-gray-200'>
        <p className='text-primary mb-1 text-sm'>{formatedDate(new Date(data.created_at))}</p>
        <h2 className='font-noto_serif font-bold text-lg text-gray-700 dark:text-gray-200'>{data.log}</h2>
      </div>
    </>
  )
}

export default ActivityCard