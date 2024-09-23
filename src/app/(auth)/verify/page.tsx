import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { RiCheckDoubleFill, RiMailFill, RiMailOpenFill } from 'react-icons/ri'

const VerifySuccessPage = () => {
  return (
    <div className="w-full min-h-[500px] p-8 bg-background rounded-md flex flex-col items-center justify-center">
        <RiCheckDoubleFill className="w-12 h-12 text-primary mb-2"/>
        <h2 className='font-noto_serif font-bold text-2xl text-center text-primary mb-4'>Congratulations, your <br /> registration was successful!</h2>
        <div className='flex gap-4'>
          <Link href={"/"}>
            <Button variant={"outline"} >Return to home</Button>
          </Link>
          <Link href={"/otp-verification"}>
            <Button >Verify Opt</Button>
          </Link>
        </div>
    </div>
  )
}

export default VerifySuccessPage