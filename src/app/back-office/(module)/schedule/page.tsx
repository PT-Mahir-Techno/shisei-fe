'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@/components/ui/calendar'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import ScheduleForm from './_parts/schedule_form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CustomModal from '@/components/ui/custoom-dialog';
import { useSchedule } from '@/store/use-schedule';
import { baseUrl } from '@/lib/variable';
import EventDetail from './_parts/event-detail';


const renderEventContent = (eventInfo:any) => {
  const content = eventInfo.event.title.split("|")
  return(
    <div key={eventInfo.event.id} className='bg-destructive border-none w-full h-full p-1 text-white rounded cursor-pointer'
      style={{backgroundColor: eventInfo.backgroundColor, borderColor: eventInfo.borderColor}}
    >
      {/* <span>{content[0]} | </span> */}
      <i>{content[1]}</i>
    </div>
  )
}

const SchedulePage = () => {
  const title = "Schedule"
  const calendarRef = useRef<any>(null);

  const [isShowDetail, setIsShowDetail] = useState(false)
  const [eventId, setEventId] = useState<string | undefined>()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isOpenSheet, setIsOpenSheet] = React.useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState<number | undefined>(new Date().getFullYear())
  const {getScheduleConverted, loading, convertedSchedule} = useSchedule()

  useEffect(() => {
    getScheduleConverted(`${baseUrl}/admin/schedule?type=nopaginate&month=${selectedMonth}`)
  },[])

  const handleNextClick = () => {
    if ( calendarRef.current != null){
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next(); // Navigate to the next date period
      setDate(calendarApi.getDate())

      //  compare selectedMonth with calendar api month if different set it 
      if (selectedMonth !== calendarApi.getDate().getMonth() + 1){
        getScheduleConverted(`${baseUrl}/admin/schedule?type=nopaginate&month=${calendarApi.getDate().getMonth() + 1}&year=${calendarApi.getDate().getFullYear()}`)
        setSelectedMonth(calendarApi.getDate().getMonth() + 1)
      }
    }
  };

  // Navigate to the previous date
  const handlePrevClick = () => {
    if ( calendarRef.current != null){
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev(); // Navigate to the previous date period
      setDate(calendarApi.getDate())

      console.log(calendarApi.getDate().getMonth() + 1, selectedMonth)
      
      //  compare selectedMonth with calendar api month if different set it
      if (selectedMonth !== calendarApi.getDate().getMonth() + 1){
        getScheduleConverted(`${baseUrl}/admin/schedule?type=nopaginate&month=${calendarApi.getDate().getMonth() + 1}&year=${calendarApi.getDate().getFullYear()}`)
        setSelectedMonth(calendarApi.getDate().getMonth() + 1)
      }
    }
  };

  const handleTodayClick = () => {
    if ( calendarRef.current != null){
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today(); // Navigate to the today date
      setDate(calendarApi.getDate())

      //  compare selectedMonth with calendar api month if different set it
      if (selectedMonth !== calendarApi.getDate().getMonth() + 1){
        setSelectedMonth(calendarApi.getDate().getMonth() + 1)
        getScheduleConverted(`${baseUrl}/admin/schedule?type=nopaginate&month=${calendarApi.getDate().getMonth() + 1} &year=${calendarApi.getDate().getFullYear()}`)
      }
    }
  }

  const handleOpenSheet = (param: Date) => {
    setIsOpenSheet(true)
    setSelectedDate(param)
  }

  const handleShowDetail = (id:string) => {
    setIsShowDetail(true)
    setEventId(id)
  }

  return (
    <>
    <div className='flex gap-6'>
      <div className='bg-background p-4 box-content rounded-md'>
        <div className='mb-6'>
          <Button onClick={() => setIsOpenSheet(true)} className='w-full'>Add Schedule</Button>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          onDayClick={(param) => handleOpenSheet(param)}
        />
        <div className='mt-5 mb-2 text-gray-600'>Filter By Staff</div>
        <div className='h-80 overflow-auto'>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="--select one --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">all staff</SelectItem>
              <SelectItem value={'1'}>{"Joko"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex-1 h-[80vh] bg-background p-4 box-content rounded-md'>
      <FullCalendar
            ref={calendarRef}
            timeZone='ID/Jakarta'
            plugins={[ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            height={"100%"}
            headerToolbar={{
              left: 'prev,next,today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            events={convertedSchedule}
            eventContent={renderEventContent}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false, // Use 24-hour format
            }}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false, // Use 24-hour format for events
            }}
            eventClick={eventInfo => handleShowDetail(eventInfo.event.id)}
            dateClick={eventInfo => handleOpenSheet(eventInfo.date)}
            customButtons={{ 
              next: {
                text: 'Next',
                click: handleNextClick
              },
              prev: {
                text: 'Prev',
                click: handlePrevClick
              },
              today: {
                text: 'Today',
                click: handleTodayClick
              }
            }}
            loading={(isLoading)=>{
              console.log('isLoading')
            }}
          />
      </div>
    </div>

      <CustomModal open={isOpenSheet} title={`Add ${title}`} onOpenChange={() => setIsOpenSheet(false)} 
        size='md:max-w-5xl'  
      >
        <ScheduleForm date={selectedDate} close={() => setIsOpenSheet(false)} />
      </CustomModal>

      <CustomModal open={isShowDetail} title={`Detail ${title}`} onOpenChange={() => setIsShowDetail(false)}
        size='md:max-w-5xl'
      >
        <EventDetail id={eventId} close={() => setIsShowDetail(false)} />
      </CustomModal>
    </>
  )
}

export default SchedulePage