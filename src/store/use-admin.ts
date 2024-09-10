import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { AdminType } from "@/types/admin-type";
import { create } from "zustand";

type AdminStoreType = {
  admin: any
  admins: AdminType[]
  adminAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  adminUrl: string
  getAllAdmin: (url: string) => void
  getSingleAdmin: (url: string) => void
  createAdmin: (data: any) => void
  deleteAdmin: (url: string) => void
}

const initState = {
  admin : {},
  admins: [],
  adminAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  adminUrl: ''
}


export const useAdmin = create<AdminStoreType>((set, get) => ({
  ...initState, 
  getAllAdmin: async (url: string) => {
    try {
      set({loading: true, adminUrl: url})
      const res = await api.get(url)
      set({admins: res.data.data, loading: false, success: true, adminAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleAdmin: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({admin: res.data, loading: false, success: true })
    } catch (err) {
      set({ error: true, loading: false, success: false, errorData: err })
    }
  },
  createAdmin:async (data: any) => {
    try {
      set({loading: true })
      const payload = new FormData()
      payload.append('name', data.name)
      payload.append('email', data.email)
      payload.append('password', data.password)
      payload.append('photo', data.photo[0])
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      await api.post(`${baseUrl}/admin/admin`, payload, config)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  deleteAdmin: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  }
}))