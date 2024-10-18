'use client'

import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import LoadingIcons from 'react-loading-icons'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/use-auth'
import { AuthContex } from '@/providers/auth-provider'
import { useProfile } from '@/store/use-profile'
import { PermisionParser } from '@/lib/utils'

const formSchema = z.object({
  email: z.string().email({message: "Invalid email"}),
  password: z.string().min(1, {message: "Password is required"}),
})

const LoginBoPage = () => {
  const {setAuthState} = useContext(AuthContex)
  const {loading, login} = useAuth()
  const {getPorfile} = useProfile()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
      defaultValues: {
        email: "admin@mail.com",
        password: "asdfasdf",
      },
    // defaultValues: {
    //   email: "ola@mail.com",
    //   password: "secret123",
    // },
  })
  

  const handleSubmit = async (data : z.infer<typeof formSchema>) => {
    try {
      const res = await login("/admin/login", data)

      let _avaibility: string;
      let url: string;
      let path: string;
      let permision: object;

      if (typeof(res.data.role) == 'object'){
        _avaibility = res.data.role.name
        url = '/staff/profile'
        path =  "/staff"
        permision = PermisionParser(res.data.role.permissions)
      } else{
        _avaibility = res.data.role
        url = '/admin/profile'
        path =  "/admin"
        permision = {}
      }
      
      setAuthState({
        _auth: res.data.token,
        _is_auth: 'true',
        _avaibility: _avaibility,
        _prefix: path,
        _permision: permision
      })

      await getPorfile(url)

      router.replace('/back-office/dashboard')
      toast.success("Login success")
    } catch (err:any) {
      toast.error(err?.data?.message)
    }
  }


  return (
    <>
      <div className="w-9/12 md:w-8/12 lg:w-6/12">

        <div className="flex flex-col gap-4 mb-8">
          <Link href={"/"}>
            <Image src="/be-secondary-logo.png" alt="logo" width={160} height={0} className="mb-4"/>
          </Link>
          {/* <div className='font-bold text-3xl'>
            Hey, Hello 👋
          </div> */}
          <p className="text-gray-400">
            Please enter your email and password.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid w-full items-center gap-1.5 mb-5">
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email" className="mb-1 text-gray-600">Email</Label>
                      <FormControl>
                        <Input {...field} placeholder="Enter your email or username" />
                      </FormControl>
                      {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5 mb-5">
              <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password" className="mb-1 text-gray-600">Password</Label>
                      <FormControl>
                        <Input {...field} type='password' placeholder="Enter your password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>


            {/* <div className="grid w-full items-center gap-1.5 mb-5">
              <Label htmlFor="email" className="mb-1 text-gray-600">Passsword</Label>
              <Input type="email" id="email" placeholder="******" />
            </div> */}
            <div className='mb-6 flex justify-between items-center'>
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
              <div>
                <Link className='text-destructive' href="/forgot-password">Forgot Password?</Link>
              </div>
            </div>

            <div>
              <Button className="w-full" size={"lg"} disabled={loading}>
                {
                  loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                }
                Sign In
              </Button>
            </div>
          </form>
        </Form>

        {/* <div className="mt-24 text-center text-gray-600">
          <p>Don't have an account ? <Link className="font-bold text-primary" href="/signup">Sign Up</Link></p>
        </div> */}

        </div>
    </>
  )
}

export default LoginBoPage