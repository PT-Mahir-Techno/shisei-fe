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


type PasswordSettingProps = {
  close?: () => void
}

const PasswordSetting = ({close}: PasswordSettingProps) => {
  const [date, setDate] = React.useState<Date>()
  return (
    <>
      <div className='pb-2 mb-4 font-noto_serif font-bold text-xl text-gray-800 dark:text-gray-200 border-b border-gray-200'>
        Password Setting
      </div>

      <div className="grid w-full items-center gap-1.5 mb-5">
        <Label htmlFor="current" className="mb-1 text-gray-600">Enter Current Password</Label>
        <Input type="password" id="current" placeholder="" />
      </div>
      

      <div className="grid w-full items-center gap-1.5 mb-5">
        <Label htmlFor="new" className="mb-1 text-gray-600">Enter New Password</Label>
        <Input type="password" id="new" placeholder="" />
      </div>

      <div className="grid w-full items-center gap-1.5 mb-5">
        <Label htmlFor="confirm" className="mb-1 text-gray-600">Confirm New Password</Label>
        <Input type="password" id="confirm" placeholder="" />
      </div>

      <div className='flex justify-end gap-4'>
        <Button onClick={close} variant={"secondary"}>Cancel</Button>
        <Button>Save</Button>
      </div>
    </>
  )
}

export default PasswordSetting