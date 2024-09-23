'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSchedule } from '@/store/use-schedule'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

const title = 'Setting Schedule'

const formSchema = z.object({
  set_hour_to_cancel: z.string().min(1, "Minimum 1 character").max(255, "Maximum 255 characters"),
  set_hour_before_schedule: z.string().min(1, "Minimum 1 character").max(255, "Maximum 255 characters"),
})

const SettingSchedulePage = () => {

  const {loading, getSettingSchedule, setSettingSchedule} = useSchedule()

  useEffect(() => {
    initSate()
  }, [])

  const initSate = async () => {
    try {
      const res = await getSettingSchedule()
      if (res.data) {
        form.reset(res.data)
      }
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      set_hour_to_cancel: '',
      set_hour_before_schedule: '',
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await setSettingSchedule(data)
      await initSate()
      toast.success("Setting saved")
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  return (
    <>
      <div>
        <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
        <p className="text-gray-500 dark:text-gray-100 text-sm">data {title}</p>
      </div>

      <div className='w-full bg-background px-6 py-4 rounded-lg my-8'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-12 mb-5">
              <FormField
                  control={form.control}
                  name="set_hour_to_cancel"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name" className="mb-1 text-gray-600">Hour to cancel (in Hour)</Label>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} placeholder="" type='number' min={1} />
                      </FormControl>
                      <FormDescription>
                        Set allowed hour before cancel
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="set_hour_before_schedule"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name" className="mb-1 text-gray-600">Reminder before start class (in Hour)</Label>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} placeholder="" type='number' min={1} />
                      </FormControl>
                      <FormDescription>
                        Set reminder (in) hours before start class schedule
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>
            
            <div className='flex justify-end mt-8'>
              <Button disabled={loading} type="submit">
                {
                  loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                }
                Save Data
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </>
  )
}

export default SettingSchedulePage