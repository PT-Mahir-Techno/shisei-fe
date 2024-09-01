'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import CustomModal from '@/components/ui/custoom-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine, RiCalendarScheduleFill, RiErrorWarningFill, RiMapPin2Fill } from 'react-icons/ri'

import "../../styles/animations.css";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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

const BookingPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [isSelect, setIsSelect] = React.useState<number>(0)
  const [isOpenModalDetail, setIsOpenModalDetail] = React.useState<boolean>(false)


  useEffect(() => {
    // console.log(isSelect)
  }, [isSelect])


  const handleSelect = () => {

  }

  const handleNextDate = () => {
    // update next date
    const newDate = new Date(date!)
    newDate.setDate(newDate.getDate() + 1)
    setDate(newDate)
  }

  const handlePrevDate = () => {
    // update prev date
    const newDate = new Date(date!)
    newDate.setDate(newDate.getDate() - 1)
    setDate(newDate)
  }

  return (
    <div className='page-animation'>
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
                  <SelectItem value="light">Jakarta</SelectItem>
                  <SelectItem value="dark">Bandung</SelectItem>
                  <SelectItem value="system">Surabaya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>

        <div className='flex-1 rounded-lg border border-primary/50'>
          <div className='pt-6 px-6 pb-4 flex items-center gap-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <RiCalendarScheduleFill className='text-primary cursor-pointer' size={26} onClick={() => setDate(new Date())}/>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset date to today</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* date dd mm YY */}
            <p className='font-noto_serif font-bold text-lg text-gray-700'>{ date?.toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            ) }</p>

            <div className='flex gap-2 items-center'>
              <div onClick={handlePrevDate} className='bg-accent rounded-md p-1 hover:bg-accent/40 cursor-pointer'>
                <RiArrowLeftSLine className='text-primary' size={22}/>
              </div>
              <div onClick={handleNextDate} className='bg-accent rounded-md p-1 hover:bg-accent/40 cursor-pointer'>
                <RiArrowRightSLine className='text-primary' size={22}/>
              </div>
            </div>
          </div>
          <div className='h-[500px] px-6 pb-6 overflow-auto'>
            <div className='flex items-center flex-wrap gap-4 justify-between w-full py-2 border-y border-slate-300 mb-6'>
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
                  className={'w-full flex flex-wrap justify-between items-center gap-4 bg-secondary/40 rounded-md p-5 mb-4' + (isSelect === item.id ? ' border border-primary' : '')}>
                  <div>
                    <input type='checkbox'
                      checked={isSelect === item.id}
                      onChange={handleSelect}
                    />
                  </div>
                  <div>
                    {
                      index === 1 &&
                      <p className='text-sm text-destructive'>Classes are sold out</p>
                    }
                    <div className='font-noto_serif font-semibold mb-2'>Private Reformer Class B</div>
                    <div onClick={() => setIsOpenModalDetail(true)} className='text-sm text-primary cursor-pointer flex items-center gap-1'> <RiErrorWarningFill size={16}/> Detail Class</div>
                  </div>
                  <div>
                    <p className='text-sm'>Hendra Gunawan</p>
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
                <hr className='my-2' />
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
                    <Link className='bg-primary text-white px-4 py-2 rounded-md' href='/booking/1'>Book Now</Link>
                  </div>
                </div>
              </div>
            )
          }

        </div>
      </div>
      
      {/* end title */}
      
      <CustomModal open={isOpenModalDetail} onOpenChange={() => setIsOpenModalDetail(false)} title='Detail Class'>
        <div className='mb-2'>
          <p className='font-semibold text-sm'>class name :</p>
          <p>Private Reformer Class B</p>
        </div>
        <div className='mb-2'>
          <p className='font-semibold text-sm'>Instructor :</p>
          <p>Hendra Gunawan</p>
        </div>
        <div className='mb-2'>
          <p className='font-semibold text-sm'>Duration :</p>
          <p>50 mins</p>
        </div>
        <div className='mb-2'>
          <p className='font-semibold text-sm'>Describtion :</p>
          <p className='text-justify'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pulvinar sem libero, pharetra bibendum dui aliquet at. Duis nulla enim, sollicitudin non nunc eget, ultricies varius libero. Etiam accumsan mi dictum leo aliquam, quis rutrum dolor facilisis. Morbi vitae ligula nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer at risus sit amet leo vehicula vestibulum et vitae lorem. Fusce vel viverra ipsum, id volutpat est. Ut porttitor porttitor venenatis. Nulla a nunc id risus egestas ultricies. Sed odio diam, maximus vitae justo ac, tempus congue mi. Pellentesque facilisis tortor nulla, sed iaculis ex porta eu. Suspendisse porttitor pharetra enim, nec vulputate orci volutpat vel.
          </p>
        </div>
      </CustomModal>

    </div>
  )
}

export default BookingPage