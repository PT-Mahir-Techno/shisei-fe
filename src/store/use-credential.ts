import {create} from 'zustand';

type StoreType = {
  session: any;
  setSession: (session:any) => void;
};

export const useCredential = create<StoreType>((set) => ({
  session: null,
  setSession: (sessionData:any) => {
    set({session: sessionData})
  },
}));