'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useContactPage } from '@/store/use-contact-page'
import React, { useEffect } from 'react'

const AddressSection = () => {
  const {loading, getContacts, contact} = useContactPage()

  useEffect(() => {
    init()
  },[])

  const init = async () => {
    try {
      await getContacts()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className='py-16'>
      <div className='container'>
        <h2 className='font-noto_serif font-bold text-3xl text-gray-600 dark:text-slate-300 mb-2'>Our office location</h2>
          {
            loading
            ? <div className='w-full flex flex-col gap-2 mb-4'>
                <Skeleton className='w-1/2 h-5'/>
                <Skeleton className='w-1/2 h-3'/>
              </div>
            : <p className='text-sm text-gray-500 mb-4'>{contact?.address}</p>
          }
        
        <div className='w-full'>
          {
            loading ? <Skeleton className='w-full h-96'/> : 
            <iframe src={contact?.map_url} width="600" height="450" style={{ border:0 }}  loading="lazy" className='w-full rounded-lg' ></iframe>
          }
        </div>
      </div>
    </section>
  )
}

export default AddressSection