'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import CustomInput from "@/components/ui/custom-input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import phoneCodes from "@/lib/dial-code"
import { useContext, useEffect, useState } from "react"
import { baseUrl } from "@/lib/variable"
import api from "@/lib/api"
import Cookies from 'js-cookie';
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import LoadingIcons from "react-loading-icons"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AuthContex } from "@/providers/auth-provider"

const formSchema = z.object({
  name: z.string().nonempty().min(3, {message: "Minimum 3 characters"}).max(50, {message: "Maximum 50 characters"}),
  email: z.string().email().min(6, {message: "Minimum 6 characters"}).max(50, {message: "Maximum 50 characters"}),
  phone: z.string().nonempty().min(10, {message: "Minimum 10 characters"}).max(20, {message: "Maximum 20 characters"}),
  code_phone: z.string().nonempty().min( 2, {message: "Minimum 2 characters"}).max(5, {message: "Maximum 5 characters"}),
  password: z.string().min(6).min(6, {message: "Minimum 6 characters"}).max(50, {message: "Maximum 50 characters"}),
  password_confirmation: z.string().min(6).min(6, {message: "Minimum 6 characters"}).max(50, {message: "Maximum 50 characters"}),
  gender: z.string().nonempty()
}).refine(data => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"]
})

const SignUpPage = () => {
  const { authState, setAuthState} = useContext(AuthContex)
  const {loading, register} = useAuth()

  useEffect(() => {
    if (authState._auth && !authState._is_auth && !authState._avaibility) {
      router.replace('/dashboard')
      toast.success("You are already logged in")
    }

    if (authState._auth && !authState._is_auth && !authState._avaibility) {
      router.replace('/otp-verification')
      toast.success("You must verify otp first")
    }

  }
  , [authState])

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      code_phone: '',
      password: '',
      password_confirmation: '',
      gender: '',
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await register(`${baseUrl}/register`, data)
      toast.success("Register Success")
      router.replace('/otp-verification')
    } catch (error:any) {
      if (error?.response){
        toast.error(error?.response?.message)
      }else{
        console.log(error)
        toast.error(error?.data?.message)
      }
    }
  }

  return (
    <div className="p-8 bg-background rounded-md">

        <div className="mb-8">
          <h2 className="font-noto_serif font-bold text-2xl text-gray-600">Create Account.</h2>
        </div>

        <Form {...form}>
          <form onSubmit={ form.handleSubmit(handleSubmit) }>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <Label>Name</Label>
                  <FormControl>
                    <Input placeholder="enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="name">Gender</Label>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex gap-4'>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value='male' id="r1" />
                              <Label htmlFor="r1">male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value='female' id="r2" />
                              <Label htmlFor="r2">female</Label>
                            </div>
                        </RadioGroup>
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <Label>Email address</Label>
                  <FormControl>
                    <Input placeholder="enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="code_phone"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="name">Phone Number Code</Label>
                      <Select key={field.value} onValueChange={field.onChange} defaultValue={field.value} >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a phone code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup >
                            <SelectLabel >Phone Code</SelectLabel>
                            {
                              phoneCodes.map((item, index) => (
                                <SelectItem key={item.name} value={item.dial_code as string} className="w-full">
                                  <div key={item.name} className="flex justify-between gap-8 items-center w-full">
                                    <div className='flex items-center gap-2'>
                                      <div className="w-4 h-4">
                                        <Image src={item.image} alt="flag" width={20} height={20} />
                                      </div>
                                      <span>{item.dial_code}</span>
                                    </div>
                                    <div className='text-gray-500'>{item.name}</div>
                                  </div>
                                </SelectItem>
                              ))
                            }
                            {/* <SelectItem value="apple">Apple</SelectItem> */}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <Label>Phone number</Label>
                  <FormControl>
                    <Input placeholder="enter your phone number" {...field} />
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
                    <Input placeholder="******" type="password" {...field} />
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
                    <Input placeholder="******" type="password" {...field} />
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
                Sign Up
              </Button>
              {/* <Link href={"/verify"}>
              </Link> */}
            </div>
          </form>
        </Form>

        <div className="mt-[12px] text-center text-gray-600">
          <p>Already have an account? <Link className="font-bold text-primary" href="/login">Sign In</Link></p>
        </div>

    </div>
  )
}

export default SignUpPage