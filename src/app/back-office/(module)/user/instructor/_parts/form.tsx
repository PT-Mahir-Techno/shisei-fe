'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useStaff } from '@/store/use-staff'
import { useSheet } from '@/store/use-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'
import phoneCodes from '@/lib/dial-code'
import Image from 'next/image'
import { useRole } from '@/store/use-role'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'

export const formSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  email: z.string().email({message: "Invalid email"}),
  role_id: z.string().min(1, {message: "Min 1 character"}).max(100, {message: "Max 100 character"}),
  code_phone: z.string().min(2, {message: "Min 1 character"}).max(100, {message: "Max 100 character"}),
  phone: z.string().min(10, {message: "Min 10 character"}).max(30, {message: "Max 30 character"}),
  password: z.string().min(6, {message: "Min 6 character"}).max(100, {message: "Max 100 character"}),
})

const StaffForm = ({action}:{action: () => void}) => {
  const {authState} = React.useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const { setIsOpen, mode, modelId } = useSheet()
  const { loading, getAllStaff, createStaff, staffUrl, getSingleStaff, updateStaff  } : any = useStaff()
  const { roles, getAllRoleNoPaginate } = useRole()

  useEffect(() => {
    if (mode === 'edit') {
      getSingleData()
    }
    getAllRoleNoPaginate(`${baseUrl}${prefix}/role?type=nopaginate`)
  }
  , [])

  const getSingleData = async () => {
    try {
      const res = await getSingleStaff(`${baseUrl}${prefix}/staff/${modelId}`)
      delete res.password
      await form.reset(res)
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role_id: '',
      code_phone: '',
      phone: ''
    },
    resetOptions: {
      keepDirtyValues: true
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (mode === 'edit') {
        await updateStaff(`${baseUrl}${prefix}/staff/${modelId}`, data)
      } else{
        await createStaff(prefix, data)
      }
      
      await getAllStaff(staffUrl)
      form.reset()
      toast.success("Staff saved")
    } catch (error:any) {
      toast.error(error.message)
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
                                <SelectItem key={index} value={item.dial_code as string}>
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
                      <Input {...field}  placeholder="phone number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="role_id"
              render={({ field }) => (
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                  <FormItem>
                    <Label htmlFor="valid_days">Role</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="--select one --" />
                          </SelectTrigger>
                        </FormControl>
                      <SelectContent>
                        {
                          roles?.map((role: any) => (
                            <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
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
            />
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

export default StaffForm