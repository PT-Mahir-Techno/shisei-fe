"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RiAddCircleFill, RiFile2Fill } from "react-icons/ri"
import CustomSheets from "@/components/ui/custom-sheets"
import {columns} from './_parts/column'
import { CUstomDataTable } from "@/components/ui/custom-data-table"
import { useSheet } from "@/store/use-sheet"
import { baseUrl } from "@/lib/variable"
import CustomModal from "@/components/ui/custoom-dialog"
import { useModal } from "@/store/use-modal"
import LoadingIcons from "react-loading-icons"
import toast from "react-hot-toast"
import { usePayment } from "@/store/use-payment"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

const title = 'Package Transaction'

const TransactionPackagePage = () => {
  const { isOpen, setIsOpen } = useSheet()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()
  const {payments, paymentAttributes, paymentUrl, getAllPayment, loading} = usePayment()
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
  
  useEffect(() => {
    getAllPayment(`${baseUrl}/admin/payment`)
  }, [])

  const handleDelete = async () => {
    toast.success('Location deleted successfully')
    setIsOpenModal(false)
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-500 text-sm">List of all {title} </p>
        </div>
      </div>
      
      {/* <RoomTable /> */}
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={payments} 
          loading={loading} 
          dataPage={paymentAttributes.to}
          dataTotal={paymentAttributes.total}
          totalPages={paymentAttributes.last_page}
          links= {paymentAttributes.links}
          nextPage={getAllPayment}
        >
          <div className="flex justify-end gap-6 mb-6">
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
                <PopoverContent className="w-auto p-0" align="start">
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
              <Button> <RiFile2Fill className="mr-2"/> Export Excel</Button>
            </div>
          </div>
        </CUstomDataTable>
      </div>

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
    </>
  )
}

export default TransactionPackagePage
