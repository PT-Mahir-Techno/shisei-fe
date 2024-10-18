'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { formatedDate } from '@/lib/utils'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { RiArrowLeftLine, RiDownloadCloudFill } from 'react-icons/ri'

const DetailNotePage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const {id} = useParams()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [notes, setNotes] = React.useState<any>([])

  const getNotes = async () => {
    try {
      setLoading(true)
      const data = await api.get(`${baseUrl}${prefix}/notes-user/${id}?type=nopaginate`)
      setNotes(data.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getNotes()
  },[id])
  
  return (
    <>
      <div className="mb-11 flex items-center justify-between">
        <div>
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">Detail User Note</h2>
          <p className="text-gray-500 text-sm">List detail user notes</p>
        </div>
        <Link href="/back-office/calendar/note">
          <Button className="btn btn-sm btn-primary"> <RiArrowLeftLine className='mr-2'/> Back</Button>
        </Link>
      </div>

      {
        loading ? 
        Array(6).fill(0).map((_, index) => (
          <div className='w-full bg-background px-6 py-4 rounded-lg mb-4'>
            <Skeleton className='w-1/4 h-4 mb-3'/>
            <Skeleton className='w-full h-6 mb-2'/>
            <Skeleton className='w-full h-6 mb-2'/>
          </div>
        ))
        : notes.length > 0 ?
          notes.map((note:any) => (
            <div className="w-full bg-background px-6 py-4 rounded-lg mb-4">
                <div className='flex items-center justify-between gap-8'>
                  <div>
                    <p className='mb-4'><span className='text-gray-500 font-semibold'>{ formatedDate(note?.created_at) }</span> </p>
                    <p className='max-w-4xl text-sm text-gray-500'>{ note?.notes }</p>
                  </div>
                  <div>
                    <a href={note?.file_url} target='_blank' className='flex items-center gap-2 text-primary bg-primary/25 px-2 py-1 rounded'>
                      <RiDownloadCloudFill/>
                      <p className='text-sm'>Download File</p>
                    </a>
                  </div>
                </div>
            </div>
          ))
          :
          <div className='w-full bg-background px-6 py-4 rounded-lg mb-4'>
            <p className='text-gray-500 text-sm'>No notes found</p>
          </div>
      }

      

    </>
  )
}

export default DetailNotePage