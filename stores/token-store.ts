import { create } from 'zustand';

import type { ITokenForm } from '@/interfaces';

interface TokenStore {
  tokenForm: ITokenForm;
  changeTokenForm: <K extends keyof ITokenForm>(property: K) => (value: ITokenForm[K]) => void;
  resetTokenForm: () => void;
}

const emptyTokenForm: ITokenForm = {
  decimals: '9',
  freezeAuthority: false,
  mintAuthority: false,
  name: '',
  supply: '',
  symbol: '',
  updateAuthority: false,
};

export const useTokenStore = create<TokenStore>((set, get) => ({
  tokenForm: emptyTokenForm,
  changeTokenForm: (property) => (value) =>
    set({ tokenForm: { ...get().tokenForm, [property]: value } }),
  resetTokenForm: () => set({ tokenForm: emptyTokenForm }),
}));
