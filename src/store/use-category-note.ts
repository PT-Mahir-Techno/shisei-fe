import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type CategoryNoteStoreType = {
  categoryNote: any
  categoryNotes: any[]
  categoryNoteAttributes: any
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  categoryNoteUrl: string
  getAllCategoryNote: (url: string) => void
  getSingleCategoryNote: (url: string) => Promise<void>
  createCategoryNote: (url:string, data: any) => Promise<void>
  deleteCategoryNote: (url: string) => void
  getAllCategoryNoteNoPaginate: (url: string) => void
  updateCategoryNote: (url: string, data: any) => Promise<void>
}

const initState = {
  categoryNote : {},
  categoryNotes: [],
  categoryNoteAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  categoryNoteUrl: ''
}


export const useCategoryNote = create<CategoryNoteStoreType>((set, get) => ({
  ...initState, 
  getAllCategoryNote: async (url: string) => {
    try {
      set({loading: true, categoryNoteUrl: url})
      const res = await api.get(url)
      set({categoryNotes: res.data.data, loading: false, success: true, categoryNoteAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllCategoryNoteNoPaginate: async (url: string) => {
    try {
      set({loading: true, categoryNoteUrl: url})
      const res = await api.get(url)
      set({categoryNotes: res.data, loading: false, success: true, categoryNoteAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleCategoryNote: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({categoryNote: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createCategoryNote:async (url:string, data: any) : Promise<any> => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}${url}/category-notes`, data)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (err:any) {
      set({error: true, loading: false, success: false, errorData: err})
      return Promise.reject(err)
    }
  },
  deleteCategoryNote: async (url: string) => {
    return new Promise (async (resolve, reject) => {
      await api.delete(url).then(() => {
        set({loading: false, success: true })
        resolve()
      } ).catch((err) => {
        set({error: true, loading: false, success: false })
        reject(err)
      } )
    })
  },
  updateCategoryNote: async (url: string, data: any) => {
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