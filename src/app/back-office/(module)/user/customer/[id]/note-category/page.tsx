'use client'

import CustomModal from '@/components/ui/custoom-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { formatedDate } from '@/lib/utils'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useCategoryNote } from '@/store/use-category-note'
import { useCustomer } from '@/store/use-customer'
import { useSheet } from '@/store/use-sheet'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { RiAddCircleFill, RiDeleteBin2Fill, RiDownloadCloudFill } from 'react-icons/ri'
import FormCategory from './_parts/form_category'
import { useModal } from '@/store/use-modal'
import { Button } from '@/components/ui/button'

const DetaileUserNoteCategoryPage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _role:role}   = authState

  const {id} = useParams()
  const [notes, setNotes] = React.useState<any>([])
  const {loading:loadingNotes, categoryNotes, getAllCategoryNoteNoPaginate} = useCategoryNote()
  const {isOpen:isOpenModal, setIsOpen: setIsOpenModal, setModalId} = useModal()


  const init = async () => {
    await getAllCategoryNoteNoPaginate(`${baseUrl}${prefix}/category-notes`)
  }

  useEffect(() => {
    if (prefix) {
      init()
    }
  }, [prefix, id])


  return (
    <div className='bg-background rounded-lg p-4'>
      {/* <div className='text-gray-500 mb-4'>
        Detail Customer
      </div> */}
      <div>
         <div>
            <div className='text-gray-700 mb-4 font-semibold flex items-center justify-between'>
              Notes Category
              <Button onClick={() => setIsOpenModal(true)} size={"sm"}> <RiAddCircleFill className="mr-2"/> Add Note Category</Button>
            </div>
            <div>
            {
                loadingNotes
                ? <div>
                  {
                    Array(4).map((_, index) => (
                      <div key={index} className='flex flex-col gap-2'>
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
      </div>
      <CustomModal open={isOpenModal} onOpenChange={setIsOpenModal} title={"Categoty Note"} close={() => setIsOpenModal(false)}>
        <FormCategory close={() => setIsOpenModal(false)} />
      </CustomModal>
    </div>
  )
}

export default DetaileUserNoteCategoryPage