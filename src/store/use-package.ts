import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { PackageType } from "@/types/package-type";
import { create } from "zustand";

type PackageStoreType = {
  package: any
  packages: PackageType[]
  packageAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  packageUrl: string
  getAllPackage: (url: string) => void
  getSinglePackage: (url: string) => void
  createPackage: (data: any) => void
  deletePackage: (url: string) => void
}

const initState = {
  package : {},
  packages: [],
  packageAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  packageUrl: ''
}


export const usePackage = create<PackageStoreType>((set, get) => ({
  ...initState, 
  getAllPackage: async (url: string) => {
    try {
      set({loading: true, packageUrl: url})
      const res = await api.get(url)
      set({packages: res.data.data, loading: false, success: true, packageAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSinglePackage: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({package: res.data, loading: false, success: true })
    } catch (error) {
      set({ error: true, loading: false, success: false })
    }
  },
  createPackage:async (data: any) => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}/admin/membership`, data)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  deletePackage: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  }
}))