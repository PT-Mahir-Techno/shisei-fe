import api from "@/lib/api";
import { GroupPermission } from "@/lib/utils";
import { baseUrl } from "@/lib/variable";
import { PermissionType } from "@/types/permision-type";
import { create } from "zustand";

type PermisionStoreType = {
  permision: any
  permisions: PermissionType[]
  permisionAttributes: object
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  permisionUrl: string
  getAllPermision: (url: string) => void
  getSinglePermision: (url: string) => void
  createPermision: (data: any) => void
  deletePermision: (url: string) => void
  getAllPermisionNoPaginate: (url: string) => void
}

const initState = {
  permision : {},
  permisions: [],
  permisionAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  permisionUrl: ''
}


export const usePermision = create<PermisionStoreType>((set, get) => ({
  ...initState, 
  getAllPermision: async (url: string) => {
    try {
      set({loading: true, permisionUrl: url})
      const res = await api.get(url)
      set({permisions: res.data.data, loading: false, success: true, permisionAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllPermisionNoPaginate: async (url: string) => {
    try {
      set({loading: true, permisionUrl: url})
      const res = await api.get(url)
      set({permisions: res.data, loading: false, success: true, permisionAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSinglePermision: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({permision: res.data, loading: false, success: true })
    } catch (error) {
      set({ error: true, loading: false, success: false })
    }
  },
  createPermision:async (data: any) => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}/admin/role-permission`, data)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  },
  deletePermision: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
    } catch (error) {
      set({error: true, loading: false, success: false })
    }
  }
}))