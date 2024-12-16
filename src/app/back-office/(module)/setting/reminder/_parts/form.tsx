'use client'

import React, { useContext, useEffect } from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import LoadingIcons from "react-loading-icons"
import { Button } from '@/components/ui/button'
import { useSheet } from '@/store/use-sheet'
import toast from 'react-hot-toast'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useReminder } from '@/store/use-reminder'

export const formSchema = z.object({
  message: z.string().min(1, {message: "Name is required"}),
  is_active: z.string().min(1, {message: "is_select is required"}),
})

const ReminderForm = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const { setIsOpen, modelId, mode } = useSheet()
  const { loading, getAllReminder, createReminder, reminderUrl, getSingleReminder, reminder, updateReminder } : any = useReminder()

  useEffect(() => {
    if (mode === 'edit') {
      getSingleData()
    }
  }, [])

  const getSingleData = async () => {
    try {
      const res = await getSingleReminder(`${baseUrl}${prefix}/reminder-class/${modelId}`)
      await form.reset(res)
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      is_active: '',
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (mode === 'edit') {
        await updateReminder(`${baseUrl}${prefix}/reminder-class/${modelId}`, data)
      }else {
        await createReminder(`${prefix}/reminder-class`, data)
      }
      await getAllReminder(reminderUrl)
      toast.success("Reminder created")
      form.reset()
    } catch (error:any) {
      toast.error(error)
    }
    setIsOpen(false)
  }


  return (
    <div>

      <div className='mb-4'>
        <div className='text-sm'>
          <p className='font-semibold mb-2'>This format to fill variable below</p>
          <div>user/customer : {"{{customer}}"}</div>
          <div>duration : {"{{duration}}"}</div>
          <div>class name : {"{{class}}"}</div>
          <div>instructor : {"{{staff}}"}</div>
          <div>date : {"{{date}}"}</div>
          <div className='mb-2'>time : {"{{time}}"}</div>
          <p className='font-semibold mb-2'>formatting</p>
          <div>new line : {"{{newline}}"}</div>
          <div>bold text :  *for bold texts*</div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} >
          
          <div className="grid w-full items-center gap-1.5 mb-5">
            <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name" className="mb-1 text-gray-600">Message</Label>
                    <FormControl>
                      <Textarea className='h-32' {...field} placeholder="message here" />
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
              name="is_active"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="valid_days">Status</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="--select one --" />
                          </SelectTrigger>
                        </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Active</SelectItem>
                        <SelectItem value="0">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>
              )}
            />
          </div>

        

        <Button className="w-full" size={"lg"} disabled={loading}>
          {
            loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
          }
          Save
        </Button>
        </form>
      </Form>
    </div>
  )
}

export default ReminderForm