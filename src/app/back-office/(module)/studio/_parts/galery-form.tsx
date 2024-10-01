'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import { useStudio } from '@/store/use-studio'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];


const formSchema = z.object({
  photo: z.any()
  .refine((files) => files?.length === 0 || files?.[0]?.size < 5000000, {
    message: 'File size must be less than 5MB',
  })
  .refine(file => file.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
})

const GaleryStudioForm = ({close, id}: {close : () => void, id:any}) => {

  const [loading, setLoading] = React.useState(false)
  const {getSingleStudio} = useStudio()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const formData = new FormData()
      formData.append('photo', data.photo[0])
      await api.post(`${baseUrl}/admin/studio/${id}/preview`, formData, config)
      await getSingleStudio(`${baseUrl}/admin/studio/${id}`)
      setLoading(false)
      close()
      toast.success("Image saved")
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
              name="photo"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <div>
                    <Label>Image</Label>
                  </div>
                  <div>
                    <FormControl>
                      <Input accept='image/*' type='file' {...form.register('photo')}  />
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

export default GaleryStudioForm