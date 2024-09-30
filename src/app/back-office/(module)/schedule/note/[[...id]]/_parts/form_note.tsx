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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const formSchema = z.object({
  user_id: z.string().min(1, {message: "user is required"}),
  note: z.string().min(5, {message: "Minimum 5 character"}).max(999999999999, {message: "Maximum 100 characters"}),
  file: z.any().optional()
    .refine((files) => files?.length === 0 || files?.[0]?.size < 5000000, {
      message: 'File size must be less than 5MB',
    }).refine(file => file.length == 1 ? ["image/jpeg", "image/jpg", "image/png", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
})


const FormNote = ({close}:any) => {

  const { setIsOpen, mode, modelId } = useSheet()
  const { loading, getAllFaq, createFaq, faqUrl, getSingleFaq, updateFaq } : any = useFaq()


  useEffect(() => {
    // if (mode === 'edit') {
    //   getSingleData()
    // }
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
      user_id: '',
      note: '',
      file: '',
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

          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <div className="grid w-full items-center gap-1.5 mb-4">
                <FormItem>
                  <Label htmlFor="valid_days">Customer</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="--select one --" />
                        </SelectTrigger>
                      </FormControl>
                    <SelectContent>
                      <SelectItem value="all">all location</SelectItem>
                      <SelectItem value={"location.id"}>{"location.name"}</SelectItem>
                      {/* {
                        locations?.map((location: any) => (
                        ))
                      } */}
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className='w-full mb-4'>
                <Label>File Attachment</Label>
                <FormControl>
                  <Input type="file" {...form.register("file")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid w-full items-center gap-1.5 mb-5">
            <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="note" className="mb-1 text-gray-600">Note</Label>
                    <FormControl>
                      <Textarea  className='h-64' {...field} placeholder="note" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
          </div>

          
          <div className='flex justify-end items-center gap-4'>
            <Button size={"lg"} variant={"outline"} onClick={close}>Close</Button>
            <Button  size={"lg"} disabled={loading}>
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

export default FormNote