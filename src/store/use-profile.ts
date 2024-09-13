import api from '@/lib/api'
import { ProfileType } from '@/types/profile-type'
import { create } from 'zustand'


type ProfileState = {
  getPorfile: () => void
  resetProfile: () => void
  setData: () => void
  data: any
  loading: boolean,
  success: boolean,
  error: boolean
  errorData: any
}

const initState = {
  getPorfile: () => {},
  resetProfile: () => {},
  data: null,
  loading: false,
  success: false,
  error: false,
  errorData: {}
}

export const useProfile = create<ProfileState>((set, get) => ({
  ...initState,
  getPorfile: async () => {
    set({...initState, loading: true})
    try {
      const res = await api.get('/admin/profile')
      set({...initState, data: res.data, loading: false, success: true})
    } catch (error) {
      set({...initState, error: true, loading: false, success: false})
    }
  },
  resetProfile: () => set({data: null, success: false, error: false, loading: false}),
  setData: () => set({data: null, success: false, error: false, loading: false}),
}))