'use client'

import { Button } from '@/components/ui/button'
import { CUstomDataTable } from '@/components/ui/custom-data-table'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useCoupon } from '@/store/use-coupon'
import { useModal } from '@/store/use-modal'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { columns } from '../_parts/columns'
import CustomModal from '@/components/ui/custoom-dialog'
import LoadingIcons from 'react-loading-icons'

const title = "Statistic"

const StatisticPage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const { loading, getAllCoupon, deleteCoupon, couponUrl, getSingleCoupon, coupons, couponAttributes } = useCoupon()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()

  useEffect(() => {
    getAllCoupon(`${baseUrl}/admin/coupon`)
  }, [prefix])


  const handleDelete = async () => {
    try {
      await deleteCoupon(`${baseUrl}/admin/coupon/${modalId}`)
      await getAllCoupon(couponUrl)
      toast.success('Corporate deleted successfully')
      setIsOpenModal(false)
    } catch (error:any) {
      setIsOpenModal(false)
      toast.error(error.data.message)
    }
  }

  return (
    <>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-noto_serif font-bold text-2xl text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-500 text-sm">List of all {title} </p>
          </div>
        </div>

        <div>
          <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
  
          </div>
        </div>
    </>
  )
}

export default StatisticPage