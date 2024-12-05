'use client'

import { Button } from '@/components/ui/button'
import CustomSheets from '@/components/ui/custom-sheets'
import { Input } from '@/components/ui/input'
import {  SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@radix-ui/react-label'
import React, { useContext, useEffect, useState } from 'react'
import { RiAddCircleFill, RiClipboardFill, RiShoppingBag2Fill } from 'react-icons/ri'
import { useLocation } from '@/store/use-location'
import { useSheet } from '@/store/use-sheet'
import { useModal } from '@/store/use-modal'
import { appUrl, baseUrl } from '@/lib/variable'
import { usePackage } from '@/store/use-package'
import { CUstomDataTable } from '@/components/ui/custom-data-table'
import { columns } from './_part/column'
import PackageForm from './_part/form'
import LoadingIcons from 'react-loading-icons'
import CustomModal from '@/components/ui/custoom-dialog'
import toast from 'react-hot-toast'
import { AuthContex } from '@/providers/auth-provider'
import { CheckAvaibilityAction, transformToSelect } from '@/lib/utils'
import { useCustomer } from '@/store/use-customer'
import api from '@/lib/api'
import Link from 'next/link'
import Select from 'react-select';


const PackagePage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState

  const title = "Package"
  const { isOpen, setIsOpen } = useSheet()
  const { packages, loading, getAllPackage, packageAttributes, deletePackage, packageUrl, success, errorData } : any = usePackage()
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);
  const {customers, getAllCustomerNoPaginate} = useCustomer()
  const { setIsOpen: setIsOpenModal, isOpen: isOpenModal, modalId , isGenerate, setIsGenerate} = useModal()
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false)
  const [generated, setGenerated] = useState<any>(null)

  React.useEffect(() => {
    getAllPackage(`${baseUrl}${prefix}/membership`)
    getAllCustomerNoPaginate(`${baseUrl}${prefix}/user?type=nopaginate`)
  }, [])

  const handleDelete = async () => {
    await deletePackage(`${baseUrl}${prefix}/membership/${modalId}`)
    await getAllPackage(packageUrl)

    if (!success){
      toast.error(errorData.message)
    }else{
      toast.success('Customer deleted successfully')
    }

    setIsOpenModal(false)
  }

  const handlePrivateOrder = async () => {
    if (!selectedOption){
      toast.error('Please select user')
    }
    setGenerated(null)
    try {
      setIsLoadingGenerate(true)
      const payload = {
        'membership_id': modalId,
        'user_id' : selectedOption?.value
      }

      const res:any = await api.post(`${baseUrl}${prefix}/membership/generate-link`, payload)

      setGenerated(res.link)
      console.log(res.link)

      setIsLoadingGenerate(false)
    } catch (error:any) {
      setIsLoadingGenerate(false)
      toast.error(error.data.message)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard')
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div >
          <h2 className="font-noto_serif font-bold text-2xl text-gray-800 dark:text-gray-100">Package</h2>
          <p className="text-gray-500 dark:text-gray-100 text-sm">List Package</p>
        </div>
        <div className='flex items-center gap-2'>
          {
            CheckAvaibilityAction(permision, 'create', 'package', role) && prefix &&
            <div>
              <Button onClick={() => setIsOpen(true)}> <RiAddCircleFill className="mr-2"/> Add Package</Button>
            </div>
          }
          <div>
            <Link href={"/back-office/booking/package/create-order"}>
              <Button> <RiShoppingBag2Fill className="mr-2"/> Create Order</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="w-full bg-background px-6 py-4 rounded-lg my-8">
        <CUstomDataTable
          columns={columns} 
          data={packages} 
          loading={loading} 
          dataPage={packageAttributes.to}
          dataTotal={packageAttributes.total}
          totalPages={packageAttributes.last_page}
          links= {packageAttributes.links}
          nextPage={getAllPackage}
        />
      </div>
        
      <CustomSheets isOpen={isOpen} title="Add Package" close={() => setIsOpen(false)}>
        <PackageForm/>
      </CustomSheets>



      <CustomModal
        open={isGenerate} 
        onOpenChange={() => {
          setIsGenerate(false)
          setGenerated(null)
        }} 
        title='Generate Link for private order'
      >
          <div>
            <div className='mb-4'>
              <label htmlFor="customer" className='mb-2 block text-gray-600 text-sm'>Please select customer</label>
              <Select
                onChange={(newValue, actionMeta) => setSelectedOption(newValue as unknown as { value: string; label: string } | null)}
                options={transformToSelect(customers)}
                name='customer'
              />
            </div>

            {
              isLoadingGenerate ? (
                <div className='mb-4 p-4 bg-primary/20 rounded-lg'>
                  <div className='flex items-center gap-2'>
                    <LoadingIcons.Oval stroke='#000000' strokeWidth={5} className="w-4 h-4 mr-3" />
                    <div className='text-sm'>Generating link...</div>
                  </div>
                </div>
              ):
              generated && (
                <div className='mb-4 p-4 bg-primary/20 rounded-lg'>
                  <div>
                    <div className='text-xs font-semibold text-gray-600'>
                      share this link to customer
                    </div>
                    <div className='mb-2 text-sm'>
                      {`${appUrl}package/show/${generated}`}
                    </div>
                    <div onClick={() => copyToClipboard(`${appUrl}package/show/${generated}`)} className='flex items-center gap-1 cursor-pointer hover:text-primary'>
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
              <Button onClick={() => {
                setIsGenerate(false)
                setGenerated(null)
              }} variant={"outline"}>Cancel</Button>
              <Button onClick={() => handlePrivateOrder()}
                disabled={loading}
              >
                {loading &&
                  <LoadingIcons.Oval stroke='#fff' strokeWidth={5} className="w-4 h-4 mr-3" />
                }
                Generate Now
              </Button>
            </div>
          </div>
      </CustomModal>

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

export default PackagePage