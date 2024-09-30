'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useContact } from '@/store/use-contact'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

const title = 'Setting Contact'

const formSchema = z.object({
  fax: z.string().min(1, "Minimum 1 character").max(255, "Maximum 255 characters"),
  phone: z.string().min(1, "Minimum 1 character").max(255, "Maximum 255 characters"),
  email: z.string().min(1, "Minimum 1 character").max(255, "Maximum 255 characters"),
  map_url: z.string().min(1, "Minimum 1 character").max(255, "Maximum 255 characters"),
  instagram_url: z.string().min(1, "Minimum 1 character").max(255, "Maximum 255 characters"),
  facebook_url: z.string().min(1, "Minimum 1 character").max(255, "Maximum 255 characters"),
  linkedin_url: z.string().min(1, "Minimum 1 character").max(255, "Maximum 255 characters"),
  address: z.string().min(1, "Minimum 1 character").max(255, "Maximum 255 characters"),
})

const SettingContactPage = () => {

  const {loading, getSettingContact, setSettigContact} = useContact()

  useEffect(() => {
    initSate()
  }, [])

  const initSate = async () => {
    try {
      const res = await getSettingContact()
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
      fax: '',
      phone: '',
      email: '',
      map_url: '',
      instagram_url: '',
      facebook_url: '',
      linkedin_url: '',
      address: '',
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await setSettigContact(data)
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
                  name="fax"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name" className="mb-1 text-gray-600">Fax</Label>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} placeholder="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name" className="mb-1 text-gray-600">Phone</Label>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} placeholder=""/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-12 mb-5">
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email" className="mb-1 text-gray-600">Email</Label>
                      <FormControl>
                        <Input type='email' {...field} value={field.value ?? ''} placeholder=""/> 
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="instagram_url"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="instagram_url" className="mb-1 text-gray-600">Instagram</Label>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} placeholder=""/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-12 mb-5">
              <FormField
                  control={form.control}
                  name="facebook_url"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="facebook_url" className="mb-1 text-gray-600">Facebook</Label>
                      <FormControl>
                        <Input  {...field} value={field.value ?? ''} placeholder=""/> 
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="linkedin_url"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="linkedin_url" className="mb-1 text-gray-600">Linkedin</Label>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} placeholder=""/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-12 mb-5">
              <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="address" className="mb-1 text-gray-600">Address</Label>
                      <FormControl>
                        <Input  {...field} value={field.value ?? ''} placeholder=""/> 
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="map_url"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="map_url" className="mb-1 text-gray-600">Map url</Label>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} placeholder=""/>
                      </FormControl>
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

export default SettingContactPage