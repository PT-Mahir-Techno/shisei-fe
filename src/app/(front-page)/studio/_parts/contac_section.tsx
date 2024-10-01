import React from 'react'
import { RiMailCheckLine, RiPhoneFindLine } from 'react-icons/ri'

const ContactSection = ({contact}:any) => {
  return (
    <div>
      <h2 className='font-bold text-2xl text-gray-700 dark:text-gray-200 mb-4'>Contact us</h2>
      <div className='flex items-center gap-4 mb-5'>
        <div><RiPhoneFindLine className='text-primary' size={35}/></div>
        <div>
          <h3 className='text-sm text-gray-500'>phone Number</h3>
          <p className='font-bold text-gray-500'>{contact.phone}</p>
        </div>
      </div>
      <div className='flex items-center gap-4 mb-12'>
        <div><RiMailCheckLine className='text-primary' size={33}/></div>
        <div>
          <h3 className='text-sm text-gray-500'>Email Address</h3>
          <p className='font-bold text-gray-500'>{contact.email}</p>
        </div>
      </div>
    </div>
  )
}

export default ContactSection