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
  email: z.string().min(1, "Min 1 character").max(255, "Max 255 character"),
  fax: z.string().min(1, "Min 1 character").max(255, "Max 255 character"),
  phone: z.string().min(1, "Min 1 character").max(255, "Max 255 character"),
})

const ContactStudioForm = ({close, data, id}: {close: () => void, data:any, id:any}) => {

  const {getSingleStudio, contact} = useStudio()
  const [loading, setLoading] = React.useState(false)

  console.log(data)

  const form = useForm<z.infer <typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {...contact}
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      await api.post(`${baseUrl}/admin/studio/${id}/contact`, data)
      await getSingleStudio(`${baseUrl}/admin/studio/${id}`)

      form.reset()
      close()
      toast.success("Contact saved")
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      toast.error(error.data.message)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='w-full mb-4 flex justify-between items-center'>
                  <div>
                    <Label>Email Address</Label>
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
              name="fax"
              render={({ field }) => (
                <FormItem className='w-full mb-4  flex justify-between items-center'>
                  <div>
                    <Label>Fax</Label>
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
              name="phone"
              render={({ field }) => (
                <FormItem className='w-full mb-4  flex justify-between items-center'>
                  <div>
                    <Label>Phone Number</Label>
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

export default ContactStudioForm