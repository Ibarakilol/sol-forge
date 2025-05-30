import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';

import Button from '@/components/ui/button';

import type { ICommonModalProps } from '@/interfaces';

import styles from './modal-wallets.module.scss';

const ModalWallets = ({ onCloseButtonClick }: ICommonModalProps) => {
  const { wallets, select } = useWallet();
  const installedWallets = wallets.filter((wallet) => wallet.readyState === 'Installed');

  const handleSelectWallet = (walletName: any) => {
    select(walletName);
    onCloseButtonClick();
  };

  return (
    <div className={styles.modalWallets}>
      <span className={styles.modalWalletsTitle}>Connect a wallet on Solana to continue</span>
      {!!installedWallets.length ? (
        <div className={styles.modalWalletsList}>
          {wallets
            .filter((wallet) => wallet.readyState === 'Installed')
            .map((wallet) => (
              <Button
                key={wallet.adapter.name}
                icon={
                  <Image
                    alt={wallet.adapter.name}
                    height={20}
                    src={wallet.adapter.icon}
                    width={20}
                  />
                }
                label={wallet.adapter.name}
                onClick={() => handleSelectWallet(wallet.adapter.name)}
              />
            ))}
        </div>
      ) : (
        <span className={styles.modalWalletsWarning}>
          No wallet found. Please download a supported Solana wallet
        </span>
      )}
    </div>
  );
};

export default ModalWallets;
