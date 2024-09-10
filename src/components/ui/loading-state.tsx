import React from 'react'
import LoadingIcons from 'react-loading-icons'

const LoadingState = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-900/80 flex items-center justify-center'>
      <div className='bg-white px-8 py-8 rounded-lg flex flex-col justify-center items-center'>
        <LoadingIcons.Oval stroke='#4086A7' strokeWidth={5} className="w-10 h-10 animate-spin mb-4" />
        <p className='text-gray-600 font-semibold'>Loading...</p>
      </div>
    </div>
  )
}

export default LoadingState