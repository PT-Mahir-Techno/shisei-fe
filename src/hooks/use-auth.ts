import React from "react"
import { useApi } from "./use-api"
import { baseUrl } from "@/lib/variable"
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useProfile } from "@/store/use-profile";

export const useAuth = () => {

  const [loading, setLoading] = React.useState(false)
  const { resetProfile } = useProfile()
  
  // logout
  const logout = async (url:string) => {
    // fetch logout api
    try {
      setLoading(true)
      await api.post(`${baseUrl}${url}`)
      await resetProfile()
      toast.success("Logout success")
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }

    Cookies.remove('_auth')
  }

  //  login
  const login =  async (url:string, data:object) => {
    // fetch login api
    try {
      setLoading(true)
      const res = await api.post(`${baseUrl}${url}`, data)
      
      // set token to api
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`

      Cookies.set('_auth', res.data.token)
      setLoading(false)
      toast.success("Login success")
    } catch (error:any) {
      setLoading(false)
      return Promise.reject(error)
    }
  }

  // user
  const getMe = async () => {
    try {
      setLoading(true)
      const user = await api.get(`${baseUrl}/admin/profile`)
      setLoading(false)
      return Promise.resolve(user.data)
    } catch (error) {
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
    getMe
  }
}