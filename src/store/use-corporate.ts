import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type CorporateStoreType = {
  corporate: any
  corporates: any
  corporateAttributes: any
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  corporateUrl: string
  getAllCorporate: (url: string) => void
  getSingleCorporate: (url: string) => void
  createCorporate: (url:string, data: any) => void
  deleteCorporate: (url: string) => void
  getAllCorporateNoPaginate: (url: string) => void
  updateCorporate: (url: string, data: any) => Promise<void>
}

const initState = {
  corporate : {},
  corporates: [],
  corporateAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  corporateUrl: ''
}


export const useCorporate = create<CorporateStoreType>((set, get) => ({
  ...initState, 
  getAllCorporate: async (url: string) => {
    try {
      set({loading: true, corporateUrl: url})
      const res = await api.get(url)
      set({corporates: res.data.data, loading: false, success: true, corporateAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllCorporateNoPaginate: async (url: string) => {
    try {
      set({loading: true, corporateUrl: url})
      const res = await api.get(url)
      set({corporates: res.data, loading: false, success: true, corporateAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleCorporate: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({corporate: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createCorporate:async (url:string, data: any) => {
    try {
      set({loading: true })
      const res = await api.post(`${baseUrl}${url}`, data)
      set({loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  deleteCorporate: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  updateCorporate: async (url: string, data: any) => {
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