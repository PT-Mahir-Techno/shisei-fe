import { Button } from '@/components/ui/button'
import React from 'react'
import { RiMailFill, RiMailOpenFill } from 'react-icons/ri'

const VerifyPage = () => {
  return (
    <div className="w-full min-h-[500px] p-8 bg-background rounded-md flex flex-col items-center justify-center">
        <RiMailOpenFill className="w-12 h-12 text-primary mb-2"/>
        <h2 className='font-noto_serif font-bold text-2xl text-center text-primary mb-4'>Confirm Your Email</h2>
        <p className='text-sm text-gray-500 mb-5'>Please check your email to verify your <br /> account, or resend the verification link.</p>
        <Button  size={"lg"}>Resend Verification</Button>
    </div>
  )
}

export default VerifyPage