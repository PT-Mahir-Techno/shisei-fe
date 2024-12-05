'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useExtendDay } from '@/store/use-extend-day'
import { useSheet } from '@/store/use-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(5, {message: "Minimum 5 characters"}).max(100, {message: "Maximum 100 characters"}),
  day: z.number().min(1, {message: "minimum 1"}).max(1000, {message: "maximum 1000"}),
  price: z.number().min(1, {message: "Minimum 1 character"}).max(999999999999, {message: "Maximum 100 characters"}),
})

function ExtendDayForm() {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const { setIsOpen, mode, modelId } = useSheet()
  const { loading, getAllExtendDay, createExtendDay, extendDayUrl, getSingleExtendDay, updateExtendDay } : any = useExtendDay()

  useEffect(() => {
    if (mode === 'edit') {
      getSingleData()
    }
  }, [])

  const getSingleData = async () => {
    try {
      const res = await getSingleExtendDay(`${baseUrl}${prefix}/extend-day/${modelId}`)
      await form.reset(res)
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      day: 0,
      price: 0
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (mode == 'edit') {
        await updateExtendDay(`${baseUrl}${prefix}/extend-day/${modelId}`, data)
      }else{
        await createExtendDay(prefix, data)
      }
      await getAllExtendDay(extendDayUrl)
      form.reset()
      toast.success("ExtendDay created")
    } catch (error:any) {
      toast.error(error.data.message)
    }
    setIsOpen(false)
  }

  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="name">Name</Label>
                    <FormControl>
                      <Input type="text" id="name" placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                </div>
              )}
            />
            
            <FormField
              control={form.control}
              name='day'
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="duration">Duration (Days)</Label>
                    <FormControl>
                      <Input type="number" id="duration" placeholder="Duration" {...form.register('day', {valueAsNumber: true})} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="duration">Price</Label>
                    <FormControl>
                      <Input type="number" id="duration" placeholder="Duration" {...form.register('price', {valueAsNumber: true})} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                </div>
              )}
            />

            <div>
              <Button className="w-full" size={"lg"} disabled={loading}>
                {
                  loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                }
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default ExtendDayForm