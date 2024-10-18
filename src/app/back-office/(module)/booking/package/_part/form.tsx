'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useLocation } from '@/store/use-location'
import { usePackage } from '@/store/use-package'
import { useSheet } from '@/store/use-sheet'
import { usePeriod } from '@/store/use-validity-period'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  price: z.number().min(1, {message: "Minimum 1 character"}).max(999999999999, {message: "Maximum 100 characters"}),
  duration_id: z.string().min(1, {message: "Duration is required"}),
  total_credit: z.number().min(1, {message: "Minimum 1 character"}).max(999999999999, {message: "Maximum 100 characters"}),
  location_id: z.optional(z.string()),
})

const PackageForm = () => {

  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const {locations, getAllLocationNoPaginate} = useLocation()
  const {periods, getAllPeriodNoPaginate} = usePeriod()
  const {loading, createPackage, getAllPackage, success, errorData, packageUrl, getSinglePackage, updatePackage} = usePackage()
  const {setIsOpen, mode, modelId} = useSheet()

  const getSingleData = async () => {
    try {
      const res = await getSinglePackage(`${baseUrl}${prefix}/membership/${modelId}`)
      if (res){
        await form.reset(res)
      }
        
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      duration_id: "",
    },
  })


  useEffect(() => {
    if (mode === 'edit') {
      getSingleData()
    }
    getAllLocationNoPaginate(`${baseUrl}${prefix}/location?type=nopaginate`)
    getAllPeriodNoPaginate(`${baseUrl}${prefix}/duration?type=nopaginate`)
  }, [])

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (data.location_id == "all"){
        delete data.location_id
      }

      if (mode == 'edit') {
        await updatePackage(`${baseUrl}${prefix}/membership/${modelId}`, data)
      }else{
        await createPackage(prefix, data)
      }

      await getAllPackage(packageUrl)

      form.reset()
      toast.success("Package Saved successfully")
    } catch (error:any) {
      toast.error(error.data.message)
    }
    setIsOpen(false)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <Label>Name</Label>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <Label>Price</Label>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...form.register("price", { valueAsNumber: true })} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration_id"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="valid_days">Valid Days</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="--select one --" />
                          </SelectTrigger>
                        </FormControl>
                      <SelectContent>
                        {
                          periods?.map((period: any) => (
                            <SelectItem key={period.id} value={period.id}>{period.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="total_credit"
              render={({ field }) => (
                <FormItem className='w-full mb-4'>
                  <Label>Total Credit</Label>
                  <FormControl>
                    <Input type="number" placeholder="Total Credit" {...form.register("total_credit", { valueAsNumber: true })} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location_id"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="valid_days">Location</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="--select one --" />
                          </SelectTrigger>
                        </FormControl>
                      <SelectContent>
                        <SelectItem value="all">all location</SelectItem>
                        {
                          locations?.map((location: any) => (
                            <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>
              )}
            />
              
            <div>
              <Button className="w-full" size={"lg"}
                disabled={loading}
              >
                {
                  loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                }
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

export default PackageForm