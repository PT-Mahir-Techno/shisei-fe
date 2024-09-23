'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import { useStaff } from '@/store/use-staff'
import { zodResolver } from '@hookform/resolvers/zod'
import { set } from 'date-fns'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

const formSchema = z.object({
  sunday: z.boolean().default(false).optional(),
  monday: z.boolean().default(false).optional(),
  tuesday: z.boolean().default(false).optional(),
  wednesday: z.boolean().default(false).optional(),
  thursday: z.boolean().default(false).optional(),
  friday: z.boolean().default(false).optional(),
  saturday: z.boolean().default(false).optional(),
})

const SkeletonState = () => {
  return (
    <div className='flex flex-col gap-4'>
      {
        Array.from({length: 5}).map((_, index) => (
          <Skeleton key={index} className="w-full h-6" />
        ))
      }
    </div>
  )
}

const AvaibilityDay = ({modelId, close}: {modelId: string, close: () => void}) => {

  const [errorSelect, setErrorSelect] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const {staff, getSingleStaff, loading} = useStaff()

  useEffect(() => {
    initData()
  },[])
  
  const initData = async () => {
    await getSingleStaff(`${baseUrl}/admin/staff/${modelId}`)
    if (staff){
      const avaibility = staff.staff.avaibility
      if (avaibility) {
        delete avaibility.id
        delete avaibility.created_at
        delete avaibility.updated_at

        // tranform "1" to true and "0" to false except staff_id
        Object.keys(avaibility).forEach(key => {
          if (key !== 'staff_id') {
            avaibility[key] = avaibility[key] == '1' ? true : false
          }
        })

        console.log(avaibility, 'dari init')
        
        form.reset(avaibility);
      }
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const falseData = (Object.keys(data) as Array<keyof typeof data>).filter(key => data[key] === false)
    if (falseData.length === 7) {
      setErrorSelect('Please select at least one day')
      return
    }

    try {
      setIsLoading(true)
      const newData = {...data, staff_id: modelId}
      await api.post(`${baseUrl}/admin/staff/avaibility/${modelId}`, newData)
      form.reset()
      setIsLoading(false)
      toast.success('Avaibility updated successfully')
      close()
    } catch (error:any) {
      setIsLoading(false)
      toast.error(error.response.data.message)
    }
  }

  return loading
  ? <SkeletonState />  
  : (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div>

            <FormField
              control={form.control}
              name="sunday"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox  onCheckedChange={field.onChange} checked={field.value} />
                    </FormControl>
                    <FormLabel className="text-sm font-medium">
                      Sunday
                    </FormLabel>
                  </div>
                </FormItem>
              )}
             />
            <FormField
              control={form.control}
              name="monday"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox  onCheckedChange={field.onChange} checked={field.value} />
                    </FormControl>
                    <FormLabel className="text-sm font-medium">
                      Monday
                    </FormLabel>
                  </div>
                </FormItem>
              )}
             />
            <FormField
              control={form.control}
              name="tuesday"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox  onCheckedChange={field.onChange} checked={field.value} />
                    </FormControl>
                    <FormLabel className="text-sm font-medium">
                      Tuesday
                    </FormLabel>
                  </div>
                </FormItem>
              )}
             />
            <FormField
              control={form.control}
              name="wednesday"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox  onCheckedChange={field.onChange} checked={field.value} />
                    </FormControl>
                    <FormLabel className="text-sm font-medium">
                      Wednesday
                    </FormLabel>
                  </div>
                </FormItem>
              )}
             />
            <FormField
              control={form.control}
              name="thursday"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox  onCheckedChange={field.onChange} checked={field.value} />
                    </FormControl>
                    <FormLabel className="text-sm font-medium">
                      Thursday
                    </FormLabel>
                  </div>
                </FormItem>
              )}
             />
            <FormField
              control={form.control}
              name="friday"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox  onCheckedChange={field.onChange} checked={field.value} />
                    </FormControl>
                    <FormLabel className="text-sm font-medium">
                      Friday
                    </FormLabel>
                  </div>
                </FormItem>
              )}
             />
            <FormField
              control={form.control}
              name="saturday"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox  onCheckedChange={field.onChange} checked={field.value} />
                    </FormControl>
                    <FormLabel className="text-sm font-medium">
                      Saturday
                    </FormLabel>
                  </div>
                </FormItem>
              )}
             />
            
          </div>
          
          {
            errorSelect && (
              <p className='text-red-500 text-sm'>{errorSelect}</p>
            )
          }

          <div className='mt-6'>
            <Button className="w-full" size={"lg"}
              disabled={isLoading}
            >
              {
                isLoading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
              }
              Save
            </Button>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default AvaibilityDay