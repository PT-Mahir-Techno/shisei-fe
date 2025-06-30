'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import api from '@/lib/api'
import { numberToIdr, transformToSelect } from '@/lib/utils'
import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useCorporate } from '@/store/use-corporate'
import { useCustomer } from '@/store/use-customer'
import { usePackage } from '@/store/use-package'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { use, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { PiUsbFill } from 'react-icons/pi'
import { RiArrowLeftLine } from 'react-icons/ri'
import LoadingIcons from 'react-loading-icons'
import Select from 'react-select';


const AddMemberCorporatePage = () => {
  const {authState} = useContext(AuthContex)
  const {_prefix:prefix, _permision:permision, _avaibility:role}   = authState
  const [corporate, setCorporate] = React.useState<any>({})

  const {customers, getAllCustomerNoPaginate} = useCustomer()
  const {getSingleCorporate} = useCorporate()
  const [users, setUsers] = React.useState<any>([])
  const [loadingData, setLoadingData] = React.useState<boolean>(false)

  const {id} = useParams()
  const router = useRouter()

  useEffect(() => {
    getAllCustomerNoPaginate(`${baseUrl}${prefix}/user?type=nopaginate`)
  }, [baseUrl, prefix])

  useEffect(() => {
    if (id){
      getCorporateSingle(id)
    } 
  }, [id])

  const getCorporateSingle = async (id:any) => {
    try {
      const res = await getSingleCorporate(`${baseUrl}${prefix}/corporate/${id}`)
      setCorporate(res)
    } catch (error:any) {
      toast.error(error.data.message)
    }
  }


  const handleCreateOrder = async () => {
    try {
      setLoadingData(true)
      const userId = users.map((user:any) => user.value)
      const payload = {
        user_id : userId,
      }
      const res = await api.post(`${baseUrl}${prefix}/corporate/${id}/add-member`, payload)
      toast.success('Add member successfully')
      
      router.push('/back-office/corporate')
      
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
            <Link href={"/back-office/corporate"}>
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

        <div>
          <Button className='w-full' onClick={() => handleCreateOrder()}
            disabled={loadingData}
          >
              {
                loadingData && <LoadingIcons.Oval strokeWidth={4} className="w-4 h-4 mr-2 animate-spin" />
              }
            Add Participants
          </Button>
        </div>
      </div>
    </>
  )
}

export default AddMemberCorporatePage