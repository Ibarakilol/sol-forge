import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export const NetworkLabel = {
  [WalletAdapterNetwork.Devnet]: 'Devnet',
  [WalletAdapterNetwork.Mainnet]: 'Mainnet Beta',
  [WalletAdapterNetwork.Testnet]: 'Testnet',
};
