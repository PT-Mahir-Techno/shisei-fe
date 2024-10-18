'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custoom-dialog'
import { useSheet } from '@/store/use-sheet'
import Image from 'next/image'
import Link from 'next/link'
import { RiAddCircleFill, RiArrowGoBackFill, RiArrowLeftLine, RiDeleteBin2Fill, RiDeleteBin2Line, RiDownloadCloudFill, RiEditBoxFill} from 'react-icons/ri'
import FormNote from './_parts/form_note'
import { useModal } from '@/store/use-modal'
import FormCategory from './_parts/form_category'
import { useCategoryNote } from '@/store/use-category-note'
import { AuthContex } from '@/providers/auth-provider'
import { baseUrl } from '@/lib/variable'
import { useSchedule } from '@/store/use-schedule'
import { useParams } from 'next/navigation'
import { useNote } from '@/store/use-note'
import { Skeleton } from '@/components/ui/skeleton'
import { formatedDate } from '@/lib/utils'


const title = "Note"

const LoadingSkeleton = () =>
<div className='flex flex-col gap-2'>
  <Skeleton className='w-1/2 h-4'/>
  <Skeleton className='w-full h-10'/>
  <Skeleton className='w-full h-10'/>
  <Skeleton className='w-full h-10'/>
  <Skeleton className='w-full h-2'/>
  <Skeleton className='w-1/2 h-2'/>
</div>

const PermisionPage = () => {
  const {authState}        = useContext(AuthContex)
  const {_prefix:prefix}   = authState
  const {id}               = useParams()

  const [customers, setCustomers] = useState([])
  const {isOpen, mode, modelId, setIsOpen, setModelId, setMode} = useSheet()
  const {isOpen:isOpenModal, setIsOpen: setIsOpenModal, setModalId} = useModal()
  const {loading:loadingNotes, categoryNotes, getAllCategoryNoteNoPaginate} = useCategoryNote()
  const {getSingleSchedule} = useSchedule()
  const {loading:loadingNote, notes, getAllNoteNoPaginate} = useNote()


  useEffect(() => {
    init()
    if (id) {
      handleSingleSchedule(id[0])
    }
  }, [prefix, id])

  const init = async () => {
    await getAllCategoryNoteNoPaginate(`${baseUrl}${prefix}/category-notes`)
    await getAllNoteNoPaginate(`${baseUrl}${prefix}/notes-schedule/${id[0]}?type=nopaginate`)
  }

  const handleSingleSchedule = async (id:string) => {
    const res = await getSingleSchedule(`${baseUrl}${prefix}/schedule/${id}`)
    setCustomers(res.customer)
  }

  const handleModalEdit = (id:string) => {
    setIsOpen(true)
    setMode('edit')
    setModelId(id)
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
        </div>
        <div className='flex gap-4 flex-wrap justify-end'>
          <Link href={`/back-office/schedule`}>
            <Button> <RiArrowLeftLine className="mr-2"/> Back</Button>
          </Link>
          <Button onClick={() => setIsOpen(true)} variant={"outline"}> <RiAddCircleFill className="mr-2"/> Add Note</Button>
          <Button onClick={() => setIsOpenModal(true)} variant={"outline"}> <RiAddCircleFill className="mr-2"/> Add Note Category</Button>
        </div>
      </div>
      
      <div className='grid grid-cols-12 gap-8'>
          <div className='col-span-12 md:col-span-8 bg-background p-4 box-content rounded-md'>
            <p className='text-sm text-gray-500 mb-4'>Notes</p>
            <div>
              {
                loadingNote ?
                Array(3).fill(0).map((_, index) => (
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div>
                      <LoadingSkeleton key={index} />
                    </div>
                  </div>
                ))
                : (
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {
                      notes.length <= 0
                      ? <div className='text-center py-40 w-full text-gray-500 font-semibold'>No data yet</div>
                      : notes.map((item:any, index:any) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-md'>
                          <div className='flex justify-between gap-4 border-b border-gray-200 pb-4  items-center flex-wrap'>
                            <div className='flex items-center gap-4'>
                              <div 
                                className='w-10 h-10 rounded-full bg-cover bg-center bg-no-repeat'
                                style={{ backgroundImage: `url(${item?.user?.photo_url ?? "/img/img_placeholder.png"})` }}
                              >
                              </div>
                              <div>
                                <h2 className="font-bold  text-gray-800 dark:text-gray-100">{item?.user?.name}</h2>
                                <p className="text-gray-500 text-sm dark:text-gray-400">{item?.user?.email}</p>
                              </div>
                            </div>
                            <Button onClick={() => handleModalEdit(item.id)} variant={"outline"} size={"sm"}><RiEditBoxFill/> Edit Note</Button>
                          </div>
                          <div className='pt-4'>
                            <h2 className="text-gray-700 dark:text-gray-100 text-sm">
                              {item?.notes}
                            </h2>
                          </div>
                          
                          <div className='mt-4 mb-6 flex justify-between'>
                            {
                              item.file &&
                              <a href={item?.file_url} target='_blank' className='flex items-center gap-2 text-primary bg-primary/25 px-2 py-1 rounded'>
                                <RiDownloadCloudFill/>
                                <p className='text-sm'>Download File</p>
                              </a>
                            }
                            <p className='text-sm font-semibold'>
                              Submited Date : {formatedDate(item?.created_at)}
                            </p>
                          </div>
                        </div>
                      )) 
                    }
                  </div>
                ) 
              }
            </div>
          </div>

          <div className='col-span-12 md:col-span-4 bg-background p-4 box-content rounded-md'>
              <div>
                <p className='text-gray-500 mb-4 text-sm'>Category Notes</p>
              </div>
              {
                loadingNotes
                ? <div>
                  {
                    Array(4).map((_, index) => (
                      <div className='flex flex-col gap-2'>
                        <Skeleton key={index} className='w-1/2 h-4'/>
                        <Skeleton key={index} className='w-full h-4'/>
                      </div>
                    ))
                  }
                </div>
                : categoryNotes.map((item:any, index:any) => (
                  <div key={index} className='px-4 py-2 border-b border-gray-200 flex justify-between items-center'>
                    <span>{item.category}</span>
                    <div className='text-destructive cursor-pointer flex items-center gap-1'>
                      <RiDeleteBin2Fill/>
                      <p className='text-sm'>Delete</p>
                    </div>
                  </div>
                ))
              }
          </div>
      </div>
      
      <CustomModal open={isOpen} onOpenChange={setIsOpen} title={title} close={() => setIsOpen(false)}>
        <FormNote close={() => setIsOpen(false)} customers={customers} categories={categoryNotes} />
      </CustomModal>

      <CustomModal open={isOpenModal} onOpenChange={setIsOpenModal} title={"Categoty Note"} close={() => setIsOpenModal(false)}>
        <FormCategory close={() => setIsOpen(false)} />
      </CustomModal>

    </>
  )
}

export default PermisionPage