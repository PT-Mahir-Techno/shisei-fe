'use client'

import React from 'react'
import PackageCard from './_parts/package-card'
import { Button } from '@/components/ui/button'
import { RiErrorWarningFill, RiVerifiedBadgeFill } from 'react-icons/ri'
import CustomModal from '@/components/ui/custoom-dialog'
import Link from 'next/link'

import "../../../styles/animations.css";

const BookingPackagePage = () => {

  const [selectedPackage, setSelectedPackage] = React.useState<any>(null)
  const [showModalTransaction, setShowModalTransaction] = React.useState(false)

  return (
    <div className='page-animation'>
      <div className='container pt-20 pb-10 mt-20 flex flex-col lg:flex-row gap-7'>
        <div className='p-5 border border-gray-200 rounded-lg w-12/12 lg:w-9/12'>
          <div className='mb-3 pb-3 border-b border-gray-200'>
            <h2 className='font-noto_serif font-bold text-2xl text-gray-700 dark:text-gray-100'>Choose Your Packages</h2>
          </div>
          <p className='text-gray-600 mb-8 dark:text-gray-200'>With class packages, you can purchase as many or as few classes as you'd like and <br /> 
          use them whenever you're ready. Class packs typically have an expiration date.</p>

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3'>
            {
              Array.from({length: 7}).map((_, index) => (
                <PackageCard select={() => setSelectedPackage(index)} selected={selectedPackage === index}  key={index} />
              ))
            }
          </div>

        </div>
        <div className='w-12/12 lg:w-4/12 '>
            <div className='p-5 border border-gray-200 rounded-lg sticky top-32 transition-all duration-300'>
              <div className='pb-4 mb-6 border-dashed border-b-2 border-primary/40'>
                <h2 className='font-noto_serif font-bold text-lg text-gray-700 mb-2'>1 Session Package</h2>
                <div className='flex justify-between items-center font-noto_serif font-bold text-xl text-gray-700'>
                  <span>Total :</span>
                  <span>Rp. 1.500.000</span>
                </div>
              </div>
              <div className='pb-4 mb-5 border-b-2 border-gray-200'>
                <h2 className='font-noto_serif font-bold text-lg text-gray-700'>Payment Method</h2>
              </div>
              <p className='mb-3 text-gray-600 dark:bg-gray-200 text-sm flex gap-1'> 
                <RiErrorWarningFill size={26} className='text-primary'/> Click the button to continue and proceed to the payment.
              </p>
              <div>
                <Button onClick={() => setShowModalTransaction(true)} size={"lg"} className='w-full'>Pay Now</Button>
              </div>
            </div>
        </div>
      </div>

      <CustomModal open={showModalTransaction} onOpenChange={() => setShowModalTransaction(false)}>
          <div className='flex flex-col items-center'>
            <RiVerifiedBadgeFill size={60} className='text-primary mb-1'/>
            <p className='text-2xl text-primary mb-2'>Thank You</p>
            <h2 className='font-noto_serif font-bold text-xl'>Your reservation is finished.</h2>
            <p className='text-gray-700 mb-5'>Thank you for choosing our service</p>
            <Link href='/booking/1' className='bg-primary hover:bg-primary/50 rounded-lg py-3 px-4 text-white transition-all duration-300' >Continue With The Booking</Link>
          </div>
      </CustomModal>
    </div>
  )
}

export default BookingPackagePage