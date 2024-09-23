import { create } from 'zustand'

type ModalState = {
  isOpen: boolean,
  isOpenDay: boolean,
  modalId: string,
  setIsOpen: (value: boolean) => void
  setModalId: (value: string) => void
  setIsOpenDay: (value: boolean) => void
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  isOpenDay: false,
  modalId: '',
  setIsOpen: (value: boolean) => set({isOpen: value}),
  setModalId: (value: string) => set({modalId: value}),
  setIsOpenDay: (value: boolean) => set({isOpenDay: value})
}))