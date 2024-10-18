import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type StudioStoreType = {
  studio: any
  studios: any[]
  studioAttributes: any
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  studioUrl: string
  facilities: any
  contact: any
  openingHours: any
  galeries: any
  getAllStudio: (url: string) => void
  getSingleStudio: (url: string) => Promise<void>
  createStudio: (url:string, data: any) => Promise<void>
  deleteStudio: (url: string) => Promise<void>
  updateStudio: (url: string, data: any) => Promise<void>
}

const initState = {
  studio : {},
  studios: [],
  studioAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  studioUrl: '',
  facilities: null,
  contact: null,
  openingHours: null,
  galeries: null,
}


export const useStudio = create<StudioStoreType>((set, get) => ({
  ...initState, 
  getAllStudio: async (url: string) => {
    try {
      set({loading: true, studioUrl: url})
      const res = await api.get(url)
      // console.log('res', res.data)
      set({studios: res.data.data, loading: false, success: true, error: false, studioAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleStudio: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({studio: res.data, loading: false, success: true, error: false, facilities: res.data.facility, contact: res.data.contact, openingHours: res.data.opening, galeries: res.data.preview})
      return Promise.resolve(res.data)
    } catch (err) {
      set({ error: true, loading: false, success: false, errorData: err })
      return Promise.reject(err)
    }
  },
  createStudio:async (url:string, data: any) => {
    try {
      set({loading: true })
      const payload = new FormData()
      payload.append('name', data.name)
      payload.append('title', data.title)
      payload.append('subtitle', data.subtitle)
      payload.append('address', data.address)
      payload.append('maps', data.maps)
      payload.append('photo', data.photo[0])
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      await api.post(`${baseUrl}${url}/studio`, payload, config)
      set({loading: false, success: true, error: false})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false, errorData: error})
      return Promise.reject(error)
    }
  },
  deleteStudio: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true, error: false})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false, errorData: error})
      return Promise.reject(error)
    }
  },
  updateStudio: async (url: string, data: any) => {
    try {
      set({loading: true })
      await api.put(url, data)
      set({loading: false, success: true, error: false})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false, errorData: error})
      return Promise.reject(error)
    }
  }
}))