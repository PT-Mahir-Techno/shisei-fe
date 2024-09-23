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


type profileSettingProps = {
  close?: () => void
}

const formSchema  = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(255, 'Name must be at most 255 characters'),
  email: z.string().email('Invalid email address').min(3, 'Email must be at least 3 characters').max(255, 'Email must be at most 255 characters'),
  phone: z.string().min(3, 'Phone number must be at least 3 characters').max(255, 'Phone number must be at most 255 characters'),
  gender: z.enum(['male', 'female']),
  country: z.string().min(3, 'Country minimum 3 character').max(255, 'Country must be at most 255 characters'),
  address: z.string().max(255, 'Address must be at most 255 characters').min(3, 'Address must be at least 3 characters'),
  birth: z.date(),
})

const ProfileSetting = ({close}: profileSettingProps) => {
  const {loading, updateProfile, getPorfile, data:user} = useProfile()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {...user, birth: user.birth ? new Date(user.birth): ''},
  })

  const handlesubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const birth = format(data.birth, 'yyyy-MM-dd')
      const newData = {...data, code_phone:user.code_phone, birth: birth}
      await updateProfile('/dashboard/profile/update-profile', newData)
      await getPorfile('/dashboard/profile')
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
            name="birth"
            render={({ field }) => (
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <FormItem>
                  <div>
                    <Label htmlFor="name">Date of Birth</Label>
                  </div>
                  <FormControl>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
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
            name="country"
            render={({ field }) => (
              <FormItem className='w-full mb-4'>
                <Label>Country</Label>
                <FormControl>
                  <Input placeholder="enter your country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
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