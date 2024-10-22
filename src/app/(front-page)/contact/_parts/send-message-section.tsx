'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import api from '@/lib/api'
import { useContactPage } from '@/store/use-contact-page'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').max(50, 'Name must be at most 50 characters long'),
  email: z.string().email().min(5, 'Email must be at least 5 characters long').max(50, 'Email must be at most 50 characters long'),
  message: z.string().min(10, 'Message must be at least 10 characters long').max(500, 'Message must be at most 500 characters long')
})

const SendMessageSection = () => {
  const [loading, setLoading] = React.useState(false)

  const {contact, getContacts} = useContactPage()

  useEffect(() => {
    init()
  },[])

  const init = async () => {
    await getContacts()
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const {phone} = contact
      
      // wa.me 

      const link = `https://wa.me/${phone}?text=${encodeURIComponent(data.message)}`
      
      // redirect to whatsapp
      window.location.href = link

      // await api.post('/send-suggestion', data)
      form.reset()
      toast.success('Message sent successfully')
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='w-full p-8 border border-gray-200 rounded-lg'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='mb-5'>
            <div>Send us a message</div>
          </div>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email" className="mb-1 text-gray-600">Email</Label>
                  <FormControl>
                    <Input {...field} placeholder="email" />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full gap-1.5 mb-5">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="message" className="mb-1 text-gray-600">Message</Label>
                  <FormControl>
                    <Textarea {...field} placeholder="message" />
                  </FormControl>
                  <FormDescription>
                    Your message will be copied to the support team.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button size={"lg"} className='w-full' disabled={loading}>
              {
                loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
              }
              SEND MESSAGE
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SendMessageSection