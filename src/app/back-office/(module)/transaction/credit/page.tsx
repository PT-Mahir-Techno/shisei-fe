"use client"

import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {columns} from './_parts/column'
import { CUstomDataTable } from "@/components/ui/custom-data-table"
import { baseUrl } from "@/lib/variable"
import { useModal } from "@/store/use-modal"
import LoadingIcons from "react-loading-icons"
import toast from "react-hot-toast"
import api from "@/lib/api"
import { Popover } from "@radix-ui/react-popover"
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { usePackageHistory } from "@/store/use-history-package"
import { AuthContex } from "@/providers/auth-provider"


const CreditTransactionpage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix}   = authState

  const { packageHistorys, packageHistoryAttributes, loading, packageHistoryUrl, getAllPackageHistory } : any = usePackageHistory()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()
  const [date, setDate] = useState<DateRange | undefined>()

  useEffect(() => {
    if (prefix){
      init()
    }
  }, [prefix])
  
  const init = async() => {
    await getAllPackageHistory(`${baseUrl}${prefix}/history-membership`)
  }

  useEffect(() => {
    if (date?.from != undefined && date?.to != undefined) {
      getAllPackageHistory(`${baseUrl}${prefix}/history-membership?start_date=${format(date.from, 'yyyy-MM-dd')}&end_date=${format(date.to, 'yyyy-MM-dd')}`)
     }
 }, [date])

  const handleDelete = async () => {
    // await deleteLocation(`${baseUrl}/admin/packageHistory/${modalId}`)
    // await getAllLocation(packageHistoryUrl)
    toast.success('Location deleted successfully')
    setIsOpenModal(false)
  }

  const handleUpdateTrx  = async() => {
    try {
      await api.put(`${baseUrl}${prefix}/calendar/cancel-booking/${modalId}`)
      await getAllPackageHistory(packageHistoryUrl)
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
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800">Credit Transaction</h2>
          <p className="text-gray-500 text-sm">List Credit transaction</p>
        </div>
      </div>
      
      {/* <RoomTable /> */}
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={packageHistorys} 
          loading={loading} 
          dataPage={packageHistoryAttributes.to}
          dataTotal={packageHistoryAttributes.total}
          totalPages={packageHistoryAttributes.last_page}
          links= {packageHistoryAttributes.links}
          nextPage={getAllPackageHistory}
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
    </>
  )
}

export default CreditTransactionpage
