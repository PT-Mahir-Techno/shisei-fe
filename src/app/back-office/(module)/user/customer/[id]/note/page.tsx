'use client'

import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custoom-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { formatedDate } from '@/lib/utils'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useCustomer } from '@/store/use-customer'
import { useNote } from '@/store/use-note'
import { useSchedule } from '@/store/use-schedule'
import { useSheet } from '@/store/use-sheet'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { RiAddCircleFill, RiDownloadCloudFill } from 'react-icons/ri'
import FormNote from './_parts/form_note'
import { useCategoryNote } from '@/store/use-category-note'

const DetaileUserNotePage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _role:role}   = authState

  const {id} = useParams()
  const {isOpen, mode, modelId, setIsOpen, setModelId, setMode} = useSheet()
  const {loading, notes, getAllNoteNoPaginate} = useNote()
  const { categoryNotes, getAllCategoryNoteNoPaginate} = useCategoryNote()



  const getNotes = async () => {
    try {
      await getAllNoteNoPaginate(`${baseUrl}${prefix}/notes-user/${id}?type=nopaginate`)
      await getAllCategoryNoteNoPaginate(`${baseUrl}${prefix}/category-notes`)
    } catch (error) {
    }
  }

  useEffect(() => {
    getNotes()
  },[prefix, id])

  const handleModalEdit = (id:string) => {
    setIsOpen(true)
    setMode('edit')
    setModelId(id)
  }

  return (
    <div className='bg-background rounded-lg p-4'>
      {/* <div className='text-gray-500 mb-4'>
        Detail Customer
      </div> */}
      <div>
         <div>
            <div className='text-gray-700 mb-4 font-semibold flex items-center justify-between'>
              Notes
              <Button onClick={() => setIsOpen(true)} size={"sm"}> <RiAddCircleFill className="mr-2"/> Add Note</Button>
            </div>
            <div>
            {
              loading ? 
              Array(6).fill(0).map((_, index) => (
                <div key={index} className='w-full bg-background px-6 py-4 rounded-lg mb-4'>
                  <Skeleton className='w-1/4 h-4 mb-3'/>
                  <Skeleton className='w-full h-6 mb-2'/>
                  <Skeleton className='w-full h-6 mb-2'/>
                </div>
              ))
              : notes.length > 0 ?
                notes.map((note:any, index:any) => (
                  <div key={index} className="w-full bg-background px-2 py-1 rounded-lg mb-1">
                      <div className='flex items-center justify-between gap-8 bg-gray-100 p-3 rounded-lg'>
                        <div>
                          <p className='mb-1'><span className='text-gray-700 font-semibold text-sm'>{ formatedDate(note?.created_at) }</span> </p>
                          <p className='max-w-4xl text-sm text-gray-500 mb-3'>{ note?.notes }</p>
                          
                          {
                            note?.admin != null ?
                            <div className='flex items-center gap-2'>
                              <Image src={note?.admin?.photo_url ?? '/img/img_placeholder.png'} alt="photo" width={30} height={30} className='rounded-full h-6 w-6 object-cover'/>
                              <p className='text-sm font-semibold'>{note?.admin?.name}</p>
                            </div>
                            : <div className='flex items-center gap-2'>
                                <Image src={note?.staff?.photo_url ?? '/img/img_placeholder.png'} alt="photo" width={30} height={30} className='rounded-full h-6 w-6 object-cover'/>
                                <p className='text-sm font-semibold'>{note?.staff?.name}</p>
                              </div>
                          }

                        </div>
                        <div className='flex gap-2'>
                          {
                            note?.note_file.length > 0 ? (
                              note?.note_file.map((file:any, index:any) => (
                                <a key={index} href={file?.file_url} target='_blank' className='flex items-center gap-2 text-primary bg-primary/25 px-2 py-1 rounded cursor-pointer'>
                                  <b><small>{index + 1} .</small></b> <RiDownloadCloudFill/>
                                </a>
                              ))
                            ) : ''
                          }
                        </div>
                      </div>
                  </div>
                ))
                :
                <div className='w-full bg-background px-6 py-4 rounded-lg mb-4'>
                  <p className='text-gray-500 text-sm'>No notes found</p>
                </div>
            }
            </div>
         </div>
      </div>
      <CustomModal open={isOpen} onOpenChange={setIsOpen} title="Add Note" close={() => setIsOpen(false)}>
        <FormNote close={() => setIsOpen(false)}  categories={categoryNotes} customerId={id}/>
      </CustomModal>
    </div>
  )
}

export default DetaileUserNotePage