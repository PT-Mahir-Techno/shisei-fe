'use client'

import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

const OtpVerivicationPage = () => {

  const [value, setValue] = React.useState<string|undefined>()

  const router = useRouter()
  const handleSubmit = () => {
    console.log(value)
    router.push('/customer/dashboard')
  }

  return (
    <div className="p-8 bg-background rounded-md">

        <div className="flex flex-col items-center gap-4 mb-8">
          <Link href={"/"}>
            <Image src="/be-secondary-logo.png" alt="logo" width={160} height={0} className="mb-4"/>
          </Link>
          <p className="text-gray-400">
            Please eenter otp code already sent to your phone number
          </p>
        </div>

        <div className="mb-6">
          <InputOTP 
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup className="w-full">
              <InputOTPSlot className="w-[50px] h-[50px]" index={0} />
              <InputOTPSlot className="w-[50px] h-[50px]" index={1} />
              <InputOTPSlot className="w-[50px] h-[50px]" index={2} />
            </InputOTPGroup>
            <InputOTPSeparator className="w-[90px]" />
            <InputOTPGroup className="w-full">
              <InputOTPSlot className="w-[50px] h-[50px]" index={3} />
              <InputOTPSlot className="w-[50px] h-[50px]" index={4} />
              <InputOTPSlot className="w-[50px] h-[50px]" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        <div>
          <Button disabled={(!value) ? true : false} onClick={handleSubmit} className="w-full" size={"lg"}>Verify</Button>
        </div>

        <div className="mt-24 text-center text-gray-600">
          <p>Don't receipt otp ? <Link className="font-bold text-primary" href="/">Resend Code</Link></p>
        </div>

    </div>
  )
}

export default OtpVerivicationPage