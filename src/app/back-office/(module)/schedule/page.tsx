'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Calendar } from '@/components/ui/calendar'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import CustomSheets from '@/components/ui/custom-sheets'
import ScheduleForm from './_parts/schedule_form'

const SchedulePage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isOpenSheet, setIsOpenSheet] = React.useState(false)
  const title = "Instructor"

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
        />
      </div>
      <div className='flex-1 h-[80vh] bg-background p-4 box-content rounded-md'>
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          height={"100%"}
        />
      </div>
    </div>

      <CustomSheets isOpen={isOpenSheet} title={`Add ${title}`} close={() => setIsOpenSheet(false)}>
        <ScheduleForm/>
      </CustomSheets>
    </>
  )
}

export default SchedulePage