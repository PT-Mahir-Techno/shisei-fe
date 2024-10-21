"use client"

import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import CustomSheets from "@/components/ui/custom-sheets"
import {columns} from './_parts/column'
import { CUstomDataTable } from "@/components/ui/custom-data-table"
import { useSheet } from "@/store/use-sheet"
import { baseUrl } from "@/lib/variable"
import CustomModal from "@/components/ui/custoom-dialog"
import { useModal } from "@/store/use-modal"
import LoadingIcons from "react-loading-icons"
import toast from "react-hot-toast"
import { useSchedule } from "@/store/use-schedule"
import api from "@/lib/api"
import { Popover } from "@radix-ui/react-popover"
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { AuthContex } from "@/providers/auth-provider"


const ScheduleTransactionpage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const { isOpen, setIsOpen } = useSheet()
  const { schedules, scheduleAttributes, loading, scheduleUrl, getAllSchedule } : any = useSchedule()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()
  const [date, setDate] = useState<DateRange | undefined>()

  useEffect(() => {
    init()
  }, [prefix])
  
  const init = async() => {
    await getAllSchedule(`${baseUrl}${prefix}/calendar`)
  }

  useEffect(() => {
    if (date?.from != undefined && date?.to != undefined) {
      getAllSchedule(`${baseUrl}${prefix}/calendar?start_date=${format(date.from, 'yyyy-MM-dd')}&end_date=${format(date.to, 'yyyy-MM-dd')}`)
     }
 }, [date])

  const handleDelete = async () => {
    // await deleteLocation(`${baseUrl}/admin/schedule/${modalId}`)
    // await getAllLocation(scheduleUrl)
    toast.success('Location deleted successfully')
    setIsOpenModal(false)
  }

  const handleUpdateTrx  = async() => {
    try {
      await api.put(`${baseUrl}${prefix}/calendar/cancel-booking/${modalId}`)
      await getAllSchedule(scheduleUrl)
      toast.success('Transaction Updated')
      setIsOpenModal(false)
      toast.success('Transaction Updated')
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">Schedule Transaction</h2>
          <p className="text-gray-500 text-sm">List Schedule transaction</p>
        </div>
      </div>
      
      {/* <RoomTable /> */}
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={schedules} 
          loading={loading} 
          dataPage={scheduleAttributes.to}
          dataTotal={scheduleAttributes.total}
          totalPages={scheduleAttributes.last_page}
          links= {scheduleAttributes.links}
          nextPage={getAllSchedule}
        >
          <div className="flex justify-end gap-2 mb-6">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Button onClick={() => init()} variant={"outline"}>Reset Filter</Button>
            </div>
          </div>
        </CUstomDataTable>
      </div>
        
      <CustomSheets isOpen={isOpen} title="Add Location" close={() => setIsOpen(false)}>
        <div></div>
      </CustomSheets>

      <CustomModal
        open={isOpenModal} 
        onOpenChange={() => setIsOpenModal(false)} 
        title='Delete Data'
      >
          <div>
            <p className='text-gray-700 my-6 text-center'>
              Are you sure you want to delete this data?
              <br />
              <b>This action cannot be undone</b>
            </p>
            <div className='flex justify-end gap-4'>
              <Button onClick={() => setIsOpenModal(false)} variant={"outline"}>Cancel</Button>
              <Button onClick={() => handleDelete()}
                disabled={loading}
              >
                {loading &&
                  <LoadingIcons.Oval stroke='#fff' strokeWidth={5} className="w-4 h-4 mr-3" />
                }
                delete
              </Button>
            </div>
          </div>
      </CustomModal>

      <CustomModal
        open={isOpenModal} 
        onOpenChange={() => setIsOpenModal(false)} 
        title='Update Transaction'
      >
          <div>
            <p className='text-gray-700 my-6 text-center'>
              Are you sure you want to update this transaction?
              <br />
              <b>This action cannot be undone</b>
            </p>
            <div className='flex justify-end gap-4'>
              <Button onClick={() => setIsOpenModal(false)} variant={"outline"}>Cancel</Button>
              <Button onClick={() => handleUpdateTrx()}
                disabled={loading}
              >
                {loading &&
                  <LoadingIcons.Oval stroke='#fff' strokeWidth={5} className="w-4 h-4 mr-3" />
                }
                Cancel Booking
              </Button>
            </div>
          </div>
      </CustomModal>
    </>
  )
}

export default ScheduleTransactionpage
