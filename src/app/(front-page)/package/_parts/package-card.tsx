import { Button } from '@/components/ui/button'
import { numberToIdr } from '@/lib/utils'
import React from 'react'
import { RiCalendarScheduleLine, RiMapPin2Line, RiPriceTag3Fill, RiPriceTagLine, RiRefundLine } from 'react-icons/ri'

type PaclageCardProps = {
  selected?: boolean
  select?: () => void
  data: any
  hiddenSelect: boolean
}

const PackageCard = ({selected, select, data, hiddenSelect=false}: PaclageCardProps) => {

  return (
    <>
      <div className={`${selected ? 'border-2 border-gray-200' : ''} py-4 px-3 bg-gray-50 hover:bg-accent/50 rounded-lg transition-all duration-300`}>
        <div className='text-center pb-4 mb-3 border-b-2 border-gray-200'>
          <h2 className='font-noto_serif font-bold text-lg'>{data?.name}</h2>
          <p className='text-gray-600 font-semibold text-primary'>{numberToIdr(data?.price)}</p>
        </div>
        <div>
          <div className='flex items-center gap-2 mb-3'>
            <RiCalendarScheduleLine className='text-primary' size={26}/>
            <p className='text-gray-600'>{data?.duration?.name}</p>
          </div>
          <div className='flex items-center gap-2 mb-3'>
            <RiRefundLine className='text-primary' size={26}/>
            <p className='text-gray-600'>{data?.total_credit} Credit</p>
          </div>
          <div className='flex items-center gap-2 mb-3'>
            <RiMapPin2Line className='text-primary' size={26}/>
            <p className='text-gray-600'>
              {
                data?.location === null
                ? "For all location"
                : data?.location?.name
              }
            </p>
          </div>
          <div className='flex items-center gap-2 mb-12'>
            <RiPriceTagLine className='text-primary' size={26}/>
            <p className='text-gray-600'>
              {
                data?.category === null
                ? "All category"
                : data?.category?.name
              }
            </p>
          </div>
          {
            !hiddenSelect && (
              <div>
                {
                  !selected
                  ? <Button onClick={select} size={"lg"} className='w-full'>Select Package</Button>
                  : <Button size={"lg"} className='w-full bg-gray-800 hover:bg-gray-600'>Selected</Button>
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default PackageCard