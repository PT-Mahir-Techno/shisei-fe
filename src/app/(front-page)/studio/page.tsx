'use client'

import React from 'react'

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

const StudioPage = () => {
  const [selectedStudio, setSelectedStudio] = React.useState('Posture improvement specialist studio')
  const [selectedImage, setSelectedImage] = React.useState<String>('img_studio_1.png')

  return (
    <>
      <section className='pt-40 py-12 bg-cover bg-no-repeat bg-center h-[500px] mb-[50px]'
        style={{ backgroundImage: 'url("/img/studio-bg.png")' }}
      >
        {/* <div className="container">
          <h2 className='font-noto_serif font-bold text-4xl text-center text-slate-100'>Contact Us</h2>
        </div> */}
      </section>


      <div className='container'>
          <div className='flex flex-col md:flex-row gap-3 mb-5'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className='bg-primary text-white hover:text-primary'>
                    Select Studio
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className='p-5'>
                    <div className='w-[700px] flex flex-col'>
                      <NavigationMenuLink onClick={() => setSelectedStudio('Posture improvement specialist studio')} className='w-[400px] hover:bg-accent py-2 px-4 rounded-md cursor-pointer'>
                        Posture improvement specialist studio
                      </NavigationMenuLink>
                      <NavigationMenuLink onClick={() => setSelectedStudio('365 Pilates Studio')} className='w-[400px] hover:bg-accent py-2 px-4 rounded-md cursor-pointer'>
                        365 Pilates Studio
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* <div className='p-2 rounded-md bg-accent cursor-pointer hover:bg-primary group transition-all duration-300'>
              <RiArrowDownSLine className='text-xl text-primary group-hover:text-white transition-all duration-300' />
            </div> */}
            <h2 className='font-noto_serif font-bold text-3xl text-gray-700 dark:text-gray-200'>
              { selectedStudio }
            </h2>
          </div>

          <p className='text-gray-500 text-sm mb-8'>
            Located in the heart of Kuningan, South Jakarta. 365 Pilates Studio uses the reformer method from Japan to help you find your inner strength, beauty posture and younger body to reduce stress and discover a new level of physical grace. Certified instructors guide you in a spacious studio with abundant natural light, using high-quality equipment to redefine your potential.
          </p>

          <div className='mb-[100px]'>
            <h3 className='font-noto_serif font-bold text-2xl text-gray-700 dark:text-gray-200 mb-6'>Amenities</h3>
            
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
              <div className='flex items-center gap-2'>
                <Image src="/img/ic_toilet.png" width={33} height={33} alt="toilet" />
                <p className='text-gray-600 text-lg'>Toilet</p>
              </div>
              <div className='flex items-center gap-2'>
                <Image src="/img/ic_smoking.png" width={33} height={33} alt="toilet" />
                <p className='text-gray-600 text-lg'>Smoking Area</p>
              </div>
              <div className='flex items-center gap-2'>
                <Image src="/img/ic_hanger.png" width={33} height={33} alt="toilet" />
                <p className='text-gray-600 text-lg'>Changing Room</p>
              </div>
              <div className='flex items-center gap-2'>
                <Image src="/img/ic_ac.png" width={33} height={33} alt="toilet" />
                <p className='text-gray-600 text-lg'>Air Comditioning </p>
              </div>
              <div className='flex items-center gap-2'>
                <Image src="/img/ic_water.png" width={33} height={33} alt="toilet" />
                <p className='text-gray-600 text-lg'>Water Dispenser</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-6 mb-[100px]'>
            <div className='w-full'>
              <h2 className='font-bold text-2xl text-gray-700 dark:text-gray-200 mb-4'>Opening hours</h2>
              <table className='mb-10'>
                <tbody>
                  <tr>
                    <td className='pr-[50px] py-2 text-primary font-semibold'>Monday</td>
                    <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>08.00 AM - 22.00 PM</td>
                  </tr>
                  <tr>
                    <td className='pr-[50px] py-2 text-primary font-semibold'>Tuesday</td>
                    <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>08.00 AM - 22.00 PM</td>
                  </tr>
                  <tr>
                    <td className='pr-[50px] py-2 text-primary font-semibold'>Wednesday</td>
                    <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>08.00 AM - 22.00 PM</td>
                  </tr>
                  <tr>
                    <td className='pr-[50px] py-2 text-primary font-semibold'>Thursday</td>
                    <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>08.00 AM - 22.00 PM</td>
                  </tr>
                  <tr>
                    <td className='pr-[50px] py-2 text-primary font-semibold'>Friday</td>
                    <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>08.00 AM - 22.00 PM</td>
                  </tr>
                  <tr>
                    <td className='pr-[50px] py-2 text-primary font-semibold'>Saturday</td>
                    <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>08.00 AM - 22.00 PM</td>
                  </tr>
                  <tr>
                    <td className='pr-[50px] py-2 text-primary font-semibold'>Sunday</td>
                    <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>08.00 AM - 22.00 PM</td>
                  </tr>
                </tbody>
              </table>

              <h2 className='font-bold text-2xl text-gray-700 dark:text-gray-200 mb-4'>Contact us</h2>
              <div className='flex items-center gap-4 mb-5'>
                <div><RiPhoneFindLine className='text-primary' size={35}/></div>
                <div>
                  <h3 className='text-sm text-gray-500'>phone Number</h3>
                  <p className='font-bold text-gray-500'>+621234567890</p>
                </div>
              </div>
              <div className='flex items-center gap-4 mb-12'>
                <div><RiMailCheckLine className='text-primary' size={33}/></div>
                <div>
                  <h3 className='text-sm text-gray-500'>Email Address</h3>
                  <p className='font-bold text-gray-500'>flashweb@gmail.com</p>
                </div>
              </div>
            </div>
            <div className='w-full'>
              <div className='w-full mb-4'>
                <Image src={`/img/${selectedImage}`} width={500} height={0} className='w-full rounded-lg' alt="studio" />
              </div>
              <div>
                <Carousel className="w-full">
                  <CarouselContent>
                    <CarouselItem onClick={() => setSelectedImage('img_studio_1.png')} className="basis-1/3 pl-4">
                      <div className={`${ selectedImage === 'img_studio_1.png' && 'border-2 border-primary'} w-full h-32 bg-cover bg-center bg-no-repeat rounded-lg cursor-pointer`}
                        style={{ backgroundImage: 'url("/img/img_studio_1.png")' }}
                      >
                      </div>
                    </CarouselItem>
                    <CarouselItem onClick={() => setSelectedImage('img_studio_2.png')} className="basis-1/3 pl-4">
                      <div className={`${ selectedImage === 'img_studio_2.png' && 'border-2 border-primary'} w-full h-32 bg-cover bg-center bg-no-repeat rounded-lg cursor-pointer`}
                        style={{ backgroundImage: 'url("/img/img_studio_2.png")' }}
                      >
                      </div>
                    </CarouselItem>
                    <CarouselItem onClick={() => setSelectedImage('img_studio_3.png')} className="basis-1/3 pl-4">
                      <div className={`${ selectedImage === 'img_studio_3.png' && 'border-2 border-primary'} w-full h-32 bg-cover bg-center bg-no-repeat rounded-lg cursor-pointer`}
                        style={{ backgroundImage: 'url("/img/img_studio_3.png")' }}
                      >
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
          
          <div className='mb-16'>
            <h2 className='font-noto_serif font-bold text-3xl text-gray-600 dark:text-slate-300 mb-2'>Our office location</h2>
            <p className='text-sm text-gray-500 mb-4'>
              Jl. Raya Krapyak, Jl. Karanganyar Raya No.RT.05, Karanganyar, Predominant, Kec.Ngemplak, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55584
            </p>
            <div className='w-full'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.231077271685!2d110.20682824076684!3d-7.513970852957645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a8ee15293d7c3%3A0x3a3c65ff03d04c42!2sWisata%20Propang%20Akmil!5e0!3m2!1sid!2sid!4v1723711293504!5m2!1sid!2sid" width="600" height="450" style={{ border:0 }}  loading="lazy" className='w-full rounded-lg' ></iframe>
            </div>
          </div>
        </div>
    </>
  )
}

export default StudioPage