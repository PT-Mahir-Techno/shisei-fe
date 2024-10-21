'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import CustomModal from '@/components/ui/custoom-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine, RiCalendar2Fill, RiCalendarCheckFill, RiCalendarScheduleFill, RiErrorWarningFill, RiFileWarningFill, RiFilter2Fill, RiMap2Fill, RiMapPin2Fill, RiTimeFill, RiTimerFill, RiVerifiedBadgeFill } from 'react-icons/ri'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn, formatedDate, PluckValue, uniqueValue } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarClockIcon, Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useSchedulePage } from '@/store/use-schedule-page'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Player } from '@lottiefiles/react-lottie-player'
import { useHome } from '@/store/use-home'

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
  const {schedules, getSchedules, loading, fileterSchedule, listStaff, listDuration, listTime, originalValue, resetFilter} = useSchedulePage()
  const [selectedSchedule, setSelectedSchedule] = React.useState<any>()
  const [detailSchedule, setDetailSchedule] = React.useState<any>()
  const [selected, setSelected] = React.useState("")
  const {locations, getLocations } = useHome()
  const [selectedLocation, setSelectedLocation] = React.useState("")
  const [valueLocation, setValueLocation] = React.useState("")
  const [openLocation, setOpenLocation] = React.useState(false)
  // const [loading, setLoading] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [showModalCalendar, setShowModalCalendar] = React.useState(false)
  const [showFilterModal, setShowFilterModal] = React.useState(false)

  const [staffFilter, setStaffFilter] = React.useState("")
  const [timeFilter, setTimeFilter] = React.useState("")
  const [durationFilter, setDurationFilter] = React.useState("")

  const router = useRouter()
  const param  = useSearchParams()


  useEffect(() => {
    init()
  }, [param])

  const init  = async () => {
    getLocations()
    try {
      if (param.size > 0 || date){
        // setLoading(true)
        const month = param.get('month')
        const year = param.get('year')
        const day = param.get('date')
        const location = param.get('location')
  
        // set adte
        if (month && year && day){
          const newDate = new Date(`${year}-${month}-${day}`)
          setDate(newDate)
        }
  
        getSchedules(`/schedule?month=${month}&year=${year}&date=${day}${location ? `&location=${location}` : ''}`)
        // setLoading(false)
      }
    } catch (error:any) {
      // setLoading(false)
      toast.error(error.data.message)
    }
  }

  const handleSelect = (data:any) => {
    if (data.calendar.length >= data.max_order){
      toast.error('Jadwal sudah penuh')
    }else {
      setIsSelect((current) => current === data.id ? '' : data.id)
      setSelectedSchedule(data)
    }
  }

  const handleNextDate = () => {
    const newDate = new Date(date!)
    newDate.setDate(newDate.getDate() + 1)
    setDate(newDate)

    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()
    const day = newDate.getDate()
    const formated = `year=${year}&month=${month}&date=${day}${ selectedLocation ? `&location=${selectedLocation}` : ''}`
    router.push(`/booking?${formated}`)
  }

  const handlePrevDate = () => {
    const newDate = new Date(date!)
    newDate.setDate(newDate.getDate() - 1)
    setDate(newDate)

    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()
    const day = newDate.getDate()
    const formated = `year=${year}&month=${month}&date=${day}${ selectedLocation ? `&location=${selectedLocation}` : ''}`
    router.push(`/booking?${formated}`)
    
  }
  
  // const handleSearchData = () => {
  // }

  const handleSearchData = async (date: any) => {
    if (date){
      setDate(date)
      // const location = param.get('location')
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const day = date.getDate()
      const newDate = `year=${year}&month=${month}&date=${day}${ selectedLocation ? `&location=${selectedLocation}` : ''}`
      router.push(`/booking?${newDate}`)
    }
  }

  const handleDetail = (data:any) => {
    setDetailSchedule(data)
    setIsOpenModalDetail(true)
  }

  const handleSelectLocation = (data:any) => {
    setSelectedLocation(data)
    if (date){
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const day = date.getDate()
      const newDate = `year=${year}&month=${month}&date=${day}${data ? `&location=${data}` : ''}`
      router.push(`/booking?${newDate}`)
    }else{
      toast.error('Please select date first')
    }
  }

  const handleResetFilter = () => {
    setStaffFilter('')
    setTimeFilter('')
    setDurationFilter('')
    resetFilter()

    toast.success('Filter reseted')
  }

  return (
    <div className='page-animation'>
      {/* title */}
      <div className='container pt-20 pb-10 mt-20'>
        <div className={"font-noto_serif text-3xl font-bold text-gray-700"}>Booking.</div>
      </div>
      
      <div className='container flex gap-6 flex-col md:flex-row mb-20'>
        
        <div className=''>
          <div className='hidden md:block'>
            <div className='border border-primary/50 rounded-md py-3 px-4  mb-6'>
              <div className={"font-noto_serif text-center text-primary text-lg font-bold mb-4"}>
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
                
              <Popover open={openLocation} onOpenChange={setOpenLocation}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openLocation}
                    className="w-full justify-between"
                  >
                    {valueLocation
                      ? locations.find((item:any) => item.name === valueLocation)?.name
                      : "Select Location..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-80 p-0">
                  <Command>
                    <CommandInput placeholder="Search location..." />
                    <CommandList>
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        {locations.map((item:any) => (
                          <CommandItem
                            key={item.id}
                            value={item.name}
                            onSelect={(currentValue) => {
                              handleSelectLocation(item.id)
                              setValueLocation(currentValue === value ? "" : currentValue)
                              setOpenLocation(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                valueLocation === item.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {item.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              </div>
            </div>
          </div>

          <div className='block md:hidden'>
            <Button className='w-full bg-primary text-white' onClick={() => setShowModalCalendar(true)}><RiCalendarScheduleFill size={18} className='mr-3'/> Select Date and Location</Button>
          </div>
        </div>

        <div className='relative flex-1 rounded-lg border border-primary/50'>
          
          <div className='pt-6 px-6 pb-4 flex justify-between gap-4 items-center flex-wrap'>
            <div className='flex items-center gap-2'>
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
            <div className='block md:hidden'>
              <Button onClick={() => setShowFilterModal(true)}>
                <RiFilter2Fill/>
              </Button>
            </div>
          </div>

          {/* filter section */}
          <div className='hidden md:block mx-6 mb-4 p-[15px] bg-gray-100 dark:text-gray-600 rounded-lg sticky top-28'>
            <div className='font-semibold text-gray-700 dark:text-slate-300 mb-4'>
              Search filters
            </div>
            {
              originalValue && originalValue.length > 0 &&
              <div className='flex flex-col md:flex-row justify-between gap-6'>
                <Select onValueChange={(value) => {
                    setStaffFilter(value);
                    fileterSchedule([
                      {
                        filterBy: 'staff_id',
                        data: value
                      }
                    ])
                  }} 
                  value={staffFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="select instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      listStaff.map((item:any, index:any) => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                
                <Select onValueChange={(value) => {
                    setTimeFilter(value);
                    fileterSchedule([
                      {
                        filterBy: 'time',
                        data: value
                      }
                    ])
                  }} 
                  value={timeFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="select Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      listTime.map((item:any, index:any) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => {
                    setDurationFilter(value);
                    fileterSchedule([
                      {
                        filterBy: 'duration',
                        data: value
                      }
                    ])
                  }} 
                  value={durationFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="select Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      listDuration.map((item:any, index:any) => (
                        <SelectItem key={item} value={item}>{item} Minutes</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                
                <Button onClick={() => handleResetFilter()} className='flex items-center'>
                  <RiFilter2Fill className='mr-2'/> Reset Filter
                </Button>
              </div>
            }
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
              loading
              ? <div className='text-center '>
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src={"/animation/run.json"}
                    style={{ height: '200px', width: '200px' }}
                  ></Player>
                  <div className='text-gray-500 font-semibold mb-4'>Loading...</div>
                </div>
              : schedules.length <= 0
                ? <div className='text-center text-gray-400 py-12 font-semibold text-lg'>select a date and location to  search for classes.</div>
                : (
                  <div>
                    {
                      schedules.map((item,index) => (
                        <div 
                          key={index}  
                          onClick={() => handleSelect(item)} 
                          className={`
                            ${isSelect === item.id ? ' border border-primary bg-secondary/50' : ''}
                            w-full flex flex-wrap justify-between items-center gap-4 bg-secondary/20 rounded-md p-5 mb-4
                          `}>

                          <div className='md:w-1/12'>
                            <input type='checkbox'
                              checked={isSelect === item.id}
                              onClick={() =>  item.calendar.length < item.max_order && handleSelect(item)}
                              onChange={() =>  item.calendar.length < item.max_order && handleSelect(item)}
                              disabled={item.calendar.length > 0}
                            />
                          </div>

                          <div className='md:w-5/12'>
                            {
                              item.calendar.length >= item.max_order &&
                              <p className='text-xs font-semibold bg-destructive px-2 py-1 text-white rounded-lg inline-block mb-2'> classes are sold out</p>
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
            <div className={`bg-background shadow-lg shadow-primary transition-all duration-300 overflow-hidden rounded-lg
              ${isSelect === '' ? 'h-[0px]' : 'h-auto py-6'}  
            `}>
              <div className='container'>
                <div className='w-full flex gap-6  justify-between items-center flex-wrap'>
                  <div>
                    <div className='text font-semibold text-gray-700 line-clamp-none mb-3'>
                      {selectedSchedule?.name}
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='h-[25px] w-[25px] rounded-full bg-cover bg-center'
                        style={{ backgroundImage: `url(${selectedSchedule?.staff?.photo_url ?? '/img/img_placeholder.png'})` }}
                      >
                      </div>
                      <p className='text-sm text-gray-700 flex items-center gap-1'>
                        {selectedSchedule?.staff?.name} <RiVerifiedBadgeFill className='text-green-500' size={16}/>
                      </p>
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
      
      <CustomModal open={isOpenModalDetail} onOpenChange={() => setIsOpenModalDetail(false)} size='max-w-3xl'>
        <div className='h-full overflow-auto'>
          <div className='flex flex-col md:flex-row gap-8'>
            <div className='mb-2 md:w-1/2'>
                <Image src={detailSchedule?.image_url} alt={detailSchedule?.name} width={400} height={0} className='rounded-lg clear-start w-full'/>
            </div>
            <div className='w-full'>
              <div>
                <p className='font-semibold mb-4'>{detailSchedule?.name}</p>
                <p className='text-sm text-justify line-clamp-6' dangerouslySetInnerHTML={{ __html: detailSchedule?.description }}>
                </p>
              </div>
            </div>
          </div>
          <div className='flex md:flex-row md:justify-between gap-2 md:gap-8 my-8 flex-wrap'>
            <div className='flex items-center gap-2'>
              <p className='text-sm text-gray-600 font-semibold flex items-center gap-1 '> <RiTimeFill className='text-primary' size={20}/> Start :</p>
              <p className='text-sm text-gray-600'>{detailSchedule?.time}</p>
            </div>
            <div className='flex items-center gap-2'>
            <p className='text-sm text-gray-600 font-semibold flex items-center gap-1 '> <RiTimerFill className='text-primary' size={20}/> Duration :</p>
              <p className='text-sm text-gray-600'>{detailSchedule?.duration} minutes</p>
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-sm text-gray-600 font-semibold flex items-center gap-1 '> <RiCalendarCheckFill className='text-primary' size={20}/> Date :</p>
              <p className='text-sm text-gray-600'>{formatedDate(new Date(detailSchedule?.date))}</p>
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-sm text-gray-600 font-semibold flex items-center gap-1 '> <RiMap2Fill className='text-primary' size={20}/> Location :</p>
              <p className='text-sm text-gray-600'>{detailSchedule?.location?.name}</p>
            </div>
          </div>
          <hr className='mb-4'/>
          <div className='flex gap-4'>
            <div className='w-[70px]'>
              <div
                className='w-[70px] h-[70px] rounded-full bg-cover bg-center'
                style={{ backgroundImage: `url(${detailSchedule?.staff?.photo_url ?? '/img/img_placeholder.png'})` }}
              >
              </div>
            </div>
            <div>
              <div className='font-semibold text-gray-700 mb-3 flex items-center gap-1'>{detailSchedule?.staff?.name} <RiVerifiedBadgeFill size={18} className='text-green-600' /> </div>
              <div className='text-sm text-gray-600'>{detailSchedule?.staff?.about}</div>
            </div>
          </div>
        </div>
      </CustomModal>

      {/* modal calendar and location */}
      <CustomModal open={showModalCalendar} onOpenChange={() => setShowModalCalendar(false)} size='max-w-sm'>
        <div className='border border-primary/50 rounded-md py-3 px-4  mb-6'>
          <div className={"font-noto_serif text-center text-primary text-2xl font-bold mb-4"}>
            Select a schedule
          </div>
          <div className='flex justify-center'>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => handleSearchData(date)}
              className="rounded-md w-full max-w-md"
              classNames={{
                months:
                  "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                month: "space-y-4 w-full flex flex-col",
                table: "w-full h-full border-collapse space-y-1",
                head_row: "",
                row: "w-full mt-2",}}
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
            <Select onValueChange={(val) => handleSelectLocation(val)} value={selectedLocation}>
              <SelectTrigger className="w-full">
                {
                  selectedLocation
                  ? locations.find((item:any) => item.id === selectedLocation)?.name
                  : "Select Location..."
                }
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">all location</SelectItem>
                {
                  locations?.map((location: any, index:any) => (
                    <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        </div>
      </CustomModal>
      {/* end modal calendar and location */}

      {/* modal calendar and location */}
      <CustomModal open={showFilterModal} onOpenChange={() => setShowFilterModal(false)} size='max-w-sm'>
        <div className=''>
          <div className='font-semibold text-gray-700 dark:text-slate-300 mb-4'>
            Search filters
          </div>
          {
            originalValue && originalValue.length > 0 &&
            <div className='flex flex-col md:flex-row justify-between gap-6'>
              <Select onValueChange={(value) => {
                  setStaffFilter(value);
                  fileterSchedule([
                    {
                      filterBy: 'staff_id',
                      data: value
                    }
                  ])
                }} 
                value={staffFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="select instructor" />
                </SelectTrigger>
                <SelectContent>
                  {
                    listStaff.map((item:any, index:any) => (
                      <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              
              <Select onValueChange={(value) => {
                  setTimeFilter(value);
                  fileterSchedule([
                    {
                      filterBy: 'time',
                      data: value
                    }
                  ])
                }} 
                value={timeFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="select Time" />
                </SelectTrigger>
                <SelectContent>
                  {
                    listTime.map((item:any, index:any) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => {
                  setDurationFilter(value);
                  fileterSchedule([
                    {
                      filterBy: 'duration',
                      data: value
                    }
                  ])
                }} 
                value={durationFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="select Duration" />
                </SelectTrigger>
                <SelectContent>
                  {
                    listDuration.map((item:any, index:any) => (
                      <SelectItem key={item} value={item}>{item} Minutes</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              
              <Button onClick={() => handleResetFilter()} className='flex items-center'>
                <RiFilter2Fill className='mr-2'/> Reset Filter
              </Button>
            </div>
          }
        </div>
      </CustomModal>
      {/* end modal calendar and location */}

    </div>
  )
}

export default BookingPage