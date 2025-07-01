'use client'

import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { z } from 'zod'
import { formSchema } from '../_parts/schema'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { useCorporate } from '@/store/use-corporate'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useCoupon } from '@/store/use-coupon'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'

const CreateCouponPage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const router = useRouter()
  const {createCoupon, loading, getAllCoupon} = useCoupon()
  const {getAllCorporateNoPaginate, corporates} = useCorporate()

  useEffect(() => {
    getAllCorporateNoPaginate(`${baseUrl}${prefix}/corporate?type=nopaginate`)
  }, [prefix])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "name" : "",
      "code" : "",
      "type_discount" : "",
      "discount" : 0,
      "start_date" : "",
      "end_date" : "",
      "limit_per_member" : undefined,
      "kuota" : undefined,
      "type" : "",
      "corporate_id" : "",
    },
  })


  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const start_date = new Date(data.start_date)
      const year = start_date.getFullYear()
      const month = start_date.getMonth() + 1
      const day = start_date.getDate()
      const formatedStartDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`

      const end_date = new Date(data.end_date)
      const eyear = end_date.getFullYear()
      const emonth = end_date.getMonth() + 1
      const eday = end_date.getDate()
      const formatedEdndDate = `${eyear}-${emonth < 10 ? `0${emonth}` : emonth}-${eday < 10 ? `0${eday}` : eday}`

      const payload = {
        name : data?.name,
        code : data?.code,
        type_discount : data?.type_discount,
        discount : data?.discount,
        start_date : formatedStartDate,
        end_date : formatedEdndDate,
        limit_per_member : data?.limit_per_member,
        kuota : data?.kuota,
        type : data?.type,
        corporate_id : data?.corporate_id,
      }

      const res = await createCoupon(`${prefix}/coupon`, payload)
      await getAllCoupon(`${prefix}/coupon`)
      toast.success('Coupon created successfully')
      router.push('/back-office/coupon')
    } catch (error:any) {
      toast.error(error?.data?.message)
    }
  }


  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <div className='font-noto_serif font-bold text-xl text-gray-800 dark:text-white'>
          Create Coupon
        </div>
        <div>
          <Link href={'/back-office/coupon'}>
            <Button className='bg-primary text-white'> <RiArrowGoBackFill className='mr-2'/> Back</Button>
          </Link>
        </div>
      </div>

      <div className='bg-background p-4 rounded-lg'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className='grid grid-cols-2 gap-4'>
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
                  name="code"
                  render={({ field }) => (
                    <FormItem className='w-full mb-4'>
                      <Label>Code</Label>
                      <FormControl>
                        <Input placeholder="Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type_discount"
                  render={({ field }) => (
                    <div className="grid w-full mb-4">
                      <FormItem>
                        <Label htmlFor="valid_days">Discount Type</Label>
                        <Select onValueChange={field.onChange} value={field.value ?? undefined}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="--select one --" />
                              </SelectTrigger>
                            </FormControl>
                          <SelectContent>
                            {
                              ['percent', 'price']?.map((type: any, index: number) => (
                                <SelectItem key={index} value={type}>{type}</SelectItem>
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
                  name="discount"
                  render={({ field }) => (
                    <FormItem className='w-full mb-4'>
                      <Label>Discount</Label>
                      <FormControl>
                        <Input type="number" placeholder="Discount" {...form.register("discount", { valueAsNumber: true })} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <FormField
                  control={form.control}
                  name="kuota"
                  render={({ field }) => (
                    <FormItem className='w-full mb-4'>
                      <Label>Coupon Quota</Label>
                      <FormControl>
                        <Input type="number" placeholder="" {...form.register("kuota", { valueAsNumber: true })} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              
              <div>
                <FormField
                  control={form.control}
                  name="limit_per_member"
                  render={({ field }) => (
                    <FormItem className='w-full mb-4'>
                      <Label>Limit Per Member</Label>
                      <FormControl>
                        <Input type="number" placeholder="Limit Per Member" {...form.register("limit_per_member", { valueAsNumber: true })} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <div className="grid w-full mb-4">
                      <FormItem>
                        <div>
                          <Label htmlFor="name">Start Date</Label>
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
                  name="end_date"
                  render={({ field }) => (
                    <div className="grid w-full mb-4">
                      <FormItem>
                        <div>
                          <Label htmlFor="name">End Date</Label>
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
                  name="type"
                  render={({ field }) => (
                    <div className="grid w-full mb-4">
                      <FormItem>
                        <Label htmlFor="valid_days">Coupon Type</Label>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="--select one --" />
                              </SelectTrigger>
                            </FormControl>
                          <SelectContent>
                            <SelectItem value='member'>Member</SelectItem>
                            <SelectItem value='corporate'>Corporate</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="corporate_id"
                  render={({ field }) => (
                    <div className="grid w-full mb-4">
                      <FormItem>
                        <Label htmlFor="valid_days">Corporate</Label>
                        <Select onValueChange={field.onChange} value={field.value ?? undefined}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="--select one --" />
                              </SelectTrigger>
                            </FormControl>
                          <SelectContent>
                            {
                              corporates?.map((ctg: any) => (
                                <SelectItem key={ctg.id} value={ctg.id}>{ctg.name}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </FormItem>
                    </div>
                  )}
                />
              </div>
              
              
                
              <div>
                <Button className="" size={"lg"}
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
      </div>
    </>
  )
}

export default CreateCouponPage