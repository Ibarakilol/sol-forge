export enum SOLANA_NETWORK {
  DEVNET = 'devnet',
  MAINNET = 'mainnet',
}

export const SOLANA_NETWORK_URL = {
  [SOLANA_NETWORK.DEVNET]: 'https://api.devnet.solana.com',
  [SOLANA_NETWORK.MAINNET]: 'https://api.mainnet-beta.solana.com',
};
