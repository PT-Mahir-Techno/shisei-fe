'use client'

import { Button } from '@/components/ui/button'
import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { RiMailOpenFill } from 'react-icons/ri'
import Cookies from 'js-cookie';
import LoadingIcons from 'react-loading-icons'
import LoadingState from '@/components/ui/loading-state'

const VerifyPage = () => {
  const [loading, setLoading] = React.useState(false)
  const router       = useRouter()
  const param = useParams()
  const {token}        = param

 useEffect(() => {
  const AuthToken = Cookies.get('_auth')
  if (AuthToken){
    if (token){
      verivyEmail()
    }
  }else{
    toast.error("Invalid Login")
    router.replace('/')
  }
 },[])

  const verivyEmail = async () => {
    try {
      setLoading(true)
       await api.get(`${baseUrl}/verify-email/${token}`)
      router.replace('/verify')
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      if (error.response){
        toast.error(error.response.message)
      }else{
        toast.error(error.message)
      }
    }
  }

  const handleResend = async () => {
    try {
      const res = await api.post(`${baseUrl}/verify-email`)
      if (res.status === 200) {
        toast.success(res.data.message)
      }
    } catch (error:any) {
      if (error.response){
        toast.error(error.response.message)
      }else{
        toast.error(error.message)
      }
    }
  }

  return (
    <div className="relative w-full min-h-[500px] p-8 bg-background rounded-md flex flex-col items-center justify-center">
        <RiMailOpenFill className="w-12 h-12 text-primary mb-2"/>
        <h2 className='font-noto_serif font-bold text-2xl text-center text-primary mb-4'>Confirm Your Email</h2>
        <p className='text-sm text-gray-500 mb-5'>Please check your email to verify your <br /> account, or resend the verification link.</p>
        <Link href={"/verify-success"}>
          <Button onClick={() => handleResend()}  size={"lg"}
            disabled={loading}  
          >
            {
              loading &&
              <LoadingIcons.Oval strokeWidth={5} className="w-4 h-4 mr-2" color='white' />
            }
            Resend Verification
          </Button>
        </Link>
        {
          loading &&
          <LoadingState isFixed={false} />
        }
    </div>
  )
}

export default VerifyPage