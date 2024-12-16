'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import api from '@/lib/api'
import { numberToIdr, transformToSelect } from '@/lib/utils'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useCustomer } from '@/store/use-customer'
import { usePackage } from '@/store/use-package'
import Link from 'next/link'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { RiArrowLeftLine } from 'react-icons/ri'
import LoadingIcons from 'react-loading-icons'
import Select from 'react-select';
import { Select as SelectSc, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { PaymentMethos } from '@/lib/variable'



const CreateOrderPackagePage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const { packages, loading, getAllPackageNoPaginate, packageAttributes, deletePackage, packageUrl, success, errorData } : any = usePackage()
  const {customers, getAllCustomerNoPaginate} = useCustomer()
  const [selectedPackage, setSelectedPackage] = React.useState<any>(null)
  const [users, setUsers] = React.useState<any>([])
  const [loadingData, setLoadingData] = React.useState<boolean>(false)
  const [selectedPayment, setSelectedPayment] = React.useState<any>(null)

  React.useEffect(() => {
    getAllPackageNoPaginate(`${baseUrl}${prefix}/membership?type=nopaginate`)
    getAllCustomerNoPaginate(`${baseUrl}${prefix}/user?type=nopaginate`)
  }, [baseUrl, prefix])

  const handleSelectPackage = (selectedPkg:any) => {
    setSelectedPackage(selectedPkg)
  }

  const handleCreateOrder = async () => {
    if (!selectedPackage || !selectedPayment) {
      toast.error('Please select package and payment method')
    }
    try {
      setLoadingData(true)
      const userId = users.map((user:any) => user.value)
      const payload = {
        user_id : userId,
        payment_method : selectedPayment
      }
      const res = await api.post(`${baseUrl}${prefix}/membership/${selectedPackage.id}/add-user`, payload)
      setSelectedPackage(null)
      toast.success('Order created successfully')
      setLoadingData(false)
    } catch (error:any) {
      setLoadingData(false)
      toast.error(error.data.message)
    }
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-100">Package</h2>
          <p className="text-gray-500 dark:text-gray-100 text-sm">Create Order Package</p>
        </div>
        <div className='flex items-center gap-2'>
          <div>
            <Link href={"/back-office/booking/package"}>
              <Button> <RiArrowLeftLine className="mr-2"/> Back</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className='bg-background p-4 rounded-lg mb-4'>
        <div className='mb-1 text-sm text-gray-500'>
          Select customer
        </div>
        
        <div className='flex gap-3 items-center mb-4'>
          <div className='w-full'>
            <Select
              onChange={(newValue, actionMeta) => setUsers(newValue)}
              options={transformToSelect(customers)}
              name='customer'
              isMulti
            />
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="payment" className='mb-2 block text-gray-600 text-sm'>Please select payment method</label>
          <SelectSc onValueChange={(val) => setSelectedPayment(val)} value={selectedPayment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="select payment method" />
            </SelectTrigger>
            <SelectContent>
              {
                PaymentMethos.map((item:any, index:any) => (
                  <SelectItem key={index} value={item.name}>
                    <div className='flex items-center gap-4'>
                      <Image alt={item.icon} src={item.icon} width={30} height={0} />
                      <p>{item.title}</p>
                    </div>
                  </SelectItem>
                ))
              }
            </SelectContent>
          </SelectSc>
        </div>

        <div>
          <Button className='w-full' onClick={() => handleCreateOrder()}
            disabled={loadingData}
          >
              {
                loadingData && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
              }
            Create Order
          </Button>
        </div>
        
        {
          selectedPackage &&
          <div className='mt-2 clear-start bg-primary/10 p-3 rounded-lg inline-block'>
            <small><i>package Selected :</i></small>
            <p className='text-gray-600 font-semibold'>{selectedPackage.name}</p>
            <div className='flex gap-2'>
                <p className='text-gray-700 text-sm '>categoty</p>
                <p className='text-gray-700 text-sm '>: {selectedPackage?.category?.name ?? "uncategorized"}</p>
            </div>
            <div className='flex items-center gap-3'>
              <div className='flex gap-2'>
                  <p className='text-gray-700 text-sm '>total credit</p>
                  <p className='text-gray-700 text-sm '>: {selectedPackage.credit} credits</p>
              </div>
              <div className='flex gap-2'>
                  <p className='text-gray-700 text-sm '>Price</p>
                  <p className='text-gray-700 text-sm font-semibold'>: {numberToIdr(selectedPackage.price)}</p>
              </div>
            </div>
          </div>
        }
      </div>

      <div className='bg-background p-4 rounded-lg mb-4'>
        <div className='mb-4 text-sm text-gray-700 font-semibold'>
          Select package
        </div>
        <div className='grid md:grid-cols-4 gap-6'>

          {
            packages.length > 0 && packages.map((pkg:any, index:number) => (

              <div onClick={() => handleSelectPackage(pkg)} key={index} className={`bg-primary/10 p-4 rounded-lg cursor-pointer${pkg.id == selectedPackage?.id ? 'border border-primary' : ''}`}>
                <div className='flex justify-between items-center'>
                  <p className='font-semibold text-gray-700 mb-2'>{pkg.name}</p>
                </div>
                <div className='flex gap-2'>
                    <p className='text-gray-700 text-sm '>category</p>
                    <p className='text-gray-700 text-sm '>: {pkg?.category?.name ?? 'uncategorized'}</p>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex gap-2'>
                      <p className='text-gray-700 text-sm '>total credit</p>
                      <p className='text-gray-700 text-sm '>: {pkg?.credit} credits</p>
                  </div>
                  <div className='flex gap-2'>
                      <p className='text-gray-700 text-sm '>Price</p>
                      <p className='text-gray-700 text-sm font-semibold'>: {numberToIdr(pkg?.price)}</p>
                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </div>

    </>
  )
}

export default CreateOrderPackagePage