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
