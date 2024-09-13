import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { GalleryType } from "@/types/galery-ty";
import { create } from "zustand";

type GalleryStoreType = {
  gallery: any
  gallerys: GalleryType[]
  galleryAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  galleryUrl: string
  getAllGallery: (url: string) => void
  getSingleGallery: (url: string) => void
  createGallery: (data: any) => void
  deleteGallery: (url: string) => void
  getAllGalleryNoPaginate: (url: string) => void
}

const initState = {
  gallery : {},
  gallerys: [],
  galleryAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  galleryUrl: ''
}


export const useGallery = create<GalleryStoreType>((set, get) => ({
  ...initState, 
  getAllGallery: async (url: string) => {
    try {
      set({loading: true, galleryUrl: url})
      const res = await api.get(url)
      set({gallerys: res.data.data, loading: false, success: true, galleryAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllGalleryNoPaginate: async (url: string) => {
    try {
      set({loading: true, galleryUrl: url})
      const res = await api.get(url)
      set({gallerys: res.data, loading: false, success: true, galleryAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleGallery: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({gallery: res.data, loading: false, success: true })
    } catch (error) {
      set({ error: true, loading: false, success: false })
    }
  },
  createGallery:async (data: any) => {
    try {
      set({loading: true })
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      await api.post(`${baseUrl}/admin/gallery`, data, config)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  deleteGallery: async (url: string) => {
    return new Promise(async (resolve, reject) => {
      await api.delete(url).then(() => {
        set({loading: false, success: true })
        resolve()
      } ).catch((err) => {
        set({error: true, loading: false, success: false })
        reject(err)
      } )
    })
  }
}))