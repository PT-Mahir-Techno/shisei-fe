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
import { usePackageCategory } from '@/store/use-package-category'
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
})

const PackageForm = () => {

  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const {loading, createPackageCategory, getAllPackageCategory, success, errorData, packageCategoryUrl, getSinglePackageCategory, updatePackageCategory} = usePackageCategory()
  const {setIsOpen, mode, modelId} = useSheet()

  const getSingleData = async () => {
    try {
      const res = await getSinglePackageCategory(`${baseUrl}${prefix}/category/${modelId}`)
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
    },
  })


  useEffect(() => {
    if (mode === 'edit') {
      getSingleData()
    }
  }, [prefix, mode, modelId])

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {

      if (mode == 'edit') {
        await updatePackageCategory(`${baseUrl}${prefix}/category/${modelId}`, data)
      }else{
        await createPackageCategory(prefix, data)
      }

      await getAllPackageCategory(packageCategoryUrl)

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