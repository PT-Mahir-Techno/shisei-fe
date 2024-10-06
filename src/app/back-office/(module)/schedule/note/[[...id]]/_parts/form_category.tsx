'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthContex } from '@/providers/auth-provider'
import { useCategoryNote } from '@/store/use-category-note'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

const formSchema = z.object({
  category: z.string().min(5, {message: "Minimum 5 character"}).max(500, {message: "Maximum 500 characters"}),
})

const FormCategory = ({close}:any) => {

  const {loading, createCategoryNote, getAllCategoryNoteNoPaginate} = useCategoryNote()
  
  const {authState} = useContext(AuthContex)
  const {_prefix}   = authState

  const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
    },
  })


  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createCategoryNote(_prefix,data)
      await getAllCategoryNoteNoPaginate(`${_prefix}/category-notes`)

      form.reset()
      toast.success("Category saved")
      close()
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className='w-full mb-4'>
                <Label>Category Name</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end items-center gap-4'>
            {/* <Button type='button' size={"lg"} variant={"outline"} onClick={close}>Close</Button> */}
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

export default FormCategory