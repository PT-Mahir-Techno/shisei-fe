'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { z } from 'zod'
import { corporateSchema } from '../_parts/corporateSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useCorporate } from '@/store/use-corporate'
import toast from 'react-hot-toast'
import { AuthContex } from '@/providers/auth-provider'
import { baseUrl } from '@/lib/variable'
import { useRouter } from 'next/navigation'
import LoadingIcons from 'react-loading-icons'

const title = "Corporate"

const CorporateCreateForm = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const [mode, setMode] = React.useState('create')
  const [modelId, setModelId] = React.useState('')
  const router = useRouter()

  const { loading, getAllCorporate, createCorporate, corporateUrl, getSingleCorporate, corporate, updateCorporate } = useCorporate()

  const form = useForm<z.infer<typeof corporateSchema>>({
    resolver: zodResolver(corporateSchema),
    defaultValues: {
      name: '',
    },
  })



  const handlesubmit = async (data: z.infer<typeof corporateSchema>) => {
    try {
      if (mode === 'edit') {
        await updateCorporate(`${baseUrl}${prefix}/corporate/${modelId}`, data)
      }else {
        await createCorporate(`${prefix}/corporate`, data)
      }
      await getAllCorporate(corporateUrl)

      router.push('/back-office/corporate')
      toast.success("Location created")
      form.reset()
    } catch (error:any) {
      toast.error(error)
    }
  }

  return (
    <>
        <div className='mb-3 flex items-center justify-between'>
          <div className='font-noto_serif font-bold text-xl text-gray-800 dark:text-white'>
            Create Corporate
          </div>
          <div>
            <Link href={'/back-office/corporate'}>
              <Button className='bg-primary text-white'> <RiArrowGoBackFill className='mr-2'/> Back</Button>
            </Link>
          </div>
        </div>

        <div className='bg-background p-4 rounded-lg'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlesubmit)}>
              <div className="grid w-full items-center gap-1.5 mb-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="name" className="mb-1 text-gray-600">Corporate Name</Label>
                        <FormControl>
                          <Input {...field} placeholder="cprporate name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
              </div>

              <div className='flex justify-start'>
                <Button disabled={loading}  type='submit' className='bg-primary text-white'>
                  {
                    loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                  }
                  Save Data
                </Button>
              </div>
            </form>
          </Form>
        </div>
    </>
  )
}

export default CorporateCreateForm