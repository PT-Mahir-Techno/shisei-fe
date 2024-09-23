'use client'

import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import { Button } from '@/components/ui/button';
import { RiHome2Fill } from 'react-icons/ri';
import Link from 'next/link';

const FailedPage = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='container flex flex-col items-center'>
        <div className='mb-6'>
          <Player
            autoplay={true}
            loop={true}
            controls={true}
            src={"/animation/failed.json"}
            style={{ height: '200px', width: '200px' }}
          ></Player>
        </div>
        <div className='text-center mb-5'>
          <h2 className='font-bold font-noto_serif text-xl text-red-600  mb-4'>Your payment was failed</h2>
          <p className='max-w-sm text-red-300'>
            Sorry, your payment was failed. Please try again later. If you have any questions, please contact our support team.
          </p>
        </div>
        <div className='mt-4'>
          <Link href={"/"}>
            <Button size={"lg"} variant={"destructive"}><RiHome2Fill className='mr-3'/> Back to home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FailedPage