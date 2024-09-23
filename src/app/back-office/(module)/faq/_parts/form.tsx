'use client'

import React, { useEffect } from 'react'
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
import { useFaq } from '@/store/use-faq'
import { Textarea } from '@/components/ui/textarea'
import { baseUrl } from '@/lib/variable'

export const formSchema = z.object({
  question: z.string().min(5, {message: "Minimum 5 character"}).max(999999999999, {message: "Maximum 100 characters"}),
  answer: z.string().min(5, {message: "Minimum 5 character"}).max(999999999999, {message: "Maximum 100 characters"}),
})


const LocationForm = () => {

  const { setIsOpen, mode, modelId } = useSheet()
  const { loading, getAllFaq, createFaq, faqUrl, getSingleFaq, updateFaq } : any = useFaq()


  useEffect(() => {
    if (mode === 'edit') {
      getSingleData()
    }
  }, [])

  const getSingleData = async () => {
    try {
      const res = await getSingleFaq(`${baseUrl}/admin/faq/${modelId}`)
      await form.reset(res)
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      answer: '',
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (mode == 'edit') {
        await updateFaq(`${baseUrl}/admin/faq/${modelId}`, data)
      }else{
        await createFaq(data)
      }

      await getAllFaq(faqUrl)
      form.reset()
      toast.success("Location saved")
    } catch (error:any) {
      toast.error(error)
    }
    setIsOpen(false)
  }


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} >
        <div className="grid w-full items-center gap-1.5 mb-5">
          <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name" className="mb-1 text-gray-600">Question</Label>
                  <FormControl>
                    <Textarea {...field} placeholder="question" />
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
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name" className="mb-1 text-gray-600">Answer</Label>
                  <FormControl>
                    <Textarea  className='h-64' {...field} placeholder="answer" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
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

export default LocationForm