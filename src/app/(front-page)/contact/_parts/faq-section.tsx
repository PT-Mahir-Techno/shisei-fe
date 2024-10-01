'use client'

import React, { useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useFaqPage } from '@/store/use-faq-page'

const FaqSection = () => {

  const {loading, faqs, getFaqs} = useFaqPage()

  useEffect(() => {
    init()
  },[])
  
  const init = async () => {
    getFaqs()
  }

  return (
    <div className="container">
      <p className='font-bold text-primary dark:text-slate-300 text-center'>FAQ</p>
      <h2 className='font-noto_serif font-bold text-3xl text-gray-600 text-center dark:text-slate-300 mb-12'>Frequently Asked Questions</h2>
      
      <div>
          {
            loading
            ? <div className='flex flex-col gap-3'>
              {
                Array.from({length: 5}).map((_, i) => (
                  <div key={i} className='w-full flex flex-col gap-2 mb-4'>
                    <div className='w-full h-5 bg-gray-200 animate-pulse rounded'></div>
                    <div className='w-full h-3 bg-gray-200 animate-pulse rounded'></div>
                  </div>
                ))
              }
            </div>
            : <Accordion type="single" collapsible>
                {
                  
                  faqs.map((item:any, i:number) => (
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
          }
      </div>  

    </div>
  )
}

export default FaqSection