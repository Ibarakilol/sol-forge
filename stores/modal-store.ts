import { create } from 'zustand';

import { type ModalName } from '@/constants';

type TModalState = Record<string, any>;

interface ModalStore {
  activeModal: ModalName | null;
  modalState: TModalState | null;
  closeModal: () => void;
  showModal: (modal: ModalName, state?: TModalState) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  modalState: null,
  closeModal: () => set({ activeModal: null, modalState: null }),
  showModal: (modal: ModalName, state?: TModalState) =>
    set({ activeModal: modal, ...(state && { modalState: state }) }),
}));
