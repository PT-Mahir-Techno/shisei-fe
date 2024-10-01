import api from '@/lib/api';
import { baseUrl } from '@/lib/variable';
import {create } from 'zustand';

interface ContactPageState {
  loading: boolean;
  success: boolean;
  error: boolean;
  contact: any;
  getContacts: () => Promise<void>;
}

const initState = {
  loading: false,
  success: false,
  error: false,
  contact: {},
  getContacts: async () => {}
}

export const useContactPage = create<ContactPageState>((set) => ({
  ...initState,
  getContacts: async () => {
    set({ loading: true})
    try {
      const res =await api.get(`${baseUrl}/contact`)
      set({ contact: res.data, loading: false, success: true})
      return Promise.resolve()
    } catch (error:any) {
      set({ loading: false, error: true})
      return Promise.reject(error)
    }
  }
}))