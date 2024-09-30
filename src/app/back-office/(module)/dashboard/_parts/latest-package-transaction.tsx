import Image from 'next/image'
import React from 'react'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

const LatestPackageTransaction = () => {
  return (
    <>
      <p className='text-gray-500 mb-6 font-semibold'>Latest Package Transaction</p>
          <div>
            <table className='w-full'>
              <thead>
                <tr className='bg-primary/10'>
                  <td className='p-4 text-sm font-semibold text-gray-500'>Customer</td>
                  <td className='p-4 text-sm font-semibold text-gray-500'>Package</td>
                  <td className='p-4 text-sm font-semibold text-gray-500'>Amount</td>
                  <td className='p-4 text-sm font-semibold text-gray-500'>status</td>
                  <td className='p-4 text-sm font-semibold text-gray-500'>Paid At</td>
                </tr>
              </thead>
              <tbody>
                {
                  Array(5).fill(0).map((_, index) => (
                    <tr key={index} className='border-b border-gray-200'>
                      <td className='p-4'>
                        <div className='flex items-center gap-3'>
                          <Image src={"/img/img_placeholder.png"} alt="photo" width={40} height={40} className='rounded-full'></Image>
                          <div>
                            <p className='text-xs text-gray-600 font-semibold'>John Doe</p>
                            <p className='text-xs text-gray-400'>joshndoe@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className='p-4 text-sm fonr-semibold'>Class pilates for beginner</td>
                      <td className='p-4 text-gray-700 font-semibold'>Rp. 100.000.00</td>
                      <td className='p-4 text-sm text-green-500'> 
                        <div className='flex items-center gap-1'>
                          <RiVerifiedBadgeFill size={18}/> <p>Paid</p>
                        </div>
                      </td>
                      <td className='p-4 text-sm'>10-10-2022</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
    </>
  )
}

export default LatestPackageTransaction