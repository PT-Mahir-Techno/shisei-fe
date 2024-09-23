'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { baseUrl } from '@/lib/variable'
import { useSheet } from '@/store/use-sheet'
import { usePeriod } from '@/store/use-validity-period'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(5, {message: "Minimum 5 characters"}).max(100, {message: "Maximum 100 characters"}),
  duration: z.number().min(1, {message: "minimum 1"}).max(1000, {message: "maximum 1000"}),
})

function PeriodForm() {

  const { setIsOpen, mode, modelId } = useSheet()
  const { loading, getAllPeriod, createPeriod, periodUrl, getSinglePeriod, updatePeriod } : any = usePeriod()

  useEffect(() => {
    if (mode === 'edit') {
      getSingleData()
    }
  }, [])

  const getSingleData = async () => {
    try {
      const res = await getSinglePeriod(`${baseUrl}/admin/duration/${modelId}`)
      await form.reset(res)
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  const form  = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      duration: 0
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (mode == 'edit') {
        await updatePeriod(`${baseUrl}/admin/duration/${modelId}`, data)
      }else{
        await createPeriod(data)
      }
      await getAllPeriod(periodUrl)
      form.reset()
      toast.success("Period created")
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
              name='duration'
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="duration">Duration (Days)</Label>
                    <FormControl>
                      <Input type="number" id="duration" placeholder="Duration" {...form.register('duration', {valueAsNumber: true})} />
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

export default PeriodForm