import api from "@/lib/api";
import { transformEevent } from "@/lib/utils";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type RedemtionStoreType = {
  redemtion: any
  redemtions: any[]
  redemtionAttributes: any
  convertedRedemtion: any
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  redemtionUrl: string
  settingRedemtion: any
  getAllRedemtion: (url: string) => void
  getSingleRedemtion: (url: string) => Promise<any>
  createRedemtion: (url:string, data: any) => void
  deleteRedemtion: (url: string) => void
  getAllRedemtionNoPaginate: (url: string) => void
  getRedemtionConverted: (url: string) => Promise<any>
  setSettingRedemtion: (url:string, data:object) => Promise<void>
  getSettingRedemtion: (url:string) => Promise<any>
  updateRedemtion: (url:string, id: string, data: any) => void
}

const initState = {
  redemtion : {},
  redemtions: [],
  convertedRedemtion: [],
  redemtionAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  redemtionUrl: '',
  settingRedemtion: {}
}


export const useRedemtion = create<RedemtionStoreType>((set, get) => ({
  ...initState, 
  getAllRedemtion: async (url: string) => {
    try {
      set({loading: true, redemtionUrl: url})
      const res = await api.get(url)
      set({redemtions: res.data.data, loading: false, success: true, redemtionAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getRedemtionConverted: async (url:string) => {
    try {
      set({loading: true, redemtionUrl: url})
      const res = await api.get(url)
      // console.log('res', res.data)
      const converted = res.data?.map((event: any) => transformEevent(event))
      set({convertedRedemtion: converted, loading: false, success: true})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false})
      return Promise.reject(error)
    }
  },
  getAllRedemtionNoPaginate: async (url: string) => {
    try {
      set({loading: true, redemtionUrl: url})
      const res = await api.get(url)
      set({redemtions: res.data, loading: false, success: true, redemtionAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleRedemtion: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({redemtion: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createRedemtion:async (url:string, data: any) => {
    try {
      set({loading: true })
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      await api.post(`${baseUrl}${url}/redemtion`, data, config)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  updateRedemtion:async (url:string, id:string, data: any) => {
    try {
      set({loading: true })
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      await api.post(`${baseUrl}${url}/redemtion/${id}`, data, config)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  deleteRedemtion: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  setSettingRedemtion: async (url:string, data:object) => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}${url}/setting-web`, data)
      set({loading: false, success: true})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  getSettingRedemtion: async (url:string) => {
    try {
      set({loading: true })
      const res = await api.get(`${baseUrl}${url}/setting-web`)
      set({settingRedemtion: res.data, loading: false, success: true })
      return Promise.resolve(res)
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  }
}))