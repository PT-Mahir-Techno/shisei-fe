import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { LocationType } from "@/types/location-type";
import { create } from "zustand";

type LocationStoreType = {
  location: any
  locations: LocationType[]
  locationAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  locationUrl: string
  getAllLocation: (url: string) => void
  getSingleLocation: (url: string) => void
  createLoation: (data: any) => void
  deleteLocation: (url: string) => void
  getAllLocationNoPaginate: (url: string) => void
}

const initState = {
  location : {},
  locations: [],
  locationAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  locationUrl: ''
}


export const useLocation = create<LocationStoreType>((set, get) => ({
  ...initState, 
  getAllLocation: async (url: string) => {
    try {
      set({loading: true, locationUrl: url})
      const res = await api.get(url)
      set({locations: res.data.data, loading: false, success: true, locationAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllLocationNoPaginate: async (url: string) => {
    try {
      set({loading: true, locationUrl: url})
      const res = await api.get(url)
      set({locations: res.data, loading: false, success: true, locationAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleLocation: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({location: res.data, loading: false, success: true })
    } catch (error) {
      set({ error: true, loading: false, success: false })
    }
  },
  createLoation:async (data: any) => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}/admin/location`, data)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  deleteLocation: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  }
}))