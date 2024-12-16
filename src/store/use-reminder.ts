import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type ReminderStoreType = {
  reminder: any
  reminders: any
  reminderAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  reminderUrl: string
  getAllReminder: (url: string) => void
  getSingleReminder: (url: string) => void
  createReminder: (url:string, data: any) => void
  deleteReminder: (url: string) => void
  getAllReminderNoPaginate: (url: string) => void
  updateReminder: (url: string, data: any) => Promise<void>
}

const initState = {
  reminder : {},
  reminders: [],
  reminderAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  reminderUrl: ''
}


export const useReminder = create<ReminderStoreType>((set, get) => ({
  ...initState, 
  getAllReminder: async (url: string) => {
    try {
      set({loading: true, reminderUrl: url})
      const res = await api.get(url)
      set({reminders: res.data.data, loading: false, success: true, reminderAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllReminderNoPaginate: async (url: string) => {
    try {
      set({loading: true, reminderUrl: url})
      const res = await api.get(url)
      set({reminders: res.data, loading: false, success: true, reminderAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleReminder: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({reminder: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createReminder:async (url:string, data: any) => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}${url}`, data)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  deleteReminder: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  updateReminder: async (url: string, data: any) => {
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