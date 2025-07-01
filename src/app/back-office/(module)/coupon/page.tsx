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
import { columns } from './_parts/columns'
import CustomModal from '@/components/ui/custoom-dialog'
import LoadingIcons from 'react-loading-icons'

const title = "Coupon"

const CouponPage = () => {
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
          <div>
            <Link href={`/back-office/coupon/create`}>
              <Button className="bg-primary text-white">Add {title}</Button>
            </Link>
          </div>
        </div>

        <div>
          <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
            <CUstomDataTable
              columns={columns} 
              data={coupons} 
              loading={loading} 
              dataPage={couponAttributes?.to}
              dataTotal={couponAttributes?.total}
              totalPages={couponAttributes?.last_page}
              links= {couponAttributes?.links}
              nextPage={getAllCoupon}
            />
          </div>
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

export default CouponPage