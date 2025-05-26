import { create } from 'zustand';

import { type ModalName } from '@/constants';

interface ModalStore {
  activeModal: ModalName | null;
  closeModal: () => void;
  showModal: (modal: ModalName) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  closeModal: () => set({ activeModal: null }),
  showModal: (modal: ModalName) => set({ activeModal: modal }),
}));
