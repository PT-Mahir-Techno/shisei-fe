import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import { PackageType } from '@/types/package-type'
import {create} from 'zustand'

interface PackagePageStore {
  loading: boolean
  success: boolean
  error  : boolean
  packages: PackageType[]
  package: PackageType|null
  getPackage: (url: string) => Promise<void>
  getSinglePackage: (url: string) => Promise<void> 
  procesedPackage: (url:string, data:any) => Promise<any>
}

const initState = {
  loading: false,
  success: false,
  error  : false,
  packages: [],
  package: null
}


export const usePackagePage = create<PackagePageStore>((set, get) => ({
  ...initState,
  getPackage: async (url: string) => {
    try {
      set({loading: true})
      const res = await api.get(`${baseUrl}${url}`)
      set({packages: res.data, loading: false, success: true})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false})
      return Promise.reject(error)
    }
  },
  getSinglePackage: async (url: string) => {
    try {
      set({loading: true})
      const res = await api.get(`${baseUrl}${url}`)
      set({package: res.data, loading: false, success: true})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false})
      return Promise.reject(error)
    }
  },
  procesedPackage: async (url:string, data:any) => {
    try {
      set({loading: true})
      const res = await api.post(`${baseUrl}${url}`, data)
      set({loading: false, success: true})
      return Promise.resolve(res)
    } catch (error) {
      set({error: true, loading: false, success: false})
      return Promise.reject(error)
    }
  }
}))