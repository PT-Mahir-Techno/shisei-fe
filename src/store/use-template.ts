import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type TemplateStoreType = {
  template: any
  templates: any
  templateAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  templateUrl: string
  getAllTemplate: (url: string) => void
  getSingleTemplate: (url: string) => void
  createTemplate: (url:string, data: any) => void
  deleteTemplate: (url: string) => void
  getAllTemplateNoPaginate: (url: string) => void
  updateTemplate: (url: string, data: any) => Promise<void>
}

const initState = {
  template : {},
  templates: [],
  templateAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  templateUrl: ''
}


export const useTemplate = create<TemplateStoreType>((set, get) => ({
  ...initState, 
  getAllTemplate: async (url: string) => {
    try {
      set({loading: true, templateUrl: url})
      const res = await api.get(url)
      set({templates: res.data.data, loading: false, success: true, templateAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllTemplateNoPaginate: async (url: string) => {
    try {
      set({loading: true, templateUrl: url})
      const res = await api.get(url)
      set({templates: res.data, loading: false, success: true, templateAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleTemplate: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({template: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createTemplate:async (url:string, data: any) => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}${url}`, data)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  deleteTemplate: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  updateTemplate: async (url: string, data: any) => {
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