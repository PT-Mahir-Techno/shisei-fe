import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type PackageCategoryStoreType = {
  packageCategory: any
  packageCategorys: any[]
  packageCategoryAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  packageCategoryUrl: string
  getAllPackageCategory: (url: string) => void
  getSinglePackageCategory: (url: string) => Promise<any>
  createPackageCategory: (url:string, data: any) => Promise<void>
  deletePackageCategory: (url: string) => void
  updatePackageCategory: (url: string, data: any) => Promise<void>
  getAllPackageCategoryNoPaginate: (url: string) => void
}

const initState = {
  packageCategory : {},
  packageCategorys: [],
  packageCategoryAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  packageCategoryUrl: ''
}


export const usePackageCategory = create<PackageCategoryStoreType>((set, get) => ({
  ...initState, 
  getAllPackageCategory: async (url: string) => {
    try {
      set({loading: true, packageCategoryUrl: url})
      const res = await api.get(url)
      set({packageCategorys: res.data.data, loading: false, success: true, packageCategoryAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllPackageCategoryNoPaginate: async (url: string) => {
    try {
      set({loading: true, packageCategoryUrl: url})
      const res = await api.get(url)
      set({packageCategorys: res.data, loading: false, success: true, packageCategoryAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSinglePackageCategory: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({packageCategory: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createPackageCategory:async (url:string, data: any) => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}${url}/category`, data)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  deletePackageCategory: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  updatePackageCategory: async (url: string, data: any) => {
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