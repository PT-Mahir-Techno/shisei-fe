
import React from 'react'

import "../../styles/animations.css";
import SendMessageSection from './_parts/send-message-section'
import ContactSection from './_parts/contact-section'
import AddressSection from './_parts/address-section';
import FaqSection from './_parts/faq-section';


const ContactPage = () => {


  return (
    <>
      <section className='pt-40 py-12 bg-cover bg-no-repeat bg-center'
        style={{ backgroundImage: 'url("/img/navbar-bg-2.png")' }}
      >
        <div className="container">
          <h2 className='font-noto_serif font-bold text-4xl text-center text-slate-100'>Contact Us</h2>
        </div>
      </section>


      <section className='py-16'>
        <div className='container flex justify-between flex-wrap md:flex-nowrap gap-24'>
          <SendMessageSection />
          <ContactSection/>
        </div>
      </section>

      <AddressSection />
      
      <section className='pb-20 pt-8'>
        <FaqSection />
      </section>
    </>
  )
}

export default ContactPage