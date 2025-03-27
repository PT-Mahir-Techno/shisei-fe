'use client';

import { Button } from '@/components/ui/button'
import ProfileCard from '@/components/ui/profile-card'
import React from 'react'

import "../../styles/animations.css";
import api from '@/lib/api';
import { baseUrl } from '@/lib/variable';
import toast from 'react-hot-toast';

const AboutPage = () => {

  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState([])

  const iniit = async () => {
    try {
      setLoading(true)
      const res = await api.get(`${baseUrl}/staff`)
      setData(res.data)
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      toast.error(error.data.message)
    }
  }

  React.useEffect(() => {
    iniit()
  }, [])

  return (
    <div className='page-animation'>
      <section className='pt-40 py-12 bg-cover bg-no-repeat bg-center'
        style={{ backgroundImage: 'url("/img/navbar-bg-2.png")' }}
      >
        <div className="container">
          <h2 className='font-noto_serif font-bold text-4xl text-center text-slate-100'>About Us</h2>
        </div>
      </section>
      
      <section className='my-24'>
        <div className="container">

          <div className="flex flex-wrap md:flex-nowrap justify-between gap-12 mb-24">
            <div className="w-full bg-primary rounded-lg shadow-md p-10">
              <img src="/be-main-logo.png" alt="img" className='w-full h-auto' />
            </div>
            <div className="w-full flex flex-col justify-center flex-wrap">
              <div className='font-bold font-noto_serif text-primary'>
                About Us
              </div>
              <div className={"font-noto_serif mb-4 text-3xl font-bold text-gray-600 dark:text-slate-200"}>
                Welcome to <span className='text-primary'> Be-Style® </span>
              </div>
              <div className="text-sm text-slate-500 leading-relaxed text-justify dark:text-slate-300">
                At Be-Style Studio, we go beyond traditional exercise, we focus on instant posture correction and body realignment for long-term wellness. Using the Shisei Method from Japan, we combine breathwork, targeted training, and body reset techniques to help you restore balance effortlessly and move pain-free.
                Unlike conventional workouts, our personalized 1-on-1 approach provides immediate improvements in posture, mobility, and body function without intense strain. Whether you're struggling with back pain, stiffness, or poor posture, Be-Style helps you realign, reset, and move with confidence from the very first session.
                Discover the power of effortless movement. Experience Be-Style today!
              </div>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap justify-between gap-12 mb-24">
            <div className="w-full flex flex-col justify-center flex-wrap">
              <div className={"font-noto_serif mb-4 text-3xl font-bold text-gray-600 dark:text-slate-200"}>
                Thanks to you, we have reached <span className='text-primary'> 22,000 sessions!</span>
              </div>
              <div>
                Be-Style began in 2012 in a small room in Shiga Prefecture, Japan. We introduced the concept of self-conditioning, inviting locals to experience our sessions. Many noticed significant improvements after just one session without fatigue. Their body aches disappeared, their posture became more upright and attractive, and word quickly spread, fueling our growth. <br />
                In 2014, we opened our first studio in Moriyama. Within just two months, demand surged, and we had to implement a waiting list system. By 2016, we expanded further, opening another branch in Osaka, Japan. <br />
                In 2023, we brought Be-Style’s Self-Conditioning Method to Indonesia through our academy, naming it Shisei Academy. Seeing the widespread posture issues in the country and the lack of safe, effective solutions, we made it our mission to help Indonesians improve their posture effortlessly.
                In 2024, we continued to grow by opening a new studio in Tokyo, further strengthening our presence in Japan. In 2025, we reached another milestone by launching our first studio in Jakarta, bringing our innovative posture improvement method to even more people.
              </div>
            </div>

            <div className="w-full h-auto">
              <div className="w-full h-[320px] bg-cover bg-center bg-no-repeat rounded-lg shadow-md mb-5" style={{ backgroundImage: 'url("/img/about_1.png")' }}>
              </div>
              <div className='flex gap-5 justify-between'>
                <div className='flex-1 bg-primary p-6 rounded-lg'>
                  <h2 className='font-noto_serif font-bold text-center text-slate-200 text-4xl'>40k+</h2>
                  <p className='text-sm text-center text-slate-200 mt-2'>Sessions booked</p>
                </div>
                <div className='flex-1 bg-primary p-6 rounded-lg'>
                  <h2 className='font-noto_serif font-bold text-center text-slate-200 text-4xl'>8k+</h2>
                  <p className='text-sm text-center text-slate-200 mt-2'>Clients</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className='container mb-24'>
          <div className='text-3xl font-noto_serif font-bold text-gray-600 text-center mb-6'>
            Meet Our Professional <span className='text-primary'>Instructor</span>
          </div>
          <div className='text-center text-sm text-gray-600 mb-8'>
            At Be-Style, we pride ourselves on having a team of instructors and staff dedicated to providing you with the best therapy experience. We <br /> are a group of individuals passionate about health and wellness, bringing deep experience and expertise to every session. 
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            
            {
              data.map((item, index) => (
                <ProfileCard key={index} data={item} loading={loading} />
              ))
            }

          </div>
        </div>
      </section>

      
    </div>
  )
}

export default AboutPage