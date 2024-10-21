'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import LoadingIcons from "react-loading-icons"
import { z } from "zod"
import { AuthContex } from "@/providers/auth-provider"
import api from "@/lib/api"
import { baseUrl } from "@/lib/variable"

const formSchema = z.object({
  email: z.string().min(3, { message: 'phone is too short' }).max(255, { message: 'Email or phone is too long' }),
})

const ForgotPasswordPage = () => {

  const { authState, setAuthState} = useContext(AuthContex)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  useEffect(() => {
    if (authState._auth && authState._is_auth && authState._avaibility) {
      router.replace('/customer/dashboard')
      toast.success("You are already logged in")
    }
  }
  , [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async ( data: z.infer<typeof formSchema> ) => {
    try {
      setLoading(true)
      
      const res = await api.post(`${baseUrl}/forgot-password`, data)

      router.replace('/reset-password')
      toast.success("OTP has sent to your registered number")
      
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      if (error && error.data) {
        toast.error(error.data.message)
      }else{
        toast.error(error?.message || "Something went wrong")
      }
    }
  }

  return (
    <div className="p-8 bg-background rounded-md">

        <div className="flex flex-col items-center gap-4 mb-8">
          <Link href={"/"}>
            <Image src="/be-secondary-logo.png" alt="logo" width={160} height={0} className="mb-4"/>
          </Link>
          <p className="text-gray-400">
            Please enter your registered number.
          </p>
        </div>

        <Form  {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <Label>Your registered number</Label>
                  <FormControl>
                    <Input placeholder="your registered number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <div>
              <Button className="w-full" size={"lg"}
                disabled={loading}
              >
                {
                  loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                }
                Request OTP
              </Button>
            </div>

          </form>
        </Form>
        

        <div className="mt-24 text-center text-gray-600">
          <p>Don't have an account ? <Link className="font-bold text-primary" href="/signup">Sign Up</Link></p>
        </div>

    </div>
  )
}

export default ForgotPasswordPage