'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useContactPage } from '@/store/use-contact-page'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { RiFacebookBoxFill, RiInstagramFill, RiLinkedinBoxFill, RiMailCheckLine, RiPhoneFindLine, RiPhoneLine } from 'react-icons/ri'



const ContactSection = () => {
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
    <div className='w-full p-8'>
      <div className='font-noto_serif font-bold text-3xl text-gray-600 dark:text-slate-300 mb-2'>
        Contact Information
      </div>
      <div className='text-sm text-gray-500 dark:text-slate-300 leading-relaxed text-justify mb-5'>
        Do you have any questions, special requests, or want to get more information about Be-Style? We are happy to assist you. Please contact us using one of the options below
      </div>
      <div className='flex items-center gap-4 mb-5'>
        <div><RiPhoneLine className='text-4xl text-primary'/></div>
        {
          loading
          ? (
              <div className='w-full flex flex-col gap-2'>
                <Skeleton className='w-1/2 h-5'/>
                <Skeleton className='w-1/2 h-3'/>
              </div>
            )
          : <div>
              <h3 className='text-sm text-gray-500'>Fax Address</h3>
              <p className='font-bold text-gray-500'>{contact?.fax}</p>
            </div>
        }
      </div>
      <div className='flex items-center gap-4 mb-5'>
        <div><RiPhoneFindLine className='text-4xl text-primary'/></div>
        {
          loading
          ? (
              <div className='w-full flex flex-col gap-2'>
                <Skeleton className='w-1/2 h-5'/>
                <Skeleton className='w-1/2 h-3'/>
              </div>
            )
          : <div>
              <h3 className='text-sm text-gray-500'>phone Number</h3>
              <p className='font-bold text-gray-500'>{contact?.phone}</p>
            </div>
        }
        
      </div>
      <div className='flex items-center gap-4 mb-12'>
        <div><RiMailCheckLine className='text-4xl text-primary'/></div>
        {
          loading
          ? (
              <div className='w-full flex flex-col gap-2'>
                <Skeleton className='w-1/2 h-5'/>
                <Skeleton className='w-1/2 h-3'/>
              </div>
            )
          : <div>
              <h3 className='text-sm text-gray-500'>Email Address</h3>
              <p className='font-bold text-gray-500'>{contact?.email}</p>
            </div>
        }
        
      </div>
      <h2 className='font-noto_serif font-bold text-3xl text-gray-600 dark:text-slate-300 mb-2'>
        Follow our social media
      </h2>
      <p className='text-sm text-gray-500 mb-5'>
        Follow our social media for the latest updates and information
      </p>
      <div className='flex gap-4'>
        <a href={contact?.facebook_url}>
          <RiFacebookBoxFill className='text-4xl text-primary'/>
        </a>
        <a href={contact?.instagram_url}>
          <RiInstagramFill className='text-4xl text-primary'/>
        </a>
        <a href={contact?.linkedin_url}>
          <RiLinkedinBoxFill className='text-4xl text-primary'/>
        </a>
      </div>
    </div>
  )
}

export default ContactSection