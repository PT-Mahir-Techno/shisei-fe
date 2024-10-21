import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { StaffType } from "@/types/staff-type";
import { create } from "zustand";

type StaffStoreType = {
  staff: any
  staffs: StaffType[]
  staffAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  staffUrl: string
  getAllStaff: (url: string) => void
  getSingleStaff: (url: string) => Promise<void>
  createStaff: (url:string, data: any) => Promise<void>
  deleteStaff: (url: string) => void
  getAllStaffNoPaginate: (url: string) => void
  updateStaff: (url: string, data: any) => Promise<void>
}

const initState = {
  staff : {},
  staffs: [],
  staffAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  staffUrl: ''
}


export const useStaff = create<StaffStoreType>((set, get) => ({
  ...initState, 
  getAllStaff: async (url: string) => {
    try {
      set({loading: true, staffUrl: url})
      const res = await api.get(url)
      set({staffs: res.data.data, loading: false, success: true, staffAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllStaffNoPaginate: async (url: string) => {
    try {
      set({loading: true, staffUrl: url})
      const res = await api.get(url)
      set({staffs: res.data, loading: false, success: true, staffAttributes: res.data})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false})
      return Promise.reject(error)
    }
  },
  getSingleStaff: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({staff: res.data, loading: false, success: true })
      return Promise.resolve(res.data.staff)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createStaff:async (url:string, data: any) => {
    return new Promise((resolve, reject) => {
      set({loading: true })
      api.post(`${baseUrl}${url}/staff`, data)
      .then((res) => {
        set({loading: false, success: true })
        resolve()
      })
      .catch((error) => {
        set({error: true, loading: false, success: false })
        reject(error)
      })  
    })
  },
  deleteStaff: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  updateStaff: async (url: string, data: any) => {
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