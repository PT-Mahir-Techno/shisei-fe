import { create } from 'zustand'

type ModalState = {
  isOpen: boolean,
  modalId: string,
  setIsOpen: (value: boolean) => void
  setModalId: (value: string) => void
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  modalId: '',
  setIsOpen: (value: boolean) => set({isOpen: value}),
  setModalId: (value: string) => set({modalId: value})
}))