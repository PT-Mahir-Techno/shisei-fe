'use client'

import { Button } from '@/components/ui/button'
import { CUstomDataTable } from '@/components/ui/custom-data-table'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useModal } from '@/store/use-modal'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { columns } from '../_parts/columns'
import CustomModal from '@/components/ui/custoom-dialog'
import LoadingIcons from 'react-loading-icons'
import { redemtionColumn } from '../_parts/redemtion-column'
import { useRedemtion } from '@/store/use-redemtion'

const title = "Redemtion"

const RedemtionPage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const { loading, getAllRedemtion, redemtions, redemtionAttributes } = useRedemtion()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId } = useModal()

  useEffect(() => {
    getAllRedemtion(`${baseUrl}/admin/coupon/reedem`)
  }, [prefix])



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
            <CUstomDataTable
              columns={redemtionColumn} 
              data={redemtions} 
              loading={loading} 
              dataPage={redemtionAttributes?.to}
              dataTotal={redemtionAttributes?.total}
              totalPages={redemtionAttributes?.last_page}
              links= {redemtionAttributes?.links}
              nextPage={getAllRedemtion}
            />
          </div>
        </div>
    </>
  )
}

export default RedemtionPage