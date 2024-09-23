'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import api from "@/lib/api"
import { baseUrl } from "@/lib/variable"
import { AuthContex } from "@/providers/auth-provider"
import { useProfile } from "@/store/use-profile"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import Cookies from 'js-cookie';
import LoadingIcons from "react-loading-icons"

const formSchema = z.object({
  otp: z.string().min(6, "otp code must be 6 digits").max(6, "otp code must be 6 digits")
})

const OtpVerivicationPage = () => {

  const [loading, setLoading] = React.useState<boolean>(false)
  const {setAuthState} =useContext(AuthContex)
  const {getPorfile} = useProfile()
  const router = useRouter()

  useEffect(() => {
    if (!Cookies.get('_auth')) {
      router.replace('/login')
      toast.error("You must login first")
    }
  }
  , [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: ""
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      await api.post(`${baseUrl}/login/otp-verify`, data)
      await getPorfile('/dashboard/profile')

      await Cookies.set('_is_auth', 'true')
      await Cookies.set('_avaibility', 'customer')

      await setAuthState({
        _auth: Cookies.get('_auth'),
        _is_auth: Cookies.get('_is_auth'),
        _avaibility: Cookies.get('_avaibility')
      })
      
      setLoading(false)
      toast.success("otp code verified")
      router.replace('/customer/dashboard')
    } catch (error:any) {
      setLoading(false)
      toast.error(error.data.message)
    }
  }

  const handleResend = async () => {
    try {
      setLoading(true)
      await api.post(`${baseUrl}/login/otp-resend`)
      toast.success("otp code has been sent to your phone number")
      setLoading(false)
    } catch (error:any) {
      toast.error(error.data.message)
      setLoading(false)
    }
  }

  return (
    <div className="p-8 bg-background rounded-md">

        <div className="flex flex-col items-center gap-4 mb-8">
          <Link href={"/"}>
            <Image src="/be-secondary-logo.png" alt="logo" width={160} height={0} className="mb-4"/>
          </Link>
          <p className="text-gray-400"
          >
            Please eenter otp code already sent to your phone number
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>One-Time Password</FormLabel> */}
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              <Button className="w-full" size={"lg"} disabled={loading}>
                {
                  loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                }
                Verify OTP
              </Button>
            </div>
            
          </form>
        </Form>

        {/* <div className="mb-6">
          
        </div> */}
        

        <div className="mt-24 text-center text-gray-600">
          <p>Don't receipt otp ?
            {
              loading
              ? <span className="text-primary"> Resending...</span>
              : <Button onClick={() => handleResend()} variant={"link"} className="text-md font-bold text-primary" >Resend Code</Button>
            }
          </p>
        </div>

    </div>
  )
}

export default OtpVerivicationPage