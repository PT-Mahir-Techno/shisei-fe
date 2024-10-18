'use client'

import React, { useEffect } from 'react'

import { RiArrowDownSLine, RiMailCheckLine, RiPhoneFindLine } from 'react-icons/ri';
import { PiToiletPaperLight } from "react-icons/pi";
import Image from 'next/image';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { baseUrl } from '@/lib/variable';
import FacilitiesSection from '../_parts/facilities_section';
import OpeningSection from '../_parts/opening_section';
import ContactSection from '../_parts/contac_section';
import { Skeleton } from '@/components/ui/skeleton';

const StudioPageDetail = () => {
  const [selectedStudio, setSelectedStudio] = React.useState('Posture improvement specialist studio')
  const [selectedImage, setSelectedImage] = React.useState<String>()

  const [loading, setLoading] = React.useState(false)
  const [studio, setStudio] = React.useState<any>({})

  const {id}  = useParams()

  useEffect(() => {
    init()
  },[id])
  
  const init = async () => {
    setLoading(true)
    try {
      const res = await api.get(`${baseUrl}/studio/${id}`)
      setStudio(res.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <>
      <section className='pt-40 py-12 bg-cover bg-no-repeat bg-center h-[500px] mb-[50px]'
        style={{ backgroundImage: `url(${studio?.photo_url})` }}
      >
        {/* <div className="container">
          <h2 className='font-noto_serif font-bold text-4xl text-center text-slate-100'>Contact Us</h2>
        </div> */}
      </section>


      <div className='container'>
          <div className='flex flex-col md:flex-row gap-3 mb-5'>
            <h2 className='font-noto_serif font-bold text-3xl text-gray-700 dark:text-gray-200 leading-10'>
              {studio?.name}
            </h2>
          </div>

          <p className='text-gray-500 text-sm mb-8'>
            {studio?.subtitle}
          </p>
          
          {
            loading ? (
             <div className='flex flex-col gap-3'>
              {
                Array.from({length: 3}).map((_, index) => (
                  <Skeleton key={index} className='w-full h-5'/>
                ))
              }
             </div>
            ): (
              <FacilitiesSection data={studio.facility} />
            )
          }

          <div className='flex flex-col md:flex-row gap-6 mb-[100px]'>
            {
              loading ? (
                <div className='flex flex-col gap-3'>
                  {
                    Array.from({length: 3}).map((_, index) => (
                      <Skeleton key={index} className='w-full h-5'/>
                    ))
                  }
                </div>
              ): (
                <div className='w-full'>
                  {
                    studio?.opening &&
                    <OpeningSection opening={studio.opening} />
                  }{
                    studio?.contact &&
                    <ContactSection contact={studio.contact} />
                  }
                </div>
              )
            }
            {
              loading ? (
                <div className='flex flex-col gap-3'>
                  {
                    Array.from({length: 3}).map((_, index) => (
                      <Skeleton key={index} className='w-full h-5'/>
                    ))
                  }
                </div>
              ): (
                    studio.preview && studio.preview.length > 0 &&
                    <div className='w-full'>
                      <div className='w-full mb-4'>
                        <Image src={`${selectedImage ? selectedImage : studio.preview[0]?.photo_url}`} width={500} height={100} className='w-full h-[360px] rounded-lg object-cover object-center' alt="studio" />
                      </div>
                      <div>
                        <Carousel className="w-full">
                          <CarouselContent>
                            {
                              studio?.preview.map((item:any, i:number) => (
                                  <CarouselItem key={i} onClick={() => setSelectedImage(item?.photo_url)} className="basis-1/3 pl-4">
                                    <div className={`${ selectedImage === item?.photo_url && 'border-2 border-primary'} w-full h-32 bg-cover bg-center bg-no-repeat rounded-lg cursor-pointer`}
                                      style={{ backgroundImage: `url(${item?.photo_url})` }}
                                    >
                                    </div>
                                  </CarouselItem>
                              ))
                            }

                          </CarouselContent>
                          <CarouselPrevious className='hidden md:block' />
                          <CarouselNext className='hidden md:block' />
                        </Carousel>
                      </div>
                    </div>
              )
            }
          </div>
          
          <div className='mb-16'>
            <h2 className='font-noto_serif font-bold text-3xl text-gray-600 dark:text-slate-300 mb-2'>Our office location</h2>
              {
                loading ? (
                  <div className='mb-4'>
                    <Skeleton className='w-full h-5'/>
                    <Skeleton className='w-full h-5'/>
                  </div>
                )
              : (
                <p className='text-sm text-gray-500 mb-4'>
                  {studio?.address}
                </p>
              )
                
              }
            <div className='w-full'>
              {
                loading ? (
                  <div>
                    <Skeleton className='w-full h-[600px]'/>
                  </div>
                )
                : <iframe src={studio.maps} width="600" height="450" style={{ border:0 }}  loading="lazy" className='w-full rounded-lg' ></iframe>
              }
            </div>
          </div>
        </div>
    </>
  )
}

export default StudioPageDetail