'use client'

import { baseUrl } from '@/lib/variable'
import { AuthContex } from '@/providers/auth-provider'
import { useCustomer } from '@/store/use-customer'
import { useParams } from 'next/navigation'
import React from 'react'

const DetaileUserPage = () => {
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
    <div className='bg-background rounded-lg p-4'>
      {/* <div className='text-gray-500 mb-4'>
        Detail Customer
      </div> */}
      <div>
         <div>
            <div className='text-gray-700 mb-4 font-semibold'>
              basic Information
            </div>
            <div>
              <table className='w-1/2'>
                <tbody>
                  <tr className='py-3'>
                    <td className='text-gray-500 py-2'>nama</td>
                    <td>{customer?.name}</td>
                  </tr>
                  <tr className='py-3'>
                    <td className='text-gray-500 py-2'>Email</td>
                    <td>{customer?.email}</td>
                  </tr>
                  <tr className='py-3'>
                    <td className='text-gray-500 py-2'>Phone</td>
                    <td>{customer?.phone}</td>
                  </tr>
                  <tr className='py-3'>
                    <td className='text-gray-500 py-2'>Gender</td>
                    <td>{customer?.gender}</td>
                  </tr>
                  <tr className='py-3'>
                    <td className='text-gray-500 py-2'>Height</td>
                    <td>{customer?.tb} kg</td>
                  </tr>
                  <tr className='py-3'>
                    <td className='text-gray-500 py-2'>Weight</td>
                    <td>{customer?.bb} cm</td>
                  </tr>
                  <tr className='py-3'>
                    <td className='text-gray-500 py-2'>Complaint</td>
                    <td>{customer?.keluhan}</td>
                  </tr>
                  <tr className='py-3'>
                    <td className='text-gray-500 py-2'>Address</td>
                    <td>{customer?.address} </td>
                  </tr>
                  <tr className='py-3'>
                    <td className='text-gray-500 py-2'>Country</td>
                    <td>{customer?.country} </td>
                  </tr>
                </tbody>
              </table>
            </div>
         </div>
      </div>
    </div>
  )
}

export default DetaileUserPage