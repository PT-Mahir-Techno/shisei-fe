'use client'

import { Button } from '@/components/ui/button'
import CustomSheets from '@/components/ui/custom-sheets'
import React, { useContext, useState } from 'react'
import { RiAddCircleFill, RiClipboardFill } from 'react-icons/ri'
import { useSheet } from '@/store/use-sheet'
import { useModal } from '@/store/use-modal'
import { baseUrl } from '@/lib/variable'
import { CUstomDataTable } from '@/components/ui/custom-data-table'
import { columns } from './_part/column'
import ExtendDayForm from './_part/form'
import CustomModal from '@/components/ui/custoom-dialog'
import LoadingIcons from 'react-loading-icons'
import toast from 'react-hot-toast'
import { AuthContex } from '@/providers/auth-provider'
import { CheckAvaibilityAction, transformToSelect } from '@/lib/utils'
import { useExtendDay } from '@/store/use-extend-day'
import Select from 'react-select';
import { useCustomer } from '@/store/use-customer'
import api from '@/lib/api'
import { Select as SelectSc, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { PaymentMethos } from '@/lib/variable'


const ExtendDayPage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const title = "Extend Day Package"
  const { isOpen, setIsOpen } = useSheet()
  const { extendDays, loading, getAllExtendDay, extendDayAttributes, deleteExtendDay, extendDayUrl, success, errorData } : any = useExtendDay()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId, isGenerate, setIsGenerate } = useModal()
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);
  const {customers, getAllCustomerNoPaginate} = useCustomer()
  const [loadingPackage, setLoadingPackage]   = useState<any>(false)
  const [userPackage, setUserPackage]         = useState<any>(null)
  const [selectedUserPackage, setSelectedUserPackage] = useState<any>('')
  const [packageOwned, setPackageOwned] = useState<any>([])
  const [user, setUser] = useState('')
  const [selectedUserPackageIndex, setSelectedUserPackageIndex] = useState(null)
  const [loadingGenerate, isLoadingGenerate] = useState(false)
  const [generatedLink, setGeneratedLink] = useState<any>(null)
  const [selectedPayment, setSelectedPayment] = React.useState<any>(null)

  React.useEffect(() => {
    getAllExtendDay(`${baseUrl}${prefix}/extend-day`)
  }, [prefix])

  const handleDelete = async () => {
    await deleteExtendDay(`${baseUrl}${prefix}/extend-day/${modalId}`)
    await getAllExtendDay(extendDayUrl)
    
    if (!success){
      toast.error(errorData.message)
    }else{
      toast.success('Location deleted successfully')
    }
    
    setIsOpenModal(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard')
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  }

  const getUserPackage = async (idUser:any) => {
    try {
      setLoadingPackage(true)
      setUserPackage([])
      setGeneratedLink(null)
      const res = await api.get(`${baseUrl}${prefix}/user-get-package/${idUser}?type=nopaginate`)
      setUserPackage(res.data) 
      setLoadingPackage(false)
    } catch (error) {
      setUserPackage([])
      setLoadingPackage(false)
    }
  }

  const handleGenerateLink = async () => {
    try {
      const url = `${baseUrl}${prefix}/extend-day/add-user/${user}`

      const payload = {
        extend_day_id : modalId,
        payment_method : selectedPayment,
        payment_id : selectedUserPackage.payment_id
      }

      const res:any = await api.post(url, payload)
      if (res){
        setGeneratedLink(res)
      }

      toast.success('Link generated successfully')
    } catch (error:any) {
      toast.error(error.data.message)      
    }
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
          <p className="text-gray-500 dark:text-gray-100 text-sm">List of all {title}</p>
        </div>
        {
          CheckAvaibilityAction(permision, 'create', 'validityperoid', role) && prefix &&
          <div>
            <Button onClick={() => setIsOpen(true)}> <RiAddCircleFill className="mr-2"/> Add {title}</Button>
          </div>
        }
      </div>
      
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={extendDays} 
          loading={loading} 
          dataPage={extendDayAttributes.to}
          dataTotal={extendDayAttributes.total}
          totalPages={extendDayAttributes.last_page}
          links= {extendDayAttributes.links}
          nextPage={getAllExtendDay}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title="Add Validity ExtendDay" close={() => setIsOpen(false)}>
        <ExtendDayForm />
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
        open={isGenerate} 
        onOpenChange={() => setIsGenerate(false)} 
        title='Generate Link for private order'
      >
          <div>
            <div className='mb-4'>
              <label htmlFor="customer" className='mb-2 block text-gray-600 text-sm'>Please select customer</label>
              <Select
                onChange={(newValue, actionMeta) => {
                  setUser(newValue?.value)
                  getUserPackage(newValue?.value)
                }}
                options={transformToSelect(customers)}
                name='customer'
              />
            </div>

            <div className='mb-6'>
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

            <div className='flex flex-col gap-2 mb-6'>
              {
                loadingPackage ? <LoadingIcons.Oval stroke='#000000' strokeWidth={5} className="w-4 h-4 mr-3" /> :
                userPackage != null ?
                (
                  userPackage.length > 0 ?
                  userPackage.map((item:any, index:any) => (
                    <div onClick={() => {
                      setSelectedUserPackageIndex(index) 
                      setSelectedUserPackage(item)
                    }} key={index} className={`bg-primary/10 px-4 py-1 rounded-lg cursor-pointer ${selectedUserPackageIndex == index ? 'border border-primary' : ''}`}>
                      <p className='text-sm font-semibold text-gray-600'>{item?.package_name}</p>
                      <p className='text-xs'>remain {item?.credit_left} credit, expired on {item?.expired}</p>
                    </div>
                  ))
                  : <div className='text-sm text-red-500'>User Does't have package</div>
                ) : ''
                
              }
            </div>

           {
            generatedLink && (
              <div className='mb-4 p-4 bg-primary/20 rounded-lg'>
                <div>
                  <div className='text-xs font-semibold text-gray-600'>
                    share this link to customer
                  </div>
                  <div className='mb-2 text-sm'>
                    {generatedLink?.url}
                  </div>
                  <div onClick={() => copyToClipboard(generatedLink?.url)} className='flex items-center gap-1 cursor-pointer hover:text-primary'>
                    <RiClipboardFill/>
                    <div className='text-xs'>
                      copy to clipboard
                    </div>
                  </div>
                </div>
              </div>
            )
           }

            <div className='flex justify-end gap-4'>
              <Button onClick={() => setIsGenerate(false)} variant={"outline"}>Cancel</Button>
              <Button onClick={() => handleGenerateLink()}
                disabled={loadingGenerate}
              >
                {loadingGenerate &&
                  <LoadingIcons.Oval stroke='#fff' strokeWidth={5} className="w-4 h-4 mr-3" />
                }
                Generate Now
              </Button>
            </div>
          </div>
      </CustomModal>
    </>
  )
}

export default ExtendDayPage