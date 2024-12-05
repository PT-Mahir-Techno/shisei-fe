import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type ExtendDayStoreType = {
  extendDay: any
  extendDays: any[]
  extendDayAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  extendDayUrl: string
  getAllExtendDay: (url: string) => void
  getSingleExtendDay: (url: string) => Promise<void>
  createExtendDay: (url: string, data: any) => void
  deleteExtendDay: (url: string) => void
  getAllExtendDayNoPaginate: (url: string) => void
  updateExtendDay: (url: string, data: any) => void
}

const initState = {
  extendDay : {},
  extendDays: [],
  extendDayAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  extendDayUrl: ''
}


export const useExtendDay = create<ExtendDayStoreType>((set, get) => ({
  ...initState, 
  getAllExtendDay: async (url: string) => {
    try {
      set({loading: true, extendDayUrl: url})
      const res = await api.get(url)
      set({extendDays: res.data.data, loading: false, success: true, extendDayAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllExtendDayNoPaginate: async (url: string) => {
    try {
      set({loading: true, extendDayUrl: url})
      const res = await api.get(url)
      set({extendDays: res.data, loading: false, success: true, extendDayAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleExtendDay: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({extendDay: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createExtendDay:async (url:string ,data: any) => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}${url}/extend-day`, data)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  deleteExtendDay: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  updateExtendDay: async (url: string, data: any) => {
    try {
      set({loading: true })
      await api.put(url, data)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  }
}))