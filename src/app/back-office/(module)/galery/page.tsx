'use client'

import { Button } from '@/components/ui/button'
import CustomSheets from '@/components/ui/custom-sheets'
import CustomModal from '@/components/ui/custoom-dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { baseUrl } from '@/lib/variable'
import { useGallery } from '@/store/use-galery'
import { useModal } from '@/store/use-modal'
import { useSheet } from '@/store/use-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RiAddCircleFill, RiDeleteBin2Fill, RiDeleteBin2Line, RiEye2Fill } from 'react-icons/ri'
import LoadingIcons from 'react-loading-icons'
import { z } from 'zod'

const title = "Galery"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  image: z
  .any()
  .optional()
  .refine((files) => files?.length === 0 || files?.[0]?.size < 5000000, {
    message: 'File size must be less than 5MB',
  })
  .refine(file => file.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
})

const GaleryPage = () => {

  const { isOpen, setIsOpen } = useSheet()
  const { gallerys, getAllGalleryNoPaginate, loading, createGallery, deleteGallery } = useGallery()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId, setModalId } = useModal()
  const [detailImageModal, setDetailImageModal] = React.useState(false)
  const [detailImageUrl, setDetailImageUrl] = React.useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    resetOptions: {
      keepDirtyValues: true
    }
  })

  useEffect(() => {
    getAllGalleryNoPaginate(`${baseUrl}/admin/gallery`)
  }, [])


  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData()
      formData.append('image', data.image[0])
      await createGallery(formData)
      await getAllGalleryNoPaginate(`${baseUrl}/admin/gallery`)

      form.reset()
      setIsOpen(false)
      toast.success("Gallery created successfully")
    } catch (error:any) {
      setIsOpen(false)
      toast.error(error.message)      
    }
  }

  const handleDelete = async () => {
    try {
      await deleteGallery(`${baseUrl}/admin/gallery/${modalId}`)
      await getAllGalleryNoPaginate(`${baseUrl}/admin/gallery`)

      setIsOpenModal(false)
      toast.success("Gallery deleted successfully")
    } catch (error) {
      setIsOpenModal(false)
      toast.error("Failed to delete data")
    }    
  }

  const handleOpenModal = (id: string) => {
    setIsOpenModal(true)
    setModalId(id)
  }

  const handleDetailImage = (url: string) => {
    setDetailImageUrl(url)
    setDetailImageModal(true)
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-500 text-sm">List of all {title} </p>
        </div>
        <div>
          <Button onClick={() => setIsOpen(true)}> <RiAddCircleFill className="mr-2"/> Add {title}</Button>
        </div>
      </div>

        {
          loading ? (
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
            <div className='w-full bg-background px-6 py-4 rounded-lg grid grid-cols-4 md:grid-cols-8 gap-12'>
              {
                gallerys?.map((item:any) => (
                  <div key={item.id}>
                    <Image src={item.image_url} alt="image" width={200} height={200} layout='responsive' className='rounded-lg object-cover object-center'/>
                    <div className='flex items-center justify-between mt-2'>
                      <div className='text-gray-700 text-sm'>actions</div>
                      <div className='flex'>
                        <RiEye2Fill onClick={() => handleDetailImage(item.image_url)} size={20} className="mr-2 text-primary cursor-pointer"/>
                        <RiDeleteBin2Fill onClick={() => handleOpenModal(item.id)} size={20} className="mr-2 text-destructive cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                ))
              }
              
            </div>
            
          )
        }

      <CustomSheets isOpen={isOpen} title={`Add ${title}`} close={() => setIsOpen(false)}>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <FormItem>
                      <Label htmlFor="image">Photo</Label>
                      <FormControl>
                        <Input accept="image/*" {...form.register('image')} type='file' />
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
            </form>
          </Form>
        </div>
      </CustomSheets>

      <CustomModal
        open={detailImageModal}
        onOpenChange={() => setDetailImageModal(false)}
        title='Detail Image'
      >
        <div>
          <Image src={detailImageUrl} alt="image" width={200} height={200} layout='responsive' className='rounded-lg object-cover object-center'/>
        </div>
      </CustomModal>

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

export default GaleryPage