import type { IFile } from './file.interface';

export interface ITokenForm {
  decimals: string;
  description?: string;
  freezeAuthority: boolean;
  logo?: IFile;
  mintAuthority: boolean;
  name: string;
  supply: string;
  symbol: string;
  updateAuthority: boolean;
}

export interface ITokenFormValidationData {
  decimals: { isValid: boolean };
  description: { isValid: boolean };
  freezeAuthority: { isValid: boolean };
  logo: { isValid: boolean };
  mintAuthority: { isValid: boolean };
  name: { isValid: boolean };
  supply: { isValid: boolean };
  symbol: { isValid: boolean };
  updateAuthority: { isValid: boolean };
}
