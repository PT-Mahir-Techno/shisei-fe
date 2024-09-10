import React from "react"
import axios from "axios"
import { baseUrl } from "@/lib/variable"
import Cookies from 'js-cookie';

export const useApi = () => {

  const [loading, setLoading] = React.useState(false)
  const [statusCode, setStatusCode] = React.useState<any>()
  
  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  })

  // set token if exist in cookies
  const token = Cookies.get("_auth")
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }

  // set loading to true before request
  api.interceptors.request.use((config) => {
    setLoading(true)
    return config
  })

  // handle request and return success or error 
  api.interceptors.response.use(
    (response) => {
      setLoading(false)
      setStatusCode(response.status)
      return response.data
    },
    (error) => {
      setLoading(false)
      setStatusCode(error.response.status)
      return Promise.reject(error.response.data)
    }
  )

  return {
    api,
    loading,
    statusCode
  }
}