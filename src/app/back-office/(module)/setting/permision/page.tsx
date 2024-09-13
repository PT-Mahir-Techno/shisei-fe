'use client'

import { Button } from '@/components/ui/button'
import CustomSheets from '@/components/ui/custom-sheets'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@radix-ui/react-label'
import React, { useEffect } from 'react'
import { RiAddCircleFill, RiDeleteBin2Fill, RiEditBoxFill } from 'react-icons/ri'
import { useLocation } from '@/store/use-location'
import { useSheet } from '@/store/use-sheet'
import { useModal } from '@/store/use-modal'
import { baseUrl } from '@/lib/variable'
import { CUstomDataTable } from '@/components/ui/custom-data-table'
import { usePeriod } from '@/store/use-validity-period'
import CustomModal from '@/components/ui/custoom-dialog'
import LoadingIcons from 'react-loading-icons'
import toast from 'react-hot-toast'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePermision } from '@/store/use-permision'
import { Skeleton } from '@/components/ui/skeleton'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
})

const PermisionPage = () => {
  const title = "Permision"
  const { isOpen, setIsOpen } = useSheet()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId, setModalId } = useModal()
  const { permisions, getAllPermision, getAllPermisionNoPaginate ,createPermision, deletePermision, loading, success, errorData, permisionUrl } = usePermision()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })
 
  useEffect(() => {
    getAllPermisionNoPaginate(`${baseUrl}/admin/role-permission?type=nopaginate`)
  }, [])

  const handleDelete = async () => {
    await deletePermision(`${baseUrl}/admin/role-permission/${modalId}`)
    await getAllPermision(permisionUrl)
    
    if (!success){
      toast.error(errorData.message)
    }else{
      toast.success('Location deleted successfully')
    }
    
    setIsOpenModal(false)
  }

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createPermision(data)
      await getAllPermision(permisionUrl)
      form.reset()
    } catch (error:any) {
      toast.error(error)
    }
    setIsOpen(false)
  }

  const handleModal = (id:string) => {
    setModalId(id)
    setIsOpenModal(true)
  }

  

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
          <p className="text-gray-500 dark:text-gray-100 text-sm">List of all {title}</p>
        </div>
        {/* <div>
          <Button onClick={() => setIsOpen(true)}> <RiAddCircleFill className="mr-2"/> Add {title}</Button>
        </div> */}
      </div>
      
      <div>

        {
          loading ?
          (
            <div className="space-y-2  bg-background px-6 py-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) :
          (
            <div className="w-full bg-background px-6 py-4 rounded-lg my-8 grid grid-cols-6 gap-4">
              {
                permisions?.map((item: any) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox id="terms" disabled checked />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.name} 
                    </label>
                    {/* <RiDeleteBin2Fill onClick={() => handleModal(item.id)} className="text-red-500 cursor-pointer" /> */}
                  </div>
                ))
              }
            </div>
          )
        }

      </div>
        
      <CustomSheets isOpen={isOpen} title={`Add ${title}`} close={() => setIsOpen(false)}>
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
                name='description'
                render={({ field }) => (
                  <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <FormItem>
                      <Label htmlFor="duration">Describtion</Label>
                      <FormControl>
                        <Input type="text" id="duration" placeholder="Duration" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  </div>
                )}
              />

              <div>
                <Button className="w-full" size={"lg"}>
                  {
                    loading && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
                  }
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CustomSheets>

      <CustomModal
        open={isOpenModal} 
        onOpenChange={() => setIsOpenModal(false)} 
        title='Delete Data'
      >
          <div>
            <p className='text-gray-700 my-6 text-center'>
              Are you sure you want to delete this data?
              <br />
              <b>This action cannot be undone</b>
            </p>
            <div className='flex justify-end gap-4'>
              <Button onClick={() => setIsOpenModal(false)} variant={"outline"}>Cancel</Button>
              <Button onClick={() => handleDelete()}
                disabled={loading}
              >
                {loading &&
                  <LoadingIcons.Oval stroke='#fff' strokeWidth={5} className="w-4 h-4 mr-3" />
                }
                delete
              </Button>
            </div>
          </div>
      </CustomModal>
    </>
  )
}

export default PermisionPage