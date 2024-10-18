'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSheet } from '@/store/use-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'
import phoneCodes from "@/lib/dial-code"
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCustomer } from '@/store/use-customer'
import { baseUrl } from '@/lib/variable'

export const formSchema = z.object({
  name: z.string().min(3, {message: "Name minimum 3 characters"}).max(100, {message: "Name maximum 100 characters"}),
  gender: z.string().min(1, {message: "Gender is required"}),
  email: z.string().email({message: "Invalid email"}),
  phone: z.string().min(10, {message: "Phone is minimum 10 digits"}).max(20, {message: "Phone is maximum 20 digits"}),
  code_phone: z.string().min(2, {message: "Code phone is required"}),
})

const CustomerForm = ({action}:{action: () => void}) => {

  const { setIsOpen, mode, modelId } = useSheet()
  const { loading, getAllCustomer, createCustomer, customerUrl, getSingleCustomer, updateCustomer } : any = useCustomer()

  useEffect(() => {
    if (mode === 'edit') {
      getSingleData()
    }
  }
  , [])

  const getSingleData = async () => {
    try {
      const res = await getSingleCustomer(`${baseUrl}/admin/user/${modelId}`)
      delete res.password
      await form.reset(res)
    } catch (error:any) {
      toast.error(error?.data?.message)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: '',
      email: '',
      phone: '',
      code_phone: '',
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {

      if (mode === 'edit') {
        await updateCustomer(`${baseUrl}/admin/user/${modelId}`, data)
      } else{
        await createCustomer(data)
      }
      await getAllCustomer(customerUrl)
      form.reset()
      toast.success("Customer saved")
    } catch (error:any) {
      toast.error(error?.data?.message)
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
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="name">Name</Label>
                    <FormControl>
                      <Input {...field}  placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            {/* <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <div>
                      <Label htmlFor="name">Birth Date</Label>
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
                              date > new Date() || date < new Date("1900-01-01")
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
            /> */}

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="name">Gender</Label>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex gap-4'>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value='male' id="r1" checked={field.value === 'male'} />
                              <Label htmlFor="r1">male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value='female' id="r2" checked={field.value === 'female'} />
                              <Label htmlFor="r2">female</Label>
                            </div>
                        </RadioGroup>
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="name">Email</Label>
                    <FormControl>
                      <Input {...field}  placeholder="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            
            <FormField
              control={form.control}
              name="code_phone"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="name">Phone Number Code</Label>
                      <Select key={field.value} onValueChange={field.onChange} defaultValue={field.value} >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a phone code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent >
                          <SelectGroup>
                            <SelectLabel >Phone Code</SelectLabel>
                            {
                              phoneCodes.map((item, index) => (
                                <SelectItem key={item.name} value={item.dial_code as string}>
                                  <div className="flex justify-between gap-8 items-center w-full">
                                    <div className='flex items-center gap-2'>
                                      <div className="w-4 h-4">
                                        <Image src={item.image} alt="flag" width={20} height={20} />
                                      </div>
                                      <span>{item.dial_code}</span>
                                    </div>
                                    <div className='text-gray-500'>{item.name}</div>
                                  </div>
                                </SelectItem>
                              ))
                            }
                            {/* <SelectItem value="apple">Apple</SelectItem> */}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="name">Phone Number</Label>
                    <FormControl>
                      <Input {...field}  placeholder="phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            {/* <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="photo">Photo</Label>
                    <FormControl>
                      <Input {...form.register('photo')} type='file'  placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                      <Input {...field} type='password'  placeholder="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            /> */}
            <div className='text-gray-500 text-sm mb-4 font-semibold'>
             <i> The credential will send to the email</i>
            </div>
            <div>
              <Button className="w-full" size={"lg"}
                disabled={loading}
              >
                {
                  loading &&
                  <LoadingIcons.Oval strokeWidth={5} className="w-4 h-4 mr-2" color='white' />
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

export default CustomerForm