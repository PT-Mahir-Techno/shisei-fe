'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useProfile } from '@/store/use-profile'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'

type PasswordSettingProps = {
  close?: () => void
}

const formSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters').max(255, 'Password must be at most 255 characters'),
  old_password: z.string().min(6, 'Password must be at least 6 characters').max(255, 'Password must be at most 255 characters'),
  password_confirmation: z.string().min(6, 'Password must be at least 6 characters').max(255, 'Password must be at most 255 characters'),
}).refine(data => data.password === data.password_confirmation, {
  message: 'Password confirmation must be same with password',
  path: ['password_confirmation']
})

const PasswordSetting = ({close}: PasswordSettingProps) => {

  const {loading, updatePassword} = useProfile()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      old_password: '',
      password_confirmation: ''
    },
    resetOptions: {
      keepDirtyValues: true,
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await updatePassword(data, '/dashboard/profile/update-password')
      toast.success("password successfuly updated")
      form.reset()
    } catch (error:any) {
      toast.error(error?.data?.message)
      console.log(error)
    }
  }

  return (
    <>
      <div className='pb-2 mb-4 font-noto_serif font-bold text-xl text-gray-800 dark:text-gray-200 border-b border-gray-200'>
        Password Setting
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>

          <FormField
            control={form.control}
            name='old_password'
            render={({field, fieldState}) => (
              <FormItem  className='w-full mb-4'>
                <Label>Old Password</Label>
                <FormControl>
                  <Input type='password' placeholder="enter your old password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({field, fieldState}) => (
              <FormItem  className='w-full mb-4'>
                <Label>New Password</Label>
                <FormControl>
                  <Input type='password' placeholder="enter your new password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password_confirmation'
            render={({field, fieldState}) => (
              <FormItem  className='w-full mb-4'>
                <Label>Password Confirmation</Label>
                <FormControl>
                  <Input type='password' placeholder="enter your password confirmation" {...field} />
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

export default PasswordSetting