'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { RiMapPin2Fill } from 'react-icons/ri'

const data = [
  {
    "id" : 1,
    "name": "10:00",
  },
  {
    "id" : 2,
    "name": "11:00",
  },
  {
    "id" : 3,
    "name": "12:00",
  },
  {
    "id" : 4,
    "name": "13:00",
  },
  {
    "id" : 5,
    "name": "14:00",
  },
]

const page = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [isSelect, setIsSelect] = React.useState<number>(0)


  useEffect(() => {
    console.log(isSelect)
  }, [isSelect])


  const handleSelect = () => {

  }

  return (
    <>
      {/* title */}
      <div className='container pt-20 pb-10 mt-20'>
        <div className={"font-noto_serif text-3xl font-bold text-gray-700"}>Booking.</div>
      </div>
      <div className='container flex gap-6 flex-wrap md:flex-nowrap mb-20'>
        <div className=''>
          <div className='border border-primary/50 rounded-md py-3 px-4  mb-6'>
            <div className={"font-noto_serif text-center text-primary text-2xl font-bold mb-4"}>
              Select a schedule
            </div>
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </div>
          </div>

          <div>
            <div className='flex items-center gap-2 mb-3'>
              <RiMapPin2Fill/>
              <span>Choose Location</span>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>

        <div className='flex-1 rounded-lg border border-primary/50'>
          <div className='h-[500px] p-6 overflow-auto'>
            <div className='flex items-center justify-between w-full py-2 border-y border-slate-300 mb-6'>
              <div>Select</div>
              <div>Class</div>
              <div>Instructor</div>
              <div>Time</div>
              <div>Duration</div>
            </div>

            {
              data.map((item,index) => (
                <div 
                  key={index}  
                  onClick={() => setIsSelect(item.id)} 
                  className={'w-full flex justify-between items-center bg-secondary/40 rounded-md p-5 mb-4' + (isSelect === item.id ? ' border border-primary' : '')}>
                  <div>
                    <input type='checkbox'
                      checked={isSelect === item.id}
                      onChange={handleSelect}
                    />
                  </div>
                  <div>
                    <div className='font-noto_serif font-semibold mb-2'>Private Reformer Class B</div>
                    <div className='text-sm'>2 classes left</div>
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='font-semibold'>
                    9:15 AM
                  </div>
                  <div className='font-semibold'>
                    50 mins
                  </div>
                </div>
              ))
            }
          </div>
          
          {
            isSelect > 0 && (
              <div className='p-6'>
                <hr className='my-10' />
                <div className='w-full flex justify-between items-center'>
                  <div>
                    <div className='text-md font-bold font-noto_serif mb-2'>
                      Private Reformer Class B
                    </div>
                    <div className='text-sm text-primary'>
                      Hendra Gunawan
                    </div>
                  </div>
                  <div>
                    <Link href='/booking/1'>Book Now</Link>
                  </div>
                </div>
              </div>
            )
          }

        </div>
      </div>
      {/* end title */}
    </>
  )
}

export default page