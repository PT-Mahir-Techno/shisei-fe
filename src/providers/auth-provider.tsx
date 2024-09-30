"use client"

import Cookies from 'js-cookie'
import { useProfile } from "@/store/use-profile"
import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const AuthContex = createContext<any>({})

export function AuthProvider({ children }: any) {

  const {getPorfile} = useProfile()
  const router = useRouter()
  const [authState, setAuthState] = useState({
    _auth: Cookies.get('_auth'),
    _is_auth: Cookies.get('_is_auth'),
    _avaibility: Cookies.get('_avaibility'),
    _prefix: ''
  })

  const initState = async () => {
    if (authState._auth && authState._is_auth && authState._avaibility) {
      
      let url:string = ''
      if (authState._avaibility === 'admin'){
        url = '/admin/profile'
        setAuthState((prev:any) => ({...prev, _prefix: '/admin'}))
      }else if(authState._avaibility === 'customer'){
        url = '/dashboard/profile'
      }else{
        url = '/staff/profile'
        setAuthState((prev:any) => ({...prev, _prefix: '/staff'}))
      }
      
      try {
        await getPorfile(url)
      } catch (error:any) {
          router.push('/')
          if ( error.data.message == "you must verify otp first"){
            router.push('/otp-verification')
          }
        }
    }
  }

  useEffect(() => {
    initState()
  }
  , [])

  return <AuthContex.Provider value={{ authState, setAuthState }} >{children}</AuthContex.Provider>
}