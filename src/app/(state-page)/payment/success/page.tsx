'use client'

import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import { Button } from '@/components/ui/button';
import { RiHome2Fill } from 'react-icons/ri';
import Link from 'next/link';

const SuccessPage = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='container flex flex-col items-center'>
        <div className='mb-6'>
          <Player
            autoplay={true}
            loop={true}
            controls={true}
            src={"/animation/success.json"}
            style={{ height: '200px', width: '200px' }}
          ></Player>
        </div>
        <div className='text-center mb-5'>
          <h2 className='font-bold font-noto_serif text-xl text-gray-600 dark:text-gray-300 mb-4'>Your payment was successful</h2>
          <p className='max-w-sm text-gray-500'>
            Thank you for your purchase. Your payment has been processed and your package is active. You can now access all the features of the package you purchased.
          </p>
        </div>
        <div className='mt-4'>
          <Link href={"/"}>
            <Button size={"lg"}><RiHome2Fill className='mr-3'/> Back to home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage