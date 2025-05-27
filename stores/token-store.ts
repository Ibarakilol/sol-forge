import { create } from 'zustand';

interface TokenStore {
  token: string;
}

export const useTokenStore = create<TokenStore>((set) => ({
  token: '',
}));
