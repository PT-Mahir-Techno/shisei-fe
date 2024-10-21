'use client'

import React, { useContext, useEffect } from 'react'
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
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useTemplate } from '@/store/use-template'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const formSchema = z.object({
  template: z.string().min(1, {message: "Name is required"}),
  is_select: z.string().min(1, {message: "is_select is required"}),
})

const TemplateForm = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const { setIsOpen, modelId, mode } = useSheet()
  const { loading, getAllTemplate, createTemplate, templateUrl, getSingleTemplate, template, updateTemplate } : any = useTemplate()

  useEffect(() => {
    if (mode === 'edit') {
      getSingleData()
    }
  }, [])

  const getSingleData = async () => {
    try {
      const res = await getSingleTemplate(`${baseUrl}${prefix}/template/${modelId}`)
      await form.reset(res)
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      template: '',
      is_select: '',
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (mode === 'edit') {
        await updateTemplate(`${baseUrl}${prefix}/template/${modelId}`, data)
      }else {
        await createTemplate(`${prefix}/template`, data)
      }
      await getAllTemplate(templateUrl)
      toast.success("Template created")
      form.reset()
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
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name" className="mb-1 text-gray-600">Message</Label>
                    <FormControl>
                      <Input {...field} placeholder="location name" />
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
              name="is_select"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="valid_days">Status</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="--select one --" />
                          </SelectTrigger>
                        </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Active</SelectItem>
                        <SelectItem value="0">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>
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

export default TemplateForm