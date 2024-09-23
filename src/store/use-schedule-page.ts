import api from '@/lib/api';
import { baseUrl } from '@/lib/variable';
import { SchedulePageType } from '@/types/schedule-type';
import {create } from 'zustand';

interface SchedulePageState {
  loading: boolean;
  success: boolean;
  error: boolean;
  selectedDate: Date;
  schedules: SchedulePageType[];
  schedule: any;
  setSelectedDate: (date: Date) => void;
  getSchedules: (url:string) => Promise<void>;
  getSingleSchedule: (url: string) => Promise<void>;
}

const initState = {
  loading: false,
  success: false,
  error: false,
  selectedDate: new Date(),
  schedules: [],
  schedule: {},
  setSelectedDate: (date: Date) => {},
  getSchedules: async (url:string) => {}
}

export const useSchedulePage = create<SchedulePageState>((set) => ({
  ...initState,
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
  getSchedules: async (url:string) => {
    set({ loading: true})
    try {
      const res =await api.get(`${baseUrl}${url}`)
      set({ schedules: res.data })
      return Promise.resolve()
    } catch (error:any) {
      return Promise.reject(error)
    }
  },
  getSingleSchedule: async (url: string) => {
    set({ loading: true})
    try {
      const res =await api.get(`${baseUrl}${url}`)
      set({ schedule: res.data })
      set({ loading: false, success: true})
      return Promise.resolve()
    } catch (error:any) {
      set({ loading: false, error: true})
      return Promise.reject(error)
    }
  }
}))