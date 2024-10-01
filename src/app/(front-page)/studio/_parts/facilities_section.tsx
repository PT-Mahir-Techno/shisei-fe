import Image from 'next/image'
import React from 'react'

const FacilitiesSection = ({data}:any) => {

  return (
    <div className='mb-[100px]'>
      <h3 className='font-noto_serif font-bold text-2xl text-gray-700 dark:text-gray-200 mb-6'>Amenities</h3>
      
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
        
        {
          data?.map((item:any, index:number) => (
            <div key={index} className='flex items-center gap-2'>
              <Image src="/img/ic_toilet.png" width={33} height={33} alt="toilet" />
              <p className='text-gray-600 text-lg'>{item?.facility}</p>
            </div>
          ))
        }        
        
      </div>
    </div>
  )
}

export default FacilitiesSection