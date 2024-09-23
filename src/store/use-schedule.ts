import api from "@/lib/api";
import { transformEevent } from "@/lib/utils";
import { baseUrl } from "@/lib/variable";
import { PermissionType } from "@/types/permision-type";
import { create } from "zustand";

type ScheduleStoreType = {
  schedule: any
  schedules: PermissionType[]
  scheduleAttributes: object
  convertedSchedule: any
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  scheduleUrl: string
  getAllSchedule: (url: string) => void
  getSingleSchedule: (url: string) => void
  createSchedule: (data: any) => void
  deleteSchedule: (url: string) => void
  getAllScheduleNoPaginate: (url: string) => void
  getScheduleConverted: (url: string) => void
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
  scheduleUrl: ''
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
    } catch (error) {
      set({ error: true, loading: false, success: false })
    }
  },
  createSchedule:async (data: any) => {
    try {
      set({loading: true })
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      await api.post(`${baseUrl}/admin/schedule`, data, config)
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
  }
}))