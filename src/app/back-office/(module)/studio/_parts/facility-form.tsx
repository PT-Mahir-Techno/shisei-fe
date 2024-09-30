'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import { useStudio } from '@/store/use-studio'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

const formSchema = z.object({
  photo: z.string().min(1, "Min 1 character").max(255, "Max 255 character"),
  facility: z.string().min(1, "Min 1 character").max(255, "Max 255 character"),
})

const FacilityStudioFOrm = ({close, id}: {close : () => void, id:any}) => {

  const {getSingleStudio} = useStudio()
  const [loading, setLoading] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: '',
      facility: ''
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      await api.post(`${baseUrl}/admin/studio/${id}/facility`, data)
      await getSingleStudio(`${baseUrl}/admin/studio/${id}`)
      form.reset()
      close()
      toast.success("Facility saved")
    } catch (error:any) {
      setLoading(false)
      toast.error(error.data.message)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <div className="grid w-full items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="valid_days">Select Icon</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="--select one --" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="ac">Ac</SelectItem>
                        <SelectItem value="smoking">Smoking</SelectItem>
                        <SelectItem value="tissue">Tissue</SelectItem>
                        <SelectItem value="nager">Hanger</SelectItem>
                        <SelectItem value="dispenser">Dispenser</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="facility"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <div>
                    <Label>Name</Label>
                  </div>
                  <div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-3 items-center'>
            <Button type='button' onClick={() => close()} variant={"outline"}>Close</Button>
            <Button disabled={loading}>
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

export default FacilityStudioFOrm