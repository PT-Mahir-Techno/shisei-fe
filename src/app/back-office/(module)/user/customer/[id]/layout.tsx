"use client"

import * as React from "react"
import { useCustomer } from "@/store/use-customer"
import { baseUrl } from "@/lib/variable"
import { AuthContex } from "@/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { RiArrowLeftLine, RiMailFill } from "react-icons/ri"
import Link from "next/link"
import Image from "next/image"
import { useParams, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { FiBox, FiCalendar, FiClipboard, FiDatabase, FiTable, FiUser } from "react-icons/fi";

const CustomerPage = ({children}: {children: React.ReactNode}) => {
  const {authState} = React.useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const title = "Detail Customer"
  const { getAllCustomer, getSingleCustomer, customer } : any = useCustomer()

  const params = useParams()
  const {id}   = params

  React.useEffect(() => {
    getAllCustomer(`${baseUrl}${prefix}/user`)
  }, [prefix, role])


  React.useEffect(() => {
    getSingleCustomer(`${baseUrl}${prefix}/user/${id}`)
  }, [id, prefix])

  return (
    <>
      <div className="mb-3 flex items-center justify-end">
        <Link href="/back-office/user/customer">
          <Button>
            <RiArrowLeftLine/>
            Back
          </Button>
        </Link>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <Image src={customer?.photo_url ?? "https://via.placeholder.com/350x350"} alt="Image" width={100} height={100} className="rounded-full object-cover w-20 h-20" />
          <div>
            <div className="flex items-center gap-1">
              <div className="text-xl font-semibold">{customer?.name}</div>
              <Badge className="bg-amber-500">Active</Badge>
            </div>
            <div className="text-gray-500 flex items-center"><RiMailFill className="mr-2"/> {customer?.email}</div>
          </div>
        </div>
        <div>
          <div className="my-4 py-4 flex items-center gap-10 bg-white border-gray-200 rounded-lg px-4 mb-6">
            <Link href={`/back-office/user/customer/${id}`}>
              <div className="font-semibold text-gray-500 hover:text-primary cursor-pointer flex items-center gap-2">
                <FiUser className="text-xl"/> Detail Customer
              </div>
            </Link>

            <Link href={`/back-office/user/customer/${id}/class`}>
              <div className="font-semibold text-gray-500 hover:text-primary cursor-pointer flex items-center gap-2">
              <FiCalendar className="text-xl"/> Class
              </div>
            </Link>

            <Link href={`/back-office/user/customer/${id}/package`}>
              <div className="font-semibold text-gray-500 hover:text-primary cursor-pointer flex items-center gap-2">
                <FiBox className="text-xl"/> Package
              </div>
            </Link>

            <Link href={`/back-office/user/customer/${id}/order`}>
              <div className="font-semibold text-gray-500 hover:text-primary cursor-pointer flex items-center gap-2">
                <FiTable className="text-xl"/> Orders
              </div>
            </Link>

            <Link href={`/back-office/user/customer/${id}/note`}>
              <div className="font-semibold text-gray-500 hover:text-primary cursor-pointer flex items-center gap-2">
              <FiClipboard className="text-xl"/> Note
              </div>
            </Link>

            <Link href={`/back-office/user/customer/${id}/note-category`}>
              <div className="font-semibold text-gray-500 hover:text-primary cursor-pointer flex items-center gap-2">
              <FiDatabase className="text-xl"/> Note Category
              </div>
            </Link>
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerPage
