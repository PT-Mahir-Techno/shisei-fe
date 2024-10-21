'use client'

import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import LoadingIcons from "react-loading-icons"
import { z } from "zod"
import { AuthContex } from "@/providers/auth-provider"
import api from "@/lib/api"
import { baseUrl } from "@/lib/variable"

const formSchema = z.object({
  password: z.string().min(6, { message: 'Password is too short' }).max(255, { message: 'Password is too long' }),
  password_confirmation: z.string().min(6, { message: 'Password is too short' }).max(255, { message: 'Password is too long' }),
  otp: z.string().min(6, { message: 'Password is too short' }).max(6, { message: 'Password is too long' }),
}).refine(data => data.password === data.password_confirmation, {
  message: 'Password confirmation must be same as password',
  path: ['password_confirmation']
})

const LoginPage = () => {

  const { authState} = useContext(AuthContex)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
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
      password: '',
      password_confirmation: '',
      otp: ''
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async ( data: z.infer<typeof formSchema> ) => {
    try {
      setLoading(true)
      await api.post(`${baseUrl}/reset-password`, data)

      setLoading(false)
      router.replace('/login')
      toast.success("Password has been reset successfully")
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
            Reset Password
          </p>
        </div>

        <Form  {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} >

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <Label>Password</Label>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <Label>Password Confirmation</Label>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <Label>OTP Code </Label>
                  <FormControl>
                    <Input max={6} min={6} type="text" placeholder="your otp code, recenly sended" {...field} />
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
                Reset Password
              </Button>
            </div>

          </form>
        </Form>
        

        <div className="mt-24 text-center text-gray-600">
          <p>Have problem ?  please contact our support</p>
        </div>

    </div>
  )
}

export default LoginPage