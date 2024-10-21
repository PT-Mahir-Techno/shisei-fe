'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Button } from "@/components/ui/button"
import React, { useContext } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useProfile } from '@/store/use-profile'
import LoadingIcons from 'react-loading-icons'
import toast from 'react-hot-toast'
import { AuthContex } from '@/providers/auth-provider'


type profileSettingProps = {
  close?: () => void
}

const formSchema  = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(255, 'Name must be at most 255 characters'),
  email: z.string().email('Invalid email address').min(3, 'Email must be at least 3 characters').max(255, 'Email must be at most 255 characters'),
  phone: z.string().min(3, 'Phone number must be at least 3 characters').max(255, 'Phone number must be at most 255 characters'),
  about: z.string().max(5000, 'Address must be at most 255 characters').min(3, 'Address must be at least 3 characters'),
  alamat: z.string().max(255, 'Address must be at most 255 characters').min(3, 'Address must be at least 3 characters'),
})

const ProfileSetting = ({close}: profileSettingProps) => {
  const {authState} = useContext(AuthContex)
  const {_avaibility:avaibility, _prefix:prefix} = authState

  const {loading, updateProfile, getPorfile, data:user} = useProfile()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {...user, birth: user.birth ? new Date(user.birth): ''},
  })

  const handlesubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const newData = {...data, code_phone:user.code_phone}
      await updateProfile(`${prefix}/profile/update-profile`, newData)
      await getPorfile(`${prefix}/profile`)
      toast.success('Profile successfuly updated')
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  return (
    <>
      <div className='pb-2 mb-4 font-noto_serif font-bold text-xl text-gray-800 dark:text-gray-200 border-b border-gray-200'>
        Profile Setting
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlesubmit)}>
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
            name="email"
            render={({ field }) => (
              <FormItem className='w-full mb-4'>
                <Label>Email</Label>
                <FormControl>
                  <Input type='email' placeholder="enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className='w-full mb-4'>
                <Label>Phone Number</Label>
                <FormControl>
                  <Input type='tel' placeholder="enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alamat"
            render={({ field }) => (
              <FormItem className='mb-4'>
                <Label htmlFor="name" className="mb-1 text-gray-600">Address</Label>
                <FormControl>
                  <Textarea  {...field} placeholder="address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem className='mb-4'>
                <Label htmlFor="about" className="mb-1 text-gray-600">About Me</Label>
                <FormControl>
                  <Textarea  {...field} placeholder="about" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end gap-4'>
            <Button type='button' onClick={close} variant={"secondary"}>Close</Button>
            <Button
              disabled={loading}
            >
              {
                loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
              }
              Save
            </Button>
          </div>

        </form>
      </Form>
    </>
  )
}

export default ProfileSetting