'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { baseUrl } from '@/lib/variable'
import { useAdmin } from '@/store/use-admin'
import { useSheet } from '@/store/use-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const formSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  email: z.string().email({message: "Invalid email"}),
  password: z.string().min(1, {message: "Password is required"}),
  photo: z
  .any()
  .optional()
  .refine((files) => files?.length === 0 || files?.[0]?.size < 5000000, {
    message: 'File size must be less than 5MB',
  })
  .refine(file => file.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
  // .refine(
  //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
  //   "Only .jpg, .jpeg, .png  formats are supported."
  // )
})

const AdminForm = ({action}:{action: () => void}) => {

  const { setIsOpen, mode, modelId } = useSheet()
  const { loading, getAllAdmin, createAdmin, adminUrl, error, errorData, updateAdmin, getSingleAdmin } : any = useAdmin()

  useEffect(() => {
    if (mode === 'edit') {
      getSingleData()
    }
  }, [])

  const getSingleData = async () => {
    try {
      const res = await getSingleAdmin(`${baseUrl}/admin/admin/${modelId}`)
      delete res.password
      await form.reset(res)
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (mode === 'edit') {
        await updateAdmin(`${baseUrl}/admin/admin/${modelId}?_method=PUT`, data)
      }else{
        await createAdmin(data)
      }

      await getAllAdmin(adminUrl)
      form.reset()
      toast.success("Admin saved")
    } catch (error:any) {
      toast.error(error.data.message)
    }
    setIsOpen(false)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="name">Name</Label>
                    <FormControl>
                      <Input {...field}  placeholder="Name" />
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
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="name">Email</Label>
                    <FormControl>
                      <Input {...field}  placeholder="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="photo">Photo</Label>
                    <FormControl>
                      <Input accept='image/*' {...form.register('photo')} type='file'  placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                      <Input {...field} type='password'  placeholder="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <div>
              <Button className="w-full" size={"lg"}
                disabled={loading}
              >
                {
                  loading &&
                  <LoadingIcons.Oval strokeWidth={5} className="w-4 h-4 mr-2" color='white' />
                }
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

export default AdminForm