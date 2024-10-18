import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type NoteStoreType = {
  note: any
  notes: any[]
  noteAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  noteUrl: string
  getAllNote: (url: string) => void
  getSingleNote: (url: string) => Promise<any>
  createNote: (url:string, data: any) => Promise<void>
  deleteNote: (url: string) => void
  getAllNoteNoPaginate: (url: string) => void
  updateNote: (url: string, data: any) => Promise<void>
}

const initState = {
  note : {},
  notes: [],
  noteAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  noteUrl: ''
}


export const useNote = create<NoteStoreType>((set, get) => ({
  ...initState, 
  getAllNote: async (url: string) => {
    try {
      set({loading: true, noteUrl: url})
      const res = await api.get(url)
      set({notes: res.data.data, loading: false, success: true, noteAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllNoteNoPaginate: async (url: string) => {
    try {
      set({loading: true, noteUrl: url})
      const res = await api.get(url)
      set({notes: res.data, loading: false, success: true, noteAttributes: res.data})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false})
      return Promise.reject(error)
    }
  },
  getSingleNote: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({note: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createNote:async (url:string ,data: any) => {
    return new Promise((resolve, reject) => {
      set({loading: true })
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      api.post(`${baseUrl}${url}/notes`, data, {headers: headers})
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
  deleteNote: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  updateNote: async (url: string, data: any) => {
    try {
      set({loading: true })
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      await api.post(`${url}`, data, {headers: headers})
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  }
}))