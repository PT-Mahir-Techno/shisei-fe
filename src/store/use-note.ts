import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { NoteType } from "@/types/location-type";
import { create } from "zustand";

type NoteStoreType = {
  location: any
  locations: NoteType[]
  locationAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  locationUrl: string
  getAllNote: (url: string) => void
  getSingleNote: (url: string) => void
  createLoation: (data: any) => void
  deleteNote: (url: string) => void
  getAllNoteNoPaginate: (url: string) => void
  updateLoacation: (url: string, data: any) => Promise<void>
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


export const useNote = create<NoteStoreType>((set, get) => ({
  ...initState, 
  getAllNote: async (url: string) => {
    try {
      set({loading: true, locationUrl: url})
      const res = await api.get(url)
      set({locations: res.data.data, loading: false, success: true, locationAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllNoteNoPaginate: async (url: string) => {
    try {
      set({loading: true, locationUrl: url})
      const res = await api.get(url)
      set({locations: res.data, loading: false, success: true, locationAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleNote: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({location: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
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
  deleteNote: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  updateLoacation: async (url: string, data: any) => {
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