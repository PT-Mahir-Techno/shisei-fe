import { Button } from '@/components/ui/button'
import React from 'react'
import { RiCalendarScheduleLine, RiMapPin2Line, RiRefundLine } from 'react-icons/ri'

type PaclageCardProps = {
  selected?: boolean
  select?: () => void
}

const PackageCard = ({selected, select}: PaclageCardProps) => {

  return (
    <>
      <div onClick={select} className={`${selected ? 'border-2 border-gray-200' : ''} py-4 px-3 bg-gray-50 hover:bg-accent/50 rounded-lg transition-all duration-300`}>
        <div className='text-center pb-4 mb-3 border-b-2 border-gray-200'>
          <h2 className='font-noto_serif font-bold text-lg'>1 Session Package</h2>
          <p className='text-gray-600 font-semibold text-primary'>Rp. 1.500.000</p>
        </div>
        <div>
          <div className='flex items-center gap-2 mb-3'>
            <RiCalendarScheduleLine className='text-primary' size={26}/>
            <p className='text-gray-600'>Valid for 1 week</p>
          </div>
          <div className='flex items-center gap-2 mb-3'>
            <RiRefundLine className='text-primary' size={26}/>
            <p className='text-gray-600'>1 Credit</p>
          </div>
          <div className='flex items-center gap-2 mb-12'>
            <RiMapPin2Line className='text-primary' size={26}/>
            <p className='text-gray-600'>For all location</p>
          </div>
          <div>
            {
              !selected
              ? <Button size={"lg"} className='w-full'>Select Package</Button>
              : <Button size={"lg"} className='w-full bg-gray-800 hover:bg-gray-600'>Selected</Button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default PackageCard