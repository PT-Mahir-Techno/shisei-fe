'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import { useStudio } from '@/store/use-studio'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

const formSchema = z.object({
  sunday: z.string().min(1, "Min 1 character").max(255, "Max 255 character"),
  monday: z.string().min(1, "Min 1 character").max(255, "Max 255 character"),
  tuesday: z.string().min(1, "Min 1 character").max(255, "Max 255 character"),
  wednesday: z.string().min(1, "Min 1 character").max(255, "Max 255 character"),
  thursday: z.string().min(1, "Min 1 character").max(255, "Max 255 character"),
  friday: z.string().min(1, "Min 1 character").max(255, "Max 255 character"),
  saturday: z.string().min(1, "Min 1 character").max(255, "Max 255 character"),
})

const ScheduleStudioForm = ({close, data, id}: {close: () => void, data:any, id:any}) => {

  const {getSingleStudio, openingHours} = useStudio()
  const [loading, setLoading] = React.useState(false)


  const form = useForm<z.infer <typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {...openingHours}
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const res = await api.post(`${baseUrl}/admin/studio/${id}/opening`, data)
      await getSingleStudio(`${baseUrl}/admin/studio/${id}`)
      close()
      form.reset()
      toast.success("Schedule saved")
      setLoading(false)
    } catch (error:any) {
      toast.error(error.data.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
              control={form.control}
              name="sunday"
              render={({ field }) => (
                <FormItem className='w-full mb-4 flex justify-between items-center'>
                  <div>
                    <Label>Sunday (open - close)</Label>
                  </div>
                  <div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="monday"
              render={({ field }) => (
                <FormItem className='w-full mb-4  flex justify-between items-center'>
                  <div>
                    <Label>Monday (open - close)</Label>
                  </div>
                  <div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="tuesday"
              render={({ field }) => (
                <FormItem className='w-full mb-4  flex justify-between items-center'>
                  <div>
                    <Label>Tuesday (open - close)</Label>
                  </div>
                  <div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="wednesday"
              render={({ field }) => (
                <FormItem className='w-full mb-4  flex justify-between items-center'>
                  <div>
                    <Label>Wednesday (open - close)</Label>
                  </div>
                  <div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="thursday"
              render={({ field }) => (
                <FormItem className='w-full mb-4  flex justify-between items-center'>
                  <div>
                    <Label>Thursday (open - close)</Label>
                  </div>
                  <div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="friday"
              render={({ field }) => (
                <FormItem className='w-full mb-4  flex justify-between items-center'>
                  <div>
                    <Label>Friday (open - close)</Label>
                  </div>
                  <div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="saturday"
              render={({ field }) => (
                <FormItem className='w-full mb-4  flex justify-between items-center'>
                  <div>
                    <Label>Saturday (open - close)</Label>
                  </div>
                  <div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-3 items-center'>
              <Button type='button' onClick={() => close()} variant={"outline"}>Close</Button>
              <Button disabled={loading}>
                {
                  loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                }
                Save
              </Button>
            </div>
        </form>
      </Form>
    </div>
  )
}

export default ScheduleStudioForm