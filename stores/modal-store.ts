import { create } from 'zustand';

import { type ModalName } from '@/constants';

interface ModalStore {
  activeModal: ModalName | null;
  hideModal: () => void;
  showModal: (modal: ModalName) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  hideModal: () => set({ activeModal: null }),
  showModal: (modal: ModalName) => set({ activeModal: modal }),
}));
