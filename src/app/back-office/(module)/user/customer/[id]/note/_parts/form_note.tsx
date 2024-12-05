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
import { Textarea } from '@/components/ui/textarea'
import { baseUrl } from '@/lib/variable'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useParams } from 'next/navigation'
import { useNote } from '@/store/use-note'
import { AuthContex } from '@/providers/auth-provider'

export const formSchema = z.object({
  category_notes_id: z.string().min(1, {message: "category is required"}),
  notes: z.string().min(5, {message: "Minimum 5 character"}).max(999999999999, {message: "Maximum 100 characters"}),
  file: z.any().optional()
    .refine((files) => files?.length > 0 || files?.[0]?.size < 5000000, {
      message: 'File size must be less than 5MB',
    }).refine(file => file.length == 1 ? ["image/jpeg", "image/jpg", "image/png", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
})


const FormNote = ({close, customerId, categories}:any) => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState
  const {id} = useParams()

  const { setIsOpen, mode, modelId } = useSheet()
  const {loading:loadingNote, createNote, getAllNoteNoPaginate, updateNote, getSingleNote} = useNote()
  
  
  useEffect(() => {
    if (mode === 'edit' || prefix) {
      getSingleData()
    }
  }, [prefix, modelId])


  const getSingleData = async () => {
    try {
      const res = await getSingleNote(`${baseUrl}${prefix}/notes/${modelId}`)
      // console.log(res)
      form.reset(res)
    } catch (error) {
      
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_notes_id: '',
      notes: '',
      file: '',
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log(data)

      const newData = new FormData()

      newData.append('notes', data.notes)
      newData.append('user_id', customerId)
      // newData.append('package_id', id[0])
      newData.append('category_notes_id', data.category_notes_id)

      if (data.file.length > 0) {
        for(let i = 0; i < data.file.length; i++){
          newData.append('file[]', data.file[i])
        }
      }

      if (mode == 'edit') {
        await updateNote(`${baseUrl}${prefix}/notes/${modelId}`, newData)
      }else{
        await createNote(`${prefix}`, newData)
      }

      await getAllNoteNoPaginate(`${baseUrl}${prefix}/notes?type=nopaginate`)
      form.reset()
      toast.success("Note saved")
    } catch (error:any) {
      toast.error(error.data.message)
    }
    setIsOpen(false)
  }


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} >

          <FormField
            control={form.control}
            name="category_notes_id"
            render={({ field }) => (
              <div className="grid w-full items-center gap-1.5 mb-4">
                <FormItem>
                  <Label htmlFor="category_notes_id">Category</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="--select one --" />
                        </SelectTrigger>
                      </FormControl>
                    <SelectContent>
                      {
                        categories?.map((category: any, index:any) => (
                          <SelectItem key={index} value={`${category.id}`}>{category.category}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                  <Input type="file" multiple {...form.register("file")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid w-full items-center gap-1.5 mb-5">
            <FormField
                control={form.control}
                name="notes"
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
            <Button  size={"lg"} disabled={loadingNote}>
              {
                loadingNote && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
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