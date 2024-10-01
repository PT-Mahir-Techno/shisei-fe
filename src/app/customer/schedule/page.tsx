'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { RiArrowDropDownLine, RiCalendarScheduleFill, RiHistoryFill} from 'react-icons/ri'
import ScheduleCard from './_part/schedule-card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import ScheduleHistoryCard from './_part/schedule-history'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { baseUrl } from '@/lib/variable'
import { format } from 'date-fns'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

type Checked = DropdownMenuCheckboxItemProps["checked"]
const SchedduleCustomerPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)

  const [schedules, setSchedules] = React.useState([])
  const [historySchedules, setHistorySchedules] = React.useState<any>([])
  const [historyAttributes, setHistoryAttributes] = React.useState<any>({})
  const [loadingSchedule, setLoadingSchedule] = React.useState(false)
  const [loadingHistory, setLoadingHistory] = React.useState(false)


  useEffect(() => {
    getSchedule()
    // getHistory()
  }, [date])

  useEffect(() => {
    getHistory()
  }, [])

  const getSchedule = async () => {
    setLoadingSchedule(true)
    try {
      if (date){
        var newDate = format(date!, 'yyyy-MM-dd')
      }else{
        var newDate = format(new Date(), 'yyyy-MM-dd')
      }
      const res = await api.get(`${baseUrl}/dashboard/schedule?type=nopaginate&date=${newDate}`)
      setSchedules(res.data)
      setLoadingSchedule(false)
    } catch (error:any) {
      setLoadingSchedule(false)
      toast.error(error.data.message)
    }
  }

  const getHistory = async (uri?:string) => {
    setLoadingHistory(true)
    try {

      if (uri){
        var url = `${uri}`
      }else{
        var url = `${baseUrl}/dashboard/schedule?menu=history`
      }

      const res = await api.get(`${url}`)
      setHistorySchedules(res.data.data)
      setHistoryAttributes(res.data)
      setLoadingHistory(false)
    } catch (error) {
      setLoadingHistory(false)
      console.error(error)
    }
  }

  return (
    <>
      <section className='bg-background p-5 rounded-lg mb-8'>
        <div className='flex gap-4 mb-6'>
          <RiCalendarScheduleFill className='text-primary' size={28} />
          <h2 className='font-noto_serif font-bold text-xl text-gray-800'>Your Schedule</h2>
        </div>
        <div className='flex flex-wrap gap-8'>
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mb-4"
            />
            <div className='flex gap-4 flex-wrap'>
              <div className='flex gap-2'>
                <div className='h-[23px] w-[23px] rounded-full bg-accent'></div>
                <p className='font-semibold text-accent-foreground'>Today</p>
              </div>
              <div className='flex gap-2'>
                <div className='h-[23px] w-[23px] rounded-full bg-primary'></div>
                <p className='font-semibold text-accent-foreground'>Your Selected Date</p>
              </div>
            </div>
          </div>
          <div className='flex-1'>

            {
              loadingSchedule ? (
                <div>
                  <div className='flex flex-col gap-3'>
                    <Skeleton className="w-1/2 h-6" />
                    <Skeleton className="w-1/2 h-4" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                  </div>
                </div>
              ) : (
                schedules.length <= 0 ? (
                  <div className='text-center flex justify-center items-center flex-col'>
                    <p className='text-gray-400 font-semibold'>No Schedule Yet</p>
                    <p className='text-gray-400 mb-4'> select your schedule date </p>
                    <Image src="/img/icon/cancel.png" width={100} height={100} alt="empty"/>
                  </div>
                )
                : schedules.map((item:any) => <ScheduleCard key={item.id} data={item} fetch={() =>getSchedule()} />)
              )
            }
          </div>
        </div>
      </section>
      
      <section className='bg-background p-4 rounded-lg mb-8'>
        <div className='flex justify-between items-center pb-3 border-b border-gray-200 mb-5'>
          <div className='flex gap-2 items-center'>
            <RiHistoryFill className='text-primary' size={26} />
            <h2 className='font-noto_serif font-bold text-xl text-gray-800'>History</h2>
          </div>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link">Sort By <RiArrowDropDownLine size={26}/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Latest
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
              >
                Olders
              </DropdownMenuCheckboxItem>

            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
          
        {
          loadingHistory ? (
            <div>
              <div className='flex flex-col gap-3'>
                <Skeleton className="w-1/2 h-6" />
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>
            </div>
          ) : (
            historySchedules.length <= 0 ? (
              <div className='text-center flex justify-center items-center flex-col'>
                <p className='text-gray-400 font-semibold'>No Schedule Yet</p>
                <p className='text-gray-400 mb-4'> select your schedule date </p>
                <Image src="/img/icon/cancel.png" width={100} height={100} alt="empty"/>
              </div>
            )
            : historySchedules.map((item:any, i:number) => <ScheduleHistoryCard key={i} data={item} />)
          )
        }
        {
          historyAttributes && (
            <Pagination className='flex justify-start mt-12'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => historyAttributes.prev_page_url && getHistory(historyAttributes.prev_page_url) }/>
                </PaginationItem>
      
                  <PaginationLink href="#" className='mx-6'>
                    Total {historyAttributes.total} data
                  </PaginationLink>
      
                <PaginationItem>
                  <PaginationNext onClick={() => historyAttributes.next_page_url && getHistory(historyAttributes.next_page_url) } />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )
        }
      </section>
    </>
  )
}

export default SchedduleCustomerPage