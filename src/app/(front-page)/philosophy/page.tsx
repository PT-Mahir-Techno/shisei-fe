import { Button } from '@/components/ui/button'
import React from 'react'

import "../../styles/animations.css";

const PhilosophyPage = () => {
  return (
    <div className='page-animation'>
      <section className='pt-40 py-12 bg-cover bg-no-repeat bg-center'
        style={{ backgroundImage: 'url("/img/navbar-bg-2.png")' }}
      >
        <div className="container">
          <h2 className='font-noto_serif font-bold text-4xl text-center text-slate-100'>Our Philosophy</h2>
        </div>
      </section>
      
      <section className='my-24'>
        <div className="container">

          <div className="flex flex-wrap md:flex-nowrap justify-between gap-12 mb-24">
            <div className="w-full h-[300px] bg-cover bg-center bg-no-repeat rounded-lg shadow-md" style={{ backgroundImage: 'url("/img/philosopy_1.png")' }}>
            </div>
            <div className="w-full flex flex-col justify-center flex-wrap">
              <div className={"font-noto_serif mb-4 text-3xl font-bold text-gray-600 dark:text-slate-200"}>
                Embrace the Harmony of <span className='text-primary'> Mind, Body, and Posture</span>
              </div>
              <div className="text-sm text-slate-500 leading-relaxed text-justify dark:text-slate-300">
                At Be-Style Studio, we believe that true well-being starts with a strong foundation. Our journey began in the heart of Shiga Prefecture, where we witnessed firsthand the transformative power of posture improvement on the human body and spirit. Today, we continue this tradition of excellence and dedication, guiding our clients toward a life of balance and health.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap justify-between gap-12 mb-24">
            <div className="w-full flex flex-col justify-center flex-wrap">
              <div className={"font-noto_serif mb-4 text-3xl font-bold text-gray-600 dark:text-slate-200"}>
              The Art of <span className='text-primary'> Posture Improvement</span>
              </div>
              <div className="text-sm text-slate-500 leading-relaxed text-justify dark:text-slate-300">
                Inspired by the principles of mindfulness and the pursuit of perfection, our approach to posture improvement goes beyond physical adjustments. We see posture as an art form—a delicate balance that reflects inner harmony and strength. Our dedicated instructors and therapists are trained to bring out the best in each individual, helping you align your body with your mind and spirit.
              </div>
            </div>

            <div className="w-full h-[300px] bg-cover bg-center bg-no-repeat rounded-lg shadow-md" style={{ backgroundImage: 'url("/img/philosopy_2.png")' }}>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap justify-between gap-12 mb-24">
            <div className="w-full bg-cover bg-center bg-no-repeat rounded-lg shadow-md" style={{ backgroundImage: 'url("/img/philosopy_3.png")' }}>
            </div>
            <div className="w-full">
              <div className='mb-12'>
                <div className={"font-noto_serif mb-4 text-3xl font-bold text-gray-600 dark:text-slate-200"}>
                  Experience the <span className='text-primary'> Difference</span>
                </div>
                <div className="text-sm text-slate-500 leading-relaxed text-justify dark:text-slate-300">
                  Every session at Be-Style is a step towards a healthier, more vibrant you. We focus on personalized care, ensuring that each client receives a tailored program designed to address their unique needs. Our state-of-the-art facilities provide a serene and comfortable environment where you can relax and rejuvenate.
                </div>
              </div>
              <div>
                <div className={"font-noto_serif mb-4 text-3xl font-bold text-gray-600 dark:text-slate-200"}>
                  Our Commitment to Excellence
                </div>
                <div className="text-sm text-slate-500 leading-relaxed text-justify dark:text-slate-300">
                  We are committed to providing the highest level of service and care. Our certified professionals are passionate about helping you achieve your wellness goals, and our ongoing commitment to education ensures that we stay at the forefront of posture improvement techniques. At Be-Style, we take pride in the positive changes we see in our clients, and we are dedicated to helping you experience the same transformation.
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>



      <section style={{ backgroundImage: 'url("/img/section-bg.png")' }} className="bg-cover bg-center bg-no-repeat">
        <div className="container text-center py-16">
          <div className={"font-noto_serif text-3xl font-semibold mb-8 text-background leading-snug dark:text-slate-200"}>
          Don’t wait any longer to become the best version of <br /> yourself. Begin your path to health and happiness <br /> with our professional support.
          </div>
          <div>
            <Button variant={"secondary"}>Book Your Session Now</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PhilosophyPage