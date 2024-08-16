import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { RiFacebookBoxFill, RiFacebookFill, RiInstagramFill, RiLinkedinBoxFill, RiLinkedinFill, RiMailCheckLine, RiMailLine, RiPhoneFill, RiPhoneFindLine, RiPhoneLine } from 'react-icons/ri'


const faqs = [
  {
    question: "What is Be-Style?",
    answer: 'Be-Style is a specialized studio focusing on posture improvement and overall well-being. We offer a variety of therapy and fitness sessions tailored to individual needs, helping our clients achieve better health and wellness.'
  },
  {
    question: "How can I get in touch with Be-Style?",
    answer: 'You can reach us through our social media channels: Instagram, Facebook, LinkedIn. We are always happy to help!'
  },
  {
    question: "What are the hours of operation?",
    answer: 'Monday - Friday: 9:00 AM - 5:00 PM'
  },
  {
    question: "What payment methods do you accept?",
    answer: 'We accept credit card, PayPal, and Apple Pay. Please note that some of our sessions may require additional payment. We do not offer refunds.'
  }
];

const page = () => {
  return (
    <>
      <section className='pt-40 py-12 bg-cover'
        style={{ backgroundImage: 'url("/img/navbar-bg-2.png")' }}
      >
        <div className="container">
          <h2 className='font-noto_serif font-bold text-4xl text-center text-slate-100'>Contact Us</h2>
        </div>
      </section>


      <section className='py-16'>
        <div className='container flex justify-between flex-wrap md:flex-nowrap gap-24'>
          
          <div className='w-full p-8 border border-gray-200 rounded-lg'>
            <div className='mb-5'>
              <div>Send us a message</div>
            </div>
            <div className="grid w-full items-center gap-1.5 mb-5">
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" placeholder="" />
            </div>
            <div className="grid w-full items-center gap-1.5 mb-5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="" />
            </div>
            <div className="grid w-full gap-1.5 mb-5">
              <Label htmlFor="message-2">Your Message</Label>
              <Textarea rows={5} placeholder="Type your message here." id="message-2" />
              <p className="text-sm text-muted-foreground">
                Your message will be copied to the support team.
              </p>
            </div>
            <div>
              <Button size={"lg"} className='w-full'>SEND MESSAGE</Button>
            </div>
          </div>
          <div className='w-full p-8'>
            <div className='font-noto_serif font-bold text-3xl text-gray-600 dark:text-slate-300 mb-2'>
              Contact Information
            </div>
            <div className='text-sm text-gray-500 dark:text-slate-300 leading-relaxed text-justify mb-5'>
              Do you have any questions, special requests, or want to get more information about Be-Style? We are happy to assist you. Please contact us using one of the options below
            </div>
            <div className='flex items-center gap-4 mb-5'>
              <div><RiPhoneLine className='text-4xl text-primary'/></div>
              <div>
                <h3 className='text-sm text-gray-500'>Fax Address</h3>
                <p className='font-bold text-gray-500'>+621234567890</p>
              </div>
            </div>
            <div className='flex items-center gap-4 mb-5'>
              <div><RiPhoneFindLine className='text-4xl text-primary'/></div>
              <div>
                <h3 className='text-sm text-gray-500'>phone Number</h3>
                <p className='font-bold text-gray-500'>+621234567890</p>
              </div>
            </div>
            <div className='flex items-center gap-4 mb-12'>
              <div><RiMailCheckLine className='text-4xl text-primary'/></div>
              <div>
                <h3 className='text-sm text-gray-500'>Email Address</h3>
                <p className='font-bold text-gray-500'>flashweb@gmail.com</p>
              </div>
            </div>
            <h2 className='font-noto_serif font-bold text-3xl text-gray-600 dark:text-slate-300 mb-2'>
              Follow our social media
            </h2>
            <p className='text-sm text-gray-500 mb-5'>
              Follow our social media for the latest updates and information
            </p>
            <div className='flex gap-4'>
              <RiFacebookBoxFill className='text-4xl text-primary'/>
              <RiInstagramFill className='text-4xl text-primary'/>
              <RiLinkedinBoxFill className='text-4xl text-primary'/>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16'>
        <div className='container'>
          <h2 className='font-noto_serif font-bold text-3xl text-gray-600 dark:text-slate-300 mb-2'>Our office location</h2>
          <p className='text-sm text-gray-500 mb-4'>
            Jl. Raya Krapyak, Jl. Karanganyar Raya No.RT.05, Karanganyar, Predominant, Kec.<br/> Ngemplak, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55584
          </p>
          <div className='w-full'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.231077271685!2d110.20682824076684!3d-7.513970852957645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a8ee15293d7c3%3A0x3a3c65ff03d04c42!2sWisata%20Propang%20Akmil!5e0!3m2!1sid!2sid!4v1723711293504!5m2!1sid!2sid" width="600" height="450" style={{ border:0 }}  loading="lazy" className='w-full rounded-lg' ></iframe>
          </div>
        </div>
      </section>
      
      <section className='pb-20 pt-8'>
        <div className="container">
          <p className='font-bold text-primary dark:text-slate-300 text-center'>FAQ</p>
          <h2 className='font-noto_serif font-bold text-3xl text-gray-600 text-center dark:text-slate-300 mb-12'>Frequently Asked Questions</h2>
          
          <div>
            <Accordion type="single" collapsible>
              {
                faqs.map((item, i) => (
                  <AccordionItem key={i} value={i.toString()} className='border-0 mb-4'>
                    <AccordionTrigger className='bg-gray-200 px-4 font-semibold text-gray-600 rounded-md no-underline dark:bg-gray-500 dark:text-slate-200'>
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className='bg-background px-4 py-2 border-none text-gray-600 text-sm dark:text-slate-300'>
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))
              }
            </Accordion>  
          </div>  

        </div>
      </section>
    </>
  )
}

export default page