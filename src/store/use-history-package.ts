import api from "@/lib/api";
import { transformEevent } from "@/lib/utils";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type PackageHistoryStoreType = {
  packageHistory: any
  packageHistorys: any[]
  packageHistoryAttributes: object
  convertedPackageHistory: any
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  packageHistoryUrl: string
  settingPackageHistory: any
  getAllPackageHistory: (url: string) => void
  getSinglePackageHistory: (url: string) => void
  createPackageHistory: (data: any) => void
  deletePackageHistory: (url: string) => void
  getAllPackageHistoryNoPaginate: (url: string) => void
  getPackageHistoryConverted: (url: string) => void
  setSettingPackageHistory: (data:object) => Promise<void>
  getSettingPackageHistory: () => Promise<any>
}

const initState = {
  packageHistory : {},
  packageHistorys: [],
  convertedPackageHistory: [],
  packageHistoryAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  packageHistoryUrl: '',
  settingPackageHistory: {}
}


export const usePackageHistory = create<PackageHistoryStoreType>((set, get) => ({
  ...initState, 
  getAllPackageHistory: async (url: string) => {
    try {
      set({loading: true, packageHistoryUrl: url})
      const res = await api.get(url)
      set({packageHistorys: res.data.data, loading: false, success: true, packageHistoryAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getPackageHistoryConverted: async (url:string) => {
    try {
      set({loading: true, packageHistoryUrl: url})
      const res = await api.get(url)
      const converted = res.data.map((event: any) => transformEevent(event))
      set({convertedPackageHistory: converted, loading: false, success: true})
    } catch (error) {
      set({error: true, loading: false, success: false})
      return Promise.reject(error)
    }
  },
  getAllPackageHistoryNoPaginate: async (url: string) => {
    try {
      set({loading: true, packageHistoryUrl: url})
      const res = await api.get(url)
      set({packageHistorys: res.data, loading: false, success: true, packageHistoryAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSinglePackageHistory: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({packageHistory: res.data, loading: false, success: true })
    } catch (error) {
      set({ error: true, loading: false, success: false })
    }
  },
  createPackageHistory:async (data: any) => {
    try {
      set({loading: true })
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      await api.post(`${baseUrl}/admin/packageHistory`, data, config)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  deletePackageHistory: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  setSettingPackageHistory: async (data:object) => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}/admin/setting-web`, data)
      set({loading: false, success: true})
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  getSettingPackageHistory: async () => {
    try {
      set({loading: true })
      const res = await api.get(`${baseUrl}/admin/setting-web`)
      set({settingPackageHistory: res.data, loading: false, success: true })
      return Promise.resolve(res)
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  }
}))