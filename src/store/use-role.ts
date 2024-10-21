import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { RoleType } from "@/types/role-type";
import { create } from "zustand";

type RoleStoreType = {
  role: any
  roles: RoleType[]
  roleAttributes: any
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  roleUrl: string
  getAllRole: (url: string) => void
  getSingleRole: (url: string) => Promise<any>
  createRole: (url:string, data: any) => void
  updateRole: (url:string, data: any) => void
  deleteRole: (url: string) => void
  getAllRoleNoPaginate: (url: string) => void
}

const initState = {
  role : {},
  roles: [],
  roleAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  roleUrl: ''
}


export const useRole = create<RoleStoreType>((set, get) => ({
  ...initState, 
  getAllRole: async (url: string) => {
    try {
      set({loading: true, roleUrl: url})
      const res = await api.get(url)
      set({roles: res.data.data, loading: false, success: true, roleAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllRoleNoPaginate: async (url: string) => {
    try {
      set({loading: true, roleUrl: url})
      const res = await api.get(url)
      set({roles: res.data, loading: false, success: true, roleAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleRole: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({role: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createRole:async (url:string, data: any) : Promise<any> => {
    try {
      set({loading: true })
      await api.post(`${baseUrl}${url}/role`, data)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (err:any) {
      set({error: true, loading: false, success: false, errorData: err})
      return Promise.reject(err)
    }
  },
  updateRole:async (url: string, data: any) : Promise<any> => {
    try {
      set({loading: true })
      await api.put(`${baseUrl}${url}`, data)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (err:any) {
      set({error: true, loading: false, success: false, errorData: err})
      return Promise.reject(err)
    }
  },
  deleteRole: async (url: string) => {
    return new Promise (async (resolve, reject) => {
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