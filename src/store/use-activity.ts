import api from '@/lib/api'
import { baseUrl } from '@/lib/variable'
import { ActivityType } from '@/types/activity-type'
import {create} from 'zustand'


type ActivityStoreType =  {
  activities: ActivityType[]
  activityAttributes: any
  activityUrl: string
  getActivitiesNopaginate : (url: string) => Promise<void>
  getActivities: (url: string) => Promise<void>
  loading: boolean
  success: boolean
  error: boolean
}

const initState = {
  activities: [],
  activityUrl: '',
  loading: false,
  success: false,
  error: false,
  activityAttributes: []
}

export const useActivity = create<ActivityStoreType>()((set, get) => ({
  ...initState,
  getActivitiesNopaginate: async (url: string) => {
    try {
      set({loading: true, activityUrl: url})
      const res = await api.get(`${baseUrl}${url}`)
      set({activities: res.data.data, loading: false, success: true})
      return Promise.resolve(res.data)
    } catch (error) {
      set({error: true, loading: false, success: false})
      return Promise.reject(error)
    }
  },
  getActivities: async (url: string) => {
    try {
      set({loading: true, activityUrl: url})
      const res = await api.get(`${baseUrl}${url}`)
      set({activities: res.data.data, loading: false, success: true, activityAttributes: res.data})
      return Promise.resolve(res.data)
    } catch (error) {
      set({error: true, loading: false, success: false})
      return Promise.reject(error)
    }
  }
}))
