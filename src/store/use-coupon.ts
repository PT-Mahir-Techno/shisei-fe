import api from "@/lib/api";
import { baseUrl } from "@/lib/variable";
import { create } from "zustand";

type CouponStoreType = {
  coupon: any
  coupons: any
  couponAttributes: any
  loading: boolean
  success: boolean
  error: boolean
  errorData: any
  couponUrl: string
  getAllCoupon: (url: string) => void
  getSingleCoupon: (url: string) => void
  createCoupon: (url:string, data: any) => void
  deleteCoupon: (url: string) => void
  getAllCouponNoPaginate: (url: string) => void
  updateCoupon: (url: string, data: any) => Promise<void>
}

const initState = {
  coupon : {},
  coupons: [],
  couponAttributes: {},
  success: false,
  error: false,
  errorData: {},
  loading: false,
  couponUrl: ''
}


export const useCoupon = create<CouponStoreType>((set, get) => ({
  ...initState, 
  getAllCoupon: async (url: string) => {
    try {
      set({loading: true, couponUrl: url})
      const res = await api.get(url)
      set({coupons: res.data.data, loading: false, success: true, couponAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getAllCouponNoPaginate: async (url: string) => {
    try {
      set({loading: true, couponUrl: url})
      const res = await api.get(url)
      set({coupons: res.data, loading: false, success: true, couponAttributes: res.data})
    } catch (error) {
      set({error: true, loading: false, success: false})
    }
  },
  getSingleCoupon: async (url: string) => {
    try {
      set({loading: true })
      const res = await api.get(url)
      set({coupon: res.data, loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  createCoupon:async (url:string, data: any) => {
    try {
      set({loading: true })
      const res = await api.post(`${baseUrl}${url}`, data)
      set({loading: false, success: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  deleteCoupon: async (url: string) => {
    try {
      set({loading: true })
      await api.delete(url)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  },
  updateCoupon: async (url: string, data: any) => {
    try {
      set({loading: true })
      await api.post(url, data)
      set({loading: false, success: true })
      return Promise.resolve()
    } catch (error) {
      set({error: true, loading: false, success: false })
      return Promise.reject(error)
    }
  }
}))