import React from 'react'
import ScheduleBooked from './scheule-booked'

const ScheduleBookedSection = () => {
  return (
    <div>
      <p className='text-gray-500 mb-6 font-semibold'>Latest Schedule Transaction</p>
      {
        Array(5).fill(0).map((_, index) => (
          <ScheduleBooked key={index} num={index}/>
        ))
      }
    </div>
  )
}

export default ScheduleBookedSection