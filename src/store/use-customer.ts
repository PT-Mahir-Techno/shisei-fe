import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { AdminType } from "@/types/admin-type";
import { create } from "zustand";

type CustomerStoreType = {
  customer: any
  customers: AdminType[]
  customerAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  customerUrl: string
  getAllCustomer: (url: string) => void
  getAllCustomerNoPaginate: (url: string) => void
  getSingleCustomer: (url: string) => Promise<void>
  createCustomer: (url:string, data: any) => Promise<void>
  deleteCustomer: (url: string) => void
  updateCustomer: (url: string, data: any) => Promise<void>
  searchCustomer: (url: string, data: any) => Promise<void>
}

const initState = {
  customer : {},
  customers: [],
  customerAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  customerUrl: ''
}


export const useCustomer = create<CustomerStoreType>((set, get) => ({
  ...initState, 
  getAllCustomer: async (url: string) => {
    try {
      set({loading: true, customerUrl: url})
      const res = await api.get(url)
      set({customers: res.data.data, loading: false, success: true, error: false, customerAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },

  getAllCustomerNoPaginate: async (url: string) => {
    try {
      set({loading: true, customerUrl: url})
      const res = await api.get(url)
      set({customers: res.data, loading: false, success: true, error: false, customerAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleCustomer: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({customer: res.data, loading: false, success: true, error: false})
      return Promise.resolve(res.data)
    } catch (err) {
      set({ error: true, loading: false, success: false, errorData: err })
      return Promise.reject(err)
    }
  },
  createCustomer:async (url:string, data: any) => {
    try {
      set({loading: true })
      const payload = new FormData()
      payload.append('name', data.name)
      payload.append('email', data.email)
      payload.append('gender', data.gender)
      payload.append('phone', data.phone)
      payload.append('code_phone', data.code_phone)
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      await api.post(`${baseUrl}${url}/user`, payload, config)
      set({loading: false, success: true, error: false})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false, errorData: error})
      return Promise.reject(error)
    }
  },
  deleteCustomer: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true, error: false})
    } catch (error) {
      set({error: true, loading: false, success: false, errorData: error})
    }
  },
  updateCustomer: async (url: string, data: any) => {
    try {
      set({loading: true })
      await api.put(url, data)
      set({loading: false, success: true, error: false})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false, errorData: error})
      return Promise.reject(error)
    }
  },

  searchCustomer: async (url: string, data: any) => {
    try {
      set({loading: true })
      const res = await api.get(url, {params: data})
      set({customers: res.data.data, loading: false, success: true, error: false, customerAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  }

}))