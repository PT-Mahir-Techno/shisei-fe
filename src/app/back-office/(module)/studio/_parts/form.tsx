'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useStudio } from '@/store/use-studio'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, "Minimum 1 character").max(225, "Maximum 225 characters"),
  title: z.string().min(1, "Minimum 1 character").max(225, "Maximum 225 characters"),
  subtitle: z.string().min(1, "Minimum 1 character").max(1000, "Maximum 1000 characters"),
  address: z.string().min(1, "Minimum 1 character").max(1000, "Maximum 1000 characters"),
  maps: z.string().min(1, "Minimum 1 character").max(1000, "Maximum 1000 characters"),
  photo:z.any().optional().refine((files) => files?.length === 0 || files?.[0]?.size < 5000000, {
    message: 'File size must be less than 5MB',
  }).refine(file => file.length == 1 ? ["image/jpeg", "image/jpg", "image/png"].includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
})

const StudioForm = ({close}: {close: () => void}) => {

  const {loading, createStudio, getAllStudio, studioUrl} = useStudio()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      subtitle: "",
      address: "",
      maps: ""
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSUbmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createStudio(data)
      await getAllStudio(studioUrl)
      form.reset()
      close()
      toast.success("Studio created successfully")
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSUbmit)}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className="grid w-full items-center gap-1.5 mb-5">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name" className="mb-1 text-gray-600">Name</Label>
                      <FormControl>
                        <Input {...field} placeholder="name" />
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="title" className="mb-1 text-gray-600">Tiele</Label>
                      <FormControl>
                        <Input {...field} placeholder="title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5 mb-5">
            <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name" className="mb-1 text-gray-600">SubTitle</Label>
                    <FormControl>
                      <Textarea  className='h-64' {...field} placeholder="subtitle" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
          </div>
          <div className="grid w-full items-center gap-1.5 mb-5">
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name" className="mb-1 text-gray-600">Address</Label>
                    <FormControl>
                      <Textarea {...field} placeholder="address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className="grid w-full items-center gap-1.5 mb-5">
              <FormField
                  control={form.control}
                  name="maps"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="title" className="mb-1 text-gray-600">Maps url</Label>
                      <FormControl>
                        <Input {...field} placeholder="Maps Url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5 mb-5">
              <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="title" className="mb-1 text-gray-600">Photo</Label>
                      <FormControl>
                        <Input type='file' accept='image/*' {...form.register("photo")} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>
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

export default StudioForm