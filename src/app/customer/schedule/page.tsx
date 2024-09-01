'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { RiArrowDropDownLine, RiCalendarScheduleFill, RiHistoryFill} from 'react-icons/ri'
import ScheduleCard from './_part/schedule-card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import ScheduleHistoryCard from './_part/schedule-history'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

type Checked = DropdownMenuCheckboxItemProps["checked"]
const SchedduleCustomerPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)

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
              Array.from({ length: 2 }).map((_, index) => <ScheduleCard key={index}/>)
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
          <DropdownMenu>
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
          </DropdownMenu>
        </div>
          
        {
          Array.from({ length: 2 }).map((_, index) => <ScheduleHistoryCard key={index}/>)
        }

        <Pagination className='flex justify-start mt-12'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </>
  )
}

export default SchedduleCustomerPage