import React from 'react'
import LatestCustomer from './latest-customer'

const LatestCustomerSection = () => {
  return (
    <div>
      <p className='text-gray-500 mb-4 font-semibold'>Latest Customer Joined</p>
      {
        Array(6).fill(0).map((_, index) => (
          <LatestCustomer key={index}/>
        ))
      }
    </div>
  )
}

export default LatestCustomerSection