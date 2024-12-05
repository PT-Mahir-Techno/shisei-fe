'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { baseUrl } from '@/lib/variable'
import { useLocation } from '@/store/use-location'
import { scheduleFormScheme } from '@/types/schedule-type'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Editor from 'react-simple-wysiwyg';
import { z } from 'zod'
import { useStaff } from '@/store/use-staff'
import { useSchedule } from '@/store/use-schedule'
import LoadingIcons from 'react-loading-icons'
import { useSheet } from '@/store/use-sheet'
import toast from 'react-hot-toast'
import LoadingState from '@/components/ui/loading-state'
import { AuthContex } from '@/providers/auth-provider'
import { usePackageCategory } from '@/store/use-package-category'

const ScheduleForm = ({date, close} : {date:any, close: () => void}) => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState
  
  const {locations, getAllLocationNoPaginate, loading:loadingLocation} = useLocation()
  const {packageCategorys, getAllPackageCategoryNoPaginate} = usePackageCategory()
  const {staffs, getAllStaffNoPaginate, loading:loadingStaff} = useStaff()
  const {createSchedule, loading, getScheduleConverted, getSingleSchedule, updateSchedule} = useSchedule()
  const {modelId} = useSheet()

  useEffect(() => {
    getAllLocationNoPaginate(`${baseUrl}${prefix}/location?type=nopaginate`)
    getAllStaffNoPaginate(`${baseUrl}${prefix}/staff?type=nopaginate`)
    getAllPackageCategoryNoPaginate(`${baseUrl}${prefix}/category?type=nopaginate`)
  }, [])

  useEffect(() => {
    if(modelId) {
      fetcSingleSchedule()
    }
  }, [modelId])

  const fetcSingleSchedule = async () => {
    try {
      const res = await getSingleSchedule(`${baseUrl}${prefix}/schedule/${modelId}`)
    
      if (res){
        const dateSplited = res.date.split('-')
        const date = `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`
    
        form.reset({
          location_id: res.location.id,
          staff_id: res.staff.id,
          date: new Date(date),
          max_order: res.max_order,
          ...res
        })
      }
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  const form = useForm<z.infer<typeof scheduleFormScheme>>({
    resolver: zodResolver(scheduleFormScheme),
    defaultValues: {
      name: '',
      date: date ?? '',
      time: '',
      duration: '',
      location_id: '',
      description: '',
      staff_id: '',
      max_order: '',
      color: '',
      category_id: '',
      credit: 1
    }
  })

  const handleSumit = async (data: z.infer<typeof scheduleFormScheme>) => {
    try {
      const formData = new FormData()

      // convert date to 2024-09-19 format mont and date 2 digit
      const date = new Date(data.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const formatedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`

      formData.append('date', formatedDate)
      formData.append('name', data.name)
      formData.append('time', data.time)
      formData.append('duration', data.duration)
      formData.append('location_id', data.location_id)
      formData.append('description', data.description)
      formData.append('staff_id', data.staff_id)
      formData.append('max_order', data.max_order.toString())
      formData.append('color', data.color)
      formData.append('category_id', data.category_id)
      formData.append('credit', data.credit.toString())  

      if (data.photo[0]){
        formData.append('image', data.photo[0])
      }

      if (modelId) {
        await updateSchedule(prefix, modelId, formData)
      }else{
        await createSchedule(prefix, formData)
      }

      let scheduleUrl = role == 'admin'
      ? `${baseUrl}${prefix}/schedule?type=nopaginate&month=${new Date().getMonth() + 1}`
      : `${baseUrl}${prefix}/my-schedule?type=nopaginate&month=${new Date().getMonth() + 1}`

      await getScheduleConverted(scheduleUrl)
      form.reset()
      close()
      toast.success('Schedule created')
    } catch (error:any) {
      toast.error(error.message)
    }
  }

  return (
    <div className='overflow-auto max-h-[85vh] px-2 relative'>
      {
        loading ? <div className='h-[50vh]'><LoadingState isTransparent={true} isFixed={false} /></div>
        : <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSumit)} >

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

              <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                  <FormField
                    control={form.control}
                    name="max_order"
                    render={({ field }) => (
                      <FormItem className='w-full mb-4'>
                        <Label>Customer Quota</Label>
                        <FormControl>
                          <Input type='number' placeholder="Quota" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem className='w-full mb-4'>
                        <Label>Photo</Label>
                        <FormControl>
                          <Input accept='image/*' {...form.register('photo')} type='file' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                        <FormItem>
                          <Label htmlFor="valid_days">Category</Label>
                          <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="--select one --" />
                                </SelectTrigger>
                              </FormControl>
                            <SelectContent>
                              {
                                packageCategorys?.map((ctg: any) => (
                                  <SelectItem key={ctg.id} value={ctg.id}>{ctg.name}</SelectItem>
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
                    name="credit"
                    render={({ field }) => (
                      <FormItem className='w-full mb-4'>
                        <Label>Credit</Label>
                        <FormControl>
                          <Input type='number' placeholder="Credit" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                      <FormItem>
                        <div>
                          <Label htmlFor="name">Date</Label>
                        </div>
                        <FormControl>
                          <Popover modal={true}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className='w-full mb-4'>
                      <Label>Time</Label>
                      <FormControl>
                        <input  className="w-full py-2 border border-primary/70 outline-none px-3 rounded-lg" type='time' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className='w-full mb-4'>
                      <Label>Duration (in minutes)</Label>
                      <FormControl>
                        <Input type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <FormField
                  control={form.control}
                  name="staff_id"
                  render={({ field }) => (
                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                      <FormItem>
                        <Label htmlFor="valid_days">Staff/ Instructor</Label>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="--select one --" />
                              </SelectTrigger>
                            </FormControl>
                          <SelectContent>
                            {
                              staffs?.map((location: any) => (
                                <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
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
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem className='w-full mb-4'>
                      <Label>Pick a Color</Label>
                      <FormControl>
                        <Input placeholder="Name" {...form.register("color")} type='color' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
              <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className='w-full mb-4 rounded'>
                      <Label className='mb-2'>Description</Label>
                      <FormControl>
                        <Editor containerProps={{ className: "w-full h-60 border rounded-b-lg bg-clip-border" }} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
                <div className='flex justify-end'>
                  <Button type='button' variant={"outline"} size={"lg"} className="mx-2" onClick={close}>Cancel</Button>
                  <Button className="" size={"lg"}
                    disabled={loading}
                  >
                    {
                      loading &&
                      <LoadingIcons.Oval strokeWidth={5} className="w-4 h-4 mr-2" color='white' />
                    }
                    Save
                  </Button>
                </div>
            </form>
          </Form>
      }
    </div>
  )
}

export default ScheduleForm