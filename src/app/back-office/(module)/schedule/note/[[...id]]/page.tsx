'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custoom-dialog'
import { useSheet } from '@/store/use-sheet'
import Image from 'next/image'
import Link from 'next/link'
import { RiAddCircleFill, RiArrowGoBackFill, RiArrowLeftLine, RiDownloadCloudFill, RiEditBoxFill} from 'react-icons/ri'
import FormNote from './_parts/form_note'
import { useModal } from '@/store/use-modal'
import FormCategory from './_parts/form_category'
import { useCategoryNote } from '@/store/use-category-note'


const title = "Note"

const PermisionPage = () => {

  const {isOpen, mode, modelId, setIsOpen, setModelId, setMode} = useSheet()
  const {isOpen:isOpenModal, setIsOpen: setIsOpenModal, setModalId} = useModal()
  const {loading:loadingCNotes, categoryNotes, getAllCategoryNoteNoPaginate} = useCategoryNote()

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    await getAllCategoryNoteNoPaginate('/staff/category-notes')
  }

  const handleModalEdit = () => {
    setIsOpen(true)
    setMode('edit')
    setModelId(modelId)
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
            <p>Notes</p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              {
                Array(3).fill(0).map((_, index) => (
                  <div key={index} className='p-4 border border-gray-200 rounded-md'>
                    <div className='flex justify-between gap-4 border-b border-gray-200 pb-4  items-center flex-wrap'>
                      <div className='flex items-center gap-4'>
                        <div>
                          <Image src={"/img/img_placeholder.png"} alt="image" width={60} height={60} className='rounded-full'/>
                        </div>
                        <div>
                          <h2 className="font-bold  text-gray-800 dark:text-gray-100">Nama Joni Setiawan</h2>
                          <p className="text-gray-500 text-sm dark:text-gray-400">jonistwan23@gmail.com</p>
                        </div>
                      </div>
                      <Button variant={"outline"} size={"sm"}><RiEditBoxFill/> Edit Note</Button>
                    </div>
                    <div className='pt-4'>
                      <h2 className="text-gray-700 dark:text-gray-100 text-sm">
                        The PHP Framework For Web Artisans.
                        Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as:
                        Official documentation of Laravel is available aThe PHP Framework For Web Artisans.
                        Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as:
                        Official documentation of Laravel is available a
                      </h2>
                    </div>
                    
                    <div className='mt-4 mb-6 flex justify-between'>
                      <button className='flex items-center gap-2 text-primary bg-primary/25 px-2 py-1 rounded'>
                        <RiDownloadCloudFill/>
                        <p className='text-sm'>Download File</p>
                      </button>
                      <p className='text-sm font-semibold'>
                        Submited Date : 2022-09-19
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='col-span-12 md:col-span-4 bg-background p-4 box-content rounded-md'>
              
          </div>
      </div>
      
      <CustomModal open={isOpen} onOpenChange={setIsOpen} title={title} close={() => setIsOpen(false)}>
        <FormNote close={() => setIsOpen(false)} />
      </CustomModal>

      <CustomModal open={isOpenModal} onOpenChange={setIsOpenModal} title={"Categoty Note"} close={() => setIsOpenModal(false)}>
        <FormCategory close={() => setIsOpen(false)} />
      </CustomModal>

    </>
  )
}

export default PermisionPage