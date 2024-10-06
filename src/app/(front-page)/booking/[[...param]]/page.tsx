'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import CustomModal from '@/components/ui/custoom-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine, RiCalendarScheduleFill, RiErrorWarningFill, RiFilter2Fill, RiMapPin2Fill } from 'react-icons/ri'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useRouter, useSearchParams } from 'next/navigation'
import { uniqueValue } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronsUpDown } from 'lucide-react'
import { Command, CommandInput, CommandList } from '@/components/ui/command'
import { useSchedulePage } from '@/store/use-schedule-page'
import Image from 'next/image'

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

const dataas = [
  {
    "name": "joshoua",
    "description": "asdasdasdasdasdasdasdasdasd",
    "time": "14:00",
    "date": "2024-9-21",
    "image": "package/1726646109_vYseEi65P0.png",
    "duration": "30",
    "staff": "staff",
    "location": "Jakarta",
    "image_url": "https://shisei-be.mahirtechno.my.id/storage/package/1726646109_vYseEi65P0.png"
},
{
    "name": "pijal alami",
    "description": "yali yali<br>",
    "time": "14:00",
    "date": "2024-09-21",
    "image": "package/1726647091_DpyEdkVout.png",
    "duration": "120",
    "staff": "staff",
    "location": "bandung",
    "image_url": "https://shisei-be.mahirtechno.my.id/storage/package/1726647091_DpyEdkVout.png"
}
]

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

const BookingPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [isSelect, setIsSelect] = React.useState<string>('')
  const [isOpenModalDetail, setIsOpenModalDetail] = React.useState<boolean>(false)
  const {schedules, getSchedules} = useSchedulePage()
  const [selectedSchedule, setSelectedSchedule] = React.useState<any>()
  const [detailSchedule, setDetailSchedule] = React.useState<any>()

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const router = useRouter()
  const param  = useSearchParams()

  useEffect(() => {
    if (param.size > 0 || date){
      const month = param.get('month')
      const year = param.get('year')
      const day = param.get('date')
      getSchedules(`/schedule?month=${month}&year=${year}&date=${day}`)
    }
  }, [param, date])

  const handleSelect = (data:any) => {
    setIsSelect((current) => current === data.id ? '' : data.id)
    setSelectedSchedule(data)
  }

  const handleNextDate = () => {
    const newDate = new Date(date!)
    newDate.setDate(newDate.getDate() + 1)
    setDate(newDate)
  }

  const handlePrevDate = () => {
    const newDate = new Date(date!)
    newDate.setDate(newDate.getDate() - 1)
    setDate(newDate)
  }
  
  // const handleSearchData = () => {
  // }

  const handleSearchData = async (date: any) => {
    if (date){
      setDate(date)
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const day = date.getDate()
      const newDate = `year=${year}&month=${month}&date=${day}`
      router.push(`/booking?${newDate}`)
    }
  }

  const handleDetail = (data:any) => {
    setDetailSchedule(data)
    setIsOpenModalDetail(true)
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
                onSelect={(date) => handleSearchData(date)}
                className="rounded-md"
                disabled={(date) => date < new Date()}
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

          {/* <div>
            <Button onClick={() => handleSearchData()}>cek </Button>
          </div> */}

        </div>

        <div className='relative flex-1 rounded-lg border border-primary/50'>
          
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

          {/* filter section */}
          <div className='mx-6 mb-4 p-[15px] bg-gray-100 dark:text-gray-600 rounded-lg sticky top-28'>
            <div className='font-semibold text-gray-700 dark:text-slate-300 mb-4'>
              Search filters
            </div>
            <div className='flex flex-col md:flex-row justify-between gap-6'>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="select instructor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Jakarta</SelectItem>
                  <SelectItem value="dark">Bandung</SelectItem>
                  <SelectItem value="system">Surabaya</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="select Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Jakarta</SelectItem>
                  <SelectItem value="dark">Bandung</SelectItem>
                  <SelectItem value="system">Surabaya</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="select Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Jakarta</SelectItem>
                  <SelectItem value="dark">Bandung</SelectItem>
                  <SelectItem value="system">Surabaya</SelectItem>
                </SelectContent>
              </Select>
              <Button className='flex items-center'>
                <RiFilter2Fill className='mr-2'/> Reset Filter
              </Button>
            </div>
          </div>
          {/* end filter section */}

          {/* list schedule section */}
          <div className='h-auto px-6 pb-6 overflow-auto'>
            <div className='flex items-center flex-wrap gap-4 justify-between w-full py-2 border-y border-slate-300 mb-6'>
              <div className='md:w-1/12'>Select</div>
              <div className='md:w-5/12'>Class</div>
              <div className='md:w-2/12'>Instructor</div>
              <div className='md:w-1/12'>Time</div>
              <div className='md:w-1/12'>Duration</div>
            </div>

            {
              schedules.length <= 0
              ? <div className='text-center text-gray-400 py-12 font-semibold text-2xl'>select a date and location to <br/> search for classes.</div>
              : (
                <div>
                  {
                    schedules.map((item,index) => (
                      <div 
                        key={index}  
                        onClick={() => handleSelect(item)} 
                        className={'w-full flex flex-wrap justify-between items-center gap-4 bg-secondary/20 rounded-md p-5 mb-4' + (isSelect === item.id ? ' border border-primary bg-secondary/50' : '')}>
                        <div className='md:w-1/12'>
                          <input type='checkbox'
                            checked={isSelect === item.id}
                            onChange={handleSelect}
                            disabled={item.calendar.length > 0}
                          />
                        </div>
                        <div className='md:w-5/12'>
                          {
                            index === 1 &&
                            <p className='text-sm text-destructive'>Classes are sold out</p>
                          }
                          <div className='font-noto_serif font-semibold mb-2'>{item?.name}</div>
                          <div onClick={() => handleDetail(item)} className='text-sm text-primary cursor-pointer flex items-center gap-1'> <RiErrorWarningFill size={16}/> Detail Class</div>
                        </div>
                        <div className='md:w-2/12'>
                          <p className='text-sm'>{item?.staff?.name}</p>
                        </div>
                        <div className='md:w-1/12 font-semibold'>
                          {item?.time}
                        </div>
                        <div className='font-semibold md:w-1/12'>
                          {item?.duration} mins
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
          {/* end list schedule section */}
          
          {/* select section */}
          <div className={`p-6 fixed bottom-0 right-0 left-0`}>
            <div className={`bg-background shadow-lg transition-all duration-300 overflow-hidden rounded-lg
              ${isSelect === '' ? 'h-[0px]' : 'h-[100px] py-4'}  
            `}>
              <div className='container'>
                <div className='w-full flex justify-between items-center'>
                  <div>
                    <div className='text-lg font-bold font-noto_serif mb-2'>
                      {selectedSchedule?.name}
                    </div>
                    <div className='text-md text-primary'>
                      {selectedSchedule?.staff?.name}
                    </div>
                  </div>
                  <div>
                    <Link className='bg-primary text-white px-5 py-3 rounded-md' href={`/booking/${selectedSchedule?.id}`}>Book Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end select section */}

        </div>
      </div>
      
      {/* end title */}
      
      <CustomModal open={isOpenModalDetail} onOpenChange={() => setIsOpenModalDetail(false)} title='Detail Class'>
        <div className='h-full overflow-auto'>
          <div className='mb-2'>
              <Image src={detailSchedule?.image_url} alt={detailSchedule?.name} width={300} height={0} className='rounded-lg'/>
          </div>
          <div className='mb-2'>
            <p className='font-semibold text-sm'>class name :</p>
            <p>{detailSchedule?.name}</p>
          </div>
          <div className='mb-2 flex items-center gap-4'>
            <p className='font-semibold text-sm'>Instructor :</p>
            <p>{detailSchedule?.staff?.name}</p>
          </div>
          <div className='mb-2 flex items-center gap-4'>
            <p className='font-semibold text-sm'>Location :</p>
            <p>{detailSchedule?.location?.name}</p>
          </div>
          <div className='mb-2 flex items-center gap-4'>
            <p className='font-semibold text-sm'>date :</p>
            <p>{detailSchedule?.date}</p>
          </div>
          <div className='mb-2 flex items-center gap-4'>
            <p className='font-semibold text-sm'>Duration :</p>
            <p>{detailSchedule?.duration} mins</p>
          </div>
          <div className='mb-2'>
            <p className='font-semibold text-sm'>Describtion :</p>
            <p className='text-justify' dangerouslySetInnerHTML={{ __html: detailSchedule?.description }}>
            </p>
          </div>
        </div>
      </CustomModal>

    </div>
  )
}

export default BookingPage