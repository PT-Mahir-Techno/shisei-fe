import api from "@/lib/api";
import { transformEevent } from "@/lib/utils";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type ScheduleStoreType = {
  schedule: any
  schedules: any[]
  scheduleAttributes: object
  convertedSchedule: any
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  scheduleUrl: string
  settingSchedule: any
  getAllSchedule: (url: string) => void
  getSingleSchedule: (url: string) => Promise<any>
  createSchedule: (url:string, data: any) => void
  deleteSchedule: (url: string) => void
  getAllScheduleNoPaginate: (url: string) => void
  getScheduleConverted: (url: string) => Promise<any>
  setSettingSchedule: (url:string, data:object) => Promise<void>
  getSettingSchedule: (url:string) => Promise<any>
  updateSchedule: (url:string, id: string, data: any) => void
}

const initState = {
  schedule : {},
  schedules: [],
  convertedSchedule: [],
  scheduleAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  scheduleUrl: '',
  settingSchedule: {}
}


export const useSchedule = create<ScheduleStoreType>((set, get) => ({
  ...initState, 
  getAllSchedule: async (url: string) => {
    try {
      set({loading: true, scheduleUrl: url})
      const res = await api.get(url)
      set({schedules: res.data.data, loading: false, success: true, scheduleAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getScheduleConverted: async (url:string) => {
    try {
      set({loading: true, scheduleUrl: url})
      const res = await api.get(url)
      const converted = res.data.map((event: any) => transformEevent(event))
      set({convertedSchedule: converted, loading: false, success: true})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false})
      return Promise.reject(error)
    }
  },
  getAllScheduleNoPaginate: async (url: string) => {
    try {
      set({loading: true, scheduleUrl: url})
      const res = await api.get(url)
      set({schedules: res.data, loading: false, success: true, scheduleAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleSchedule: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({schedule: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createSchedule:async (url:string, data: any) => {
    try {
      set({loading: true })
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      await api.post(`${baseUrl}${url}/schedule`, data, config)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  updateSchedule:async (url:string, id:string, data: any) => {
    try {
      set({loading: true })
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      await api.post(`${baseUrl}${url}/schedule/${id}`, data, config)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  deleteSchedule: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  setSettingSchedule: async (url:string, data:object) => {
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
  getSettingSchedule: async (url:string) => {
    try {
      set({loading: true })
      const res = await api.get(`${baseUrl}${url}/setting-web`)
      set({settingSchedule: res.data, loading: false, success: true })
      return Promise.resolve(res)
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  }
}))