'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useProfile } from '@/store/use-profile'
import LoadingIcons from 'react-loading-icons'
import toast from 'react-hot-toast'


type profileAdminSettingProps = {
  close?: () => void
}

const formSchema  = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(255, 'Name must be at most 255 characters'),
  email: z.string().email('Invalid email address').min(3, 'Email must be at least 3 characters').max(255, 'Email must be at most 255 characters'),
})

const ProfileAdminSetting = ({close}: profileAdminSettingProps) => {
  const {loading, updateProfile, getPorfile, data:user} = useProfile()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {...user},
  })

  const handlesubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateProfile('/admin/profile/update-profile', data)
      await getPorfile()
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

export default ProfileAdminSetting