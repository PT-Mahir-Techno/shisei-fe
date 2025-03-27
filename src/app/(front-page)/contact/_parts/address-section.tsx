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
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2562.23110996164!2d106.82820349538066!3d-6.2077751807912565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTInMjcuOSJTIDEwNsKwNDknNDYuNiJF!5e1!3m2!1sid!2sid!4v1743080152858!5m2!1sid!2sid" width="600" height="450" style={{ border:0 }}  loading="lazy" className='w-full rounded-lg' ></iframe>
            // <iframe src={contact?.map_url} width="600" height="450" style={{ border:0 }}  loading="lazy" className='w-full rounded-lg' ></iframe>
          }
        </div>
      </div>
    </section>
  )
}

export default AddressSection