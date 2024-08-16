import { Button } from '@/components/ui/button'
import React from 'react'
import { RiCalendar2Fill, RiMapPin2Fill, RiTimeFill, RiUser3Fill } from 'react-icons/ri'

const page = () => {
  return (
    <div>
      <div className='container pt-20 pb-10 mt-20'>
        <div className={"font-noto_serif text-3xl font-bold text-gray-700 dark:text-slate-300"}>Booking.</div>
      </div>
      <div className='container flex flex-wrap gap-4 mb-16'>
        
        <div className='flex-1 border border-slate-200 rounded-lg p-5'>
          <div>
            <img src="/img/why-img.png" alt="logo" className='w-full max-h-[477px] object-cover rounded-lg'/>
          </div>
          
          <h2 className='font-noto_serif font-bold text-2xl text-gray-600 mb-1 mt-4 dark:text-slate-300'>Private Reformer Class B</h2>
          <p className='text-sm text-primary mb-4'>2 classes remaining</p>
          <p className='text-sm text-destructive mb-12'>You do not have an eligible package, Buy a package to continue booking.</p>
          
          <h2 className='font-bold text-xl text-gray-600 dark:text-slate-300 border-b border-slate-300 pb-4 mb-4'>Description</h2>
          <p className='text-md text-gray-700 dark:text-slate-300 leading-relaxed'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pulvinar sem libero, pharetra bibendum dui aliquet at. Duis nulla enim, sollicitudin non nunc eget, ultricies varius libero. Etiam accumsan mi dictum leo aliquam, quis rutrum dolor facilisis. Morbi vitae ligula nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer at risus sit amet leo vehicula vestibulum et vitae lorem. Fusce vel viverra ipsum, id volutpat est. Ut porttitor porttitor venenatis. Nulla a nunc id risus egestas ultricies. Sed odio diam, maximus vitae justo ac, tempus congue mi. Pellentesque facilisis tortor nulla, sed iaculis ex porta eu. Suspendisse porttitor pharetra enim, nec vulputate orci volutpat vel.
          </p>
        </div>
        
        {/* side */}
        <div className='w-full h-auto md:w-2/6'>

          <div className='border border-slate-200 rounded-lg p-5 mb-5'>
            <div className='font-noto_serif font-bold text-gray-700 text-2xl border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              Your Schedule
            </div>
            <div className='font-noto_serif font-bold text-gray-700 text-xl border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              Private Reformer Class B
            </div>

            <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              <div className='flex items-center gap-2 mb-1'>
                <RiCalendar2Fill className='text-primary text-xl'/>
                <span className='text-lg'>Date</span>
              </div>
              <div className='text-xl font-bold'>
                08 August 2024
              </div>
            </div>

            <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              <div className='flex items-center gap-2 mb-1'>
                <RiTimeFill className='text-primary text-xl'/>
                <span className='text-lg'>Time and duration</span>
              </div>
              <div className='text-xl font-bold'>
                8:15 AM, 50 mins
              </div>
            </div>

            <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              <div className='flex items-center gap-2 mb-1'>
                <RiUser3Fill className='text-primary text-xl'/>
                <span className='text-lg'>Instructor</span>
              </div>
              <div className='text-xl font-bold'>
                Hendra Gunawan
              </div>
            </div>

            <div className='text-gray-700  border-b border-slate-300 pb-5 dark:text-slate-300 mb-5'>
              <div className='flex items-center gap-2 mb-1'>
                <RiMapPin2Fill className='text-primary text-xl'/>
                <span className='text-lg'>Location</span>
              </div>
              <div className='text-xl font-bold'>
                Atrium Mulia Kuningan Studio
              </div>
            </div>
          </div>

          <div>
            <Button className='w-full mb-3' size={"lg"}>BUY PACKAGE</Button>
            <p className='text-center text-primary'>Check-in 3 hours before class begins</p>
          </div>
        </div>
        {/* end side */}

      </div>
    </div>
  )
}

export default page