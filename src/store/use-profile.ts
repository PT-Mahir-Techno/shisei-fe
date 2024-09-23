import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import { ProfileType } from '@/types/profile-type'
import { create } from 'zustand'


type ProfileState = {
  getPorfile: (url?: string) => Promise<any>
  resetProfile: () => void
  setData: () => void
  setRole: (role: any) => void
  updatePassword: (data: any, url:string) => Promise<any>
  updateProfile: (url:string, data: any) => Promise<any>
  data: any
  loading: boolean,
  success: boolean,
  error: boolean
  errorData: any
  role: any
}

const initState = {
  getPorfile: () => {},
  resetProfile: () => {},
  data: null,
  loading: false,
  success: false,
  error: false,
  errorData: {},
  role: null
}

export const useProfile = create<ProfileState>((set, get) => ({
  ...initState,
  getPorfile: async (url:string  = '/admin/profile') => {
    set({loading: true})
    try {
      const res = await api.get(`${baseUrl}${url}`)
      set({data: res.data.user, loading: false, success: true, role: res.data.role})
      return Promise.resolve(res.data)
    } catch (error) {
      set({error: true, loading: false, success: false})
      return Promise.reject(error)
    }
  },
  resetProfile: () => set({data: null, success: false, error: false, loading: false, role: null}),
  setData: () => set({data: null, success: false, error: false, loading: false}),
  setRole: (param) => {
    set({role: param})
  },
  updatePassword: async (data, url) => {
    set({loading: true})
    try {
      const res = await api.post(`${baseUrl}${url}`, data)
      set({loading: false, success: true})
      return Promise.resolve(res.data)
    } catch (error:any) {
      set({error: true, loading: false})
      return Promise.reject(error)
    }
  },
  updateProfile: async (url, data) => {
    set({loading: true})
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const res = await api.post(`${baseUrl}${url}`, data, config)
      set({loading: false, success: true})
      return Promise.resolve(res.data)
    } catch (error:any) {
      set({error: true, loading: false})
      return Promise.reject(error)
    }
  }
})) 