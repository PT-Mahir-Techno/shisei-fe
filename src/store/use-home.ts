import api from "@/lib/api";
import { create } from "zustand";

type homeType = {
  loadingLoation: boolean,
  locations: any,
  getLocations:() => Promise<any>,
}

const initState = {
  loadingLoation: false,
  locations: [],
}

export const useHome = create<homeType>((set, get) => ({
  ...initState,

  getLocations: async () => {
    try {
      set({loadingLoation: true})
      const res = await api.get('/locations')
      set({locations: res.data, loadingLoation: false})
      return Promise.resolve(res)
    } catch (error) {
      set({loadingLoation: false})
      return Promise.reject(error)
    }
  }
}))