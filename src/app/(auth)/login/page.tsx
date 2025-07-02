'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import LoadingIcons from "react-loading-icons"
import { z } from "zod"
import { AuthContex } from "@/providers/auth-provider"
import { useProfile } from "@/store/use-profile"
import api from "@/lib/api"
import Cookies from 'js-cookie';

const formSchema = z.object({
  email: z.string().min(3, { message: 'Email or phone is too short' }).max(255, { message: 'Email or phone is too long' }),
  password: z.string().min(6, { message: 'Password is too short' }).max(255, { message: 'Password is too long' })
})

const LoginPage = () => {

  const { authState, setAuthState} = useContext(AuthContex)
  const router = useRouter()
  const {loading, login} = useAuth() 
  const {getPorfile} = useProfile()
  const [profile, setProfile] = useState(null)
  
  useEffect(() => {
    if (authState._auth && authState._is_auth && authState._avaibility) {
      router.replace('/customer/dashboard')
      toast.success("You are already logged in")
    }

    if (authState._auth && !authState._is_auth && !authState._avaibility) {
      handleGetProfile()

      // if (resProfile?.user?.otp)
      router.replace('/otp-verification')
      toast.success("You must verify otp first")
    }
  }
  , [])

  const handleGetProfile = async () => {
    const res = await api.get('/dashboard/profile')
    if (res?.data?.user?.otp){
      await Cookies.set('_is_auth', 'true')
      await Cookies.set('_avaibility', 'customer')

      await setAuthState({
        _auth: Cookies.get('_auth'),
        _is_auth: Cookies.get('_is_auth'),
        _avaibility: Cookies.get('_avaibility')
      })
    }
    router.replace('/otp-verification')
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async ( data: z.infer<typeof formSchema> ) => {
    try {
      const res = await login("/login", data)
      setAuthState({
        _auth: res.data.token,
        _is_auth: 'true',
        _avaibility: res.data.role
      })

      const profile = await getPorfile('/dashboard/profile')

      if (profile && profile?.corporate_pic){
        setAuthState((prev:any) => ({...prev, _is_pic: true}))
        Cookies.set('_is_pic', 'true')
      }
      router.replace('/customer/dashboard')
      toast.success("Login success")
    } catch (error:any) {
      console.log(error)
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
            Please enter your email and password.
          </p>
        </div>

        <Form  {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <Label>Email or Phone</Label>
                  <FormControl>
                    <Input placeholder="enter your email or phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

            <div className="flex items-center justify-between mb-6">
              <div className="items-top flex space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember Me
                  </label>
                </div>
              </div>
              <Link href={"/forgot-password"} className="text-sm font-semibold text-destructive">Forgot Password ?</Link>
            </div>
            <div>
              <Button className="w-full" size={"lg"}
                disabled={loading}
              >
                {
                  loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                }
                Sign In
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

export default LoginPage