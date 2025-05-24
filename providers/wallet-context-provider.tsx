'use client';

import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import { SOLANA_NETWORK, SOLANA_NETWORK_URL } from '@/constants';

require('@solana/wallet-adapter-react-ui/styles.css');

const NetworkContext = createContext({
  network: SOLANA_NETWORK.DEVNET,
  setNetwork: (_: SOLANA_NETWORK) => {},
});

export const useNetwork = () => useContext(NetworkContext);

const WalletContextProvider = ({ children }: { children: ReactNode }) => {
  const [network, setNetwork] = useState<SOLANA_NETWORK>(SOLANA_NETWORK.DEVNET);
  const endpoint = SOLANA_NETWORK_URL[network];

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider autoConnect wallets={wallets}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </NetworkContext.Provider>
  );
};

export default WalletContextProvider;
