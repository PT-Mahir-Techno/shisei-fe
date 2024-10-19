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
                Welcome in <span className='text-primary'> Be-Style® </span>
              </div>
              <div className="text-sm text-slate-500 leading-relaxed text-justify dark:text-slate-300">
                Be-Style is a specialized studio focusing on posture improvement and overall well-being. We offer a variety of therapy and fitness sessions tailored to individual needs, helping our clients achieve better health and wellness.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap justify-between gap-12 mb-24">
            <div className="w-full flex flex-col justify-center flex-wrap">
              <div className={"font-noto_serif mb-4 text-3xl font-bold text-gray-600 dark:text-slate-200"}>
                Thanks to you, we have reached <span className='text-primary'> 22,000 sessions!</span>
              </div>
              <div className="text-sm text-slate-500 leading-relaxed text-justify dark:text-slate-300">
              Be-Style was started in 2012 in a room at a community center in Shiga Prefecture. When I invited my close friends to give lessons, I noticed changes in the bodies of the people who attended the sessions. Their discomfort decreased, their appearance changed, and gradually, word of mouth began to expand my circle.
              <br /><br />
              Therefore, in June 2014, about two years later, I opened the Be-Style Moriyama Store, a studio specializing in posture improvement, with the desire to spread information about self-conditioning to as many people as possible. We received such an incredible response that we had a waiting list for cancellations within two months. The circle continued to grow, and in September 2016, the Be-Style Osaka branch, a studio specializing in posture correction, was opened.
              <br /><br />
              Through referrals and word-of-mouth from customers who have experienced the benefits, we have conducted sessions for more than 22,000 people and served over 4,800 people throughout the year.
              <br /><br />
              Next time, please try it for yourself.
              </div>
            </div>

            <div className="w-full h-auto">
              <div className="w-full h-[320px] bg-cover bg-center bg-no-repeat rounded-lg shadow-md mb-5" style={{ backgroundImage: 'url("/img/about_1.png")' }}>
              </div>
              <div className='flex gap-5 justify-between'>
                <div className='flex-1 bg-primary p-6 rounded-lg'>
                  <h2 className='font-noto_serif font-bold text-center text-slate-200 text-4xl'>22k+</h2>
                  <p className='text-sm text-center text-slate-200 mt-2'>Sessions booked</p>
                </div>
                <div className='flex-1 bg-primary p-6 rounded-lg'>
                  <h2 className='font-noto_serif font-bold text-center text-slate-200 text-4xl'>22k+</h2>
                  <p className='text-sm text-center text-slate-200 mt-2'>Sessions booked</p>
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