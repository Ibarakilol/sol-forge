import { create } from 'zustand';

import type { ITokenForm, ITokenFormValidationData, ITokenResult } from '@/interfaces';

interface TokenStore {
  isProcessing: boolean;
  tokenForm: ITokenForm;
  tokenFormValidationData: ITokenFormValidationData;
  changeTokenForm: <K extends keyof ITokenForm>(property: K) => (value: ITokenForm[K]) => void;
  createToken: (
    createSolanaToken: (tokenForm: ITokenForm) => Promise<ITokenResult>
  ) => Promise<ITokenResult | undefined>;
  resetTokenForm: () => void;
  validateTokenForm: () => void;
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

const initialTokenFormValidationData: ITokenFormValidationData = {
  decimals: { isValid: true },
  description: { isValid: true },
  freezeAuthority: { isValid: true },
  logo: { isValid: true },
  mintAuthority: { isValid: true },
  name: { isValid: true },
  supply: { isValid: true },
  symbol: { isValid: true },
  updateAuthority: { isValid: true },
};

export const useTokenStore = create<TokenStore>((set, get) => ({
  isProcessing: false,
  tokenForm: emptyTokenForm,
  tokenFormValidationData: initialTokenFormValidationData,
  changeTokenForm: (property) => (value) =>
    set({
      tokenForm: { ...get().tokenForm, [property]: value },
      tokenFormValidationData: { ...get().tokenFormValidationData, [property]: { isValid: true } },
    }),
  createToken: async (createSolanaToken) => {
    set({ isProcessing: true });

    get().validateTokenForm();
    const isTokenFormValid = Object.values(get().tokenFormValidationData).every(
      (value) => value.isValid
    );

    if (isTokenFormValid) {
      const tokenResult = await createSolanaToken(get().tokenForm);
      set({ isProcessing: false });

      return tokenResult;
    }

    set({ isProcessing: false });
  },
  resetTokenForm: () =>
    set({ tokenForm: emptyTokenForm, tokenFormValidationData: initialTokenFormValidationData }),
  validateTokenForm: () => {
    const validationData = Object.keys(get().tokenFormValidationData).reduce((acc, property) => {
      let isValid = true;

      switch (property) {
        case 'logo':
          isValid = !!get().tokenForm[property];
          break;
        case 'name':
        case 'symbol':
          isValid = !!get().tokenForm[property].trim();
          break;
        case 'supply':
          isValid = !!get().tokenForm[property].trim() && Number(get().tokenForm[property]) > 0;
          break;
        default:
          isValid = true;
      }

      return { ...acc, [property]: { isValid } };
    }, {} as ITokenFormValidationData);

    set({ tokenFormValidationData: validationData });
  },
}));
