"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RiFile2Fill } from "react-icons/ri"
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
import api from "@/lib/api"

const title = 'Package Transaction'

const TransactionPage = () => {
  const { isOpen, setIsOpen, modelId } = useSheet()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()
  const {payments, paymentAttributes, paymentUrl, getAllPayment, loading} = usePayment()
  const [loadingExport, setLoadingExport] = useState(false) 
  const [date, setDate] = useState<DateRange | undefined>()

  // date now

  const init = () => {
    getAllPayment(`${baseUrl}/dashboard/history-payment`)
  }
  
  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
     if (date?.from != undefined && date?.to != undefined) {
        getAllPayment(`${baseUrl}/dashboard/history-payment`)
      }
  }, [date])


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
        />
      </div>

    </>
  )
}

export default TransactionPage
