import React from "react"
import { useApi } from "./use-api"
import { baseUrl } from "@/lib/variable"
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useProfile } from "@/store/use-profile";

export const useAuth = () => {

  const [loading, setLoading] = React.useState(false)
  const { resetProfile, setRole } = useProfile()
  
  // logout
  const logout = async (url:string) => {
    try {
      setLoading(true)
      await api.post(`${baseUrl}${url}`)
      await resetProfile()
      await setRole(null)

      Cookies.remove('_auth')
      Cookies.remove('_is_auth')
      Cookies.remove('_avaibility')

      toast.success("Logout success")
      setLoading(false)
      return Promise.resolve()
    } catch (error) {
      setLoading(false)
      return Promise.reject(error)
    }
  }

  //  login
  const login =  async (url:string, data:object) => {
    // fetch login api
    try {
      setLoading(true)
      const res = await api.post(`${baseUrl}${url}`, data)
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`
      Cookies.set('_auth', res.data.token)
      Cookies.set('_is_auth', 'true')
      Cookies.set('_avaibility', res.data.role)
      setLoading(false)
      return Promise.resolve(res)
    } catch (error:any) {
      setLoading(false)
      return Promise.reject(error)
    }
  }

  // user
  const getMe = async (url:string  = '/admin/profile') => {
    try {
      setLoading(true)
      const user = await api.get(`${baseUrl}${url}`)
      setLoading(false)
      return Promise.resolve(user.data)
    } catch (error) {
      setLoading(false)
      return Promise.reject(error)
    }
  }


  const register = async (url:string, data:object) => {
    try {
      setLoading(true)
      const res = await api.post(url, data)
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`
      Cookies.set('_auth', res.data.token)
      setLoading(false)
      return Promise.resolve()
    } catch (error:any) {
      setLoading(false)
      return Promise.reject(error)
    }
  }

  // use Effett get me and set user
  // React.useEffect(() => {
   
  //   const auth = Cookies.get('_auth')

  //   if (auth) {
  //     getMe().then((res) => {
  //       setUser(res)
  //     }).catch((err) => {
  //       setUser(null)
  //     })
  //   }else{
  //     setUser(null)
  //   }

  // }, [])

  return {
    login,
    loading,
    logout,
    getMe,
    register
  }
}