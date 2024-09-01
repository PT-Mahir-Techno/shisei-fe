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


type profileSettingProps = {
  close?: () => void
}

const ProfileSetting = ({close}: profileSettingProps) => {
  const [date, setDate] = React.useState<Date>()
  return (
    <>
      <div className='pb-2 mb-4 font-noto_serif font-bold text-xl text-gray-800 dark:text-gray-200 border-b border-gray-200'>
        Profile Setting
      </div>

      <div className="grid w-full items-center gap-1.5 mb-5">
        <Label htmlFor="name" className="mb-1 text-gray-600">Name</Label>
        <Input type="text" id="name" placeholder="John Doe" />
      </div>
      
      <div className='mb-5'>
        <div className='mb-1.5'>
          <Label htmlFor="name" className="mb-1 text-gray-600">Date of birth</Label>
        </div>
        <Popover modal={true}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className='mb-5'>
        <div className='mb-2'>
          <Label htmlFor="gender" className="mb-1 text-gray-600">gender</Label>
        </div>
        <RadioGroup defaultValue="comfortable" className='flex gap-4'>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid w-full items-center gap-1.5 mb-5">
        <Label htmlFor="email" className="mb-1 text-gray-600">Email</Label>
        <Input type="text" id="email" placeholder="john.doe@mail.com" />
      </div>

      <div className="grid w-full items-center gap-1.5 mb-5">
        <Label htmlFor="phone" className="mb-1 text-gray-600">Phone Number</Label>
        <Input type="text" id="phone" placeholder="081234567890" />
      </div>

      <div className="grid w-full items-center gap-1.5 mb-5">
        <Label htmlFor="country" className="mb-1 text-gray-600">Country (Optional)</Label>
        <Input type="text" id="country" placeholder="Indonesia" />
      </div>

      <div className="grid w-full gap-1.5 mb-5">
        <Label htmlFor="address">Your address</Label>
        <Textarea placeholder="Type your address here." id="address" />
      </div>

      <div className='flex justify-end gap-4'>
        <Button onClick={close} variant={"secondary"}>Cancel</Button>
        <Button>Save</Button>
      </div>
    </>
  )
}

export default ProfileSetting