import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { PeriodType } from "@/types/period-type";
import { create } from "zustand";

type PeriodStoreType = {
  period: any
  periods: PeriodType[]
  periodAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  periodUrl: string
  getAllPeriod: (url: string) => void
  getSinglePeriod: (url: string) => Promise<void>
  createPeriod: (url: string, data: any) => void
  deletePeriod: (url: string) => void
  getAllPeriodNoPaginate: (url: string) => void
  updatePeriod: (url: string, data: any) => void
}

const initState = {
  period : {},
  periods: [],
  periodAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  periodUrl: ''
}


export const usePeriod = create<PeriodStoreType>((set, get) => ({
  ...initState, 
  getAllPeriod: async (url: string) => {
    try {
      set({loading: true, periodUrl: url})
      const res = await api.get(url)
      set({periods: res.data.data, loading: false, success: true, periodAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllPeriodNoPaginate: async (url: string) => {
    try {
      set({loading: true, periodUrl: url})
      const res = await api.get(url)
      set({periods: res.data, loading: false, success: true, periodAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSinglePeriod: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({period: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createPeriod:async (url:string ,data: any) => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}${url}/duration`, data)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  deletePeriod: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  updatePeriod: async (url: string, data: any) => {
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