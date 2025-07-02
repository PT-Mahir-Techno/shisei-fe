import React from 'react'

const ExpiredPackageCard = ({data}:{data:any}) => {
  return (
    <>
      <div className='w-full p-5 bg-gray-50 border border-gray-200 rounded-lg mb-6'>
        <p className='text-primary text-sm mb-2'>1 Agustus 2024</p>
        <div className='flex gap-3 flex-col md:flex-row md:items-center '>
          <h2 className='font-noto_serif font-bold text-lg text-gray-700'>20 Session Package - 1 year</h2>
          <div>
            <span className='bg-destructive px-3 py-1 text-white rounded text-xs'>Expired</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExpiredPackageCard