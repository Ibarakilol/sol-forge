import { useWallet } from '@solana/wallet-adapter-react';

import Button from '@/components/ui/button';
import WalletIcon from '@/assets/icons/wallet.svg';

import { useModalStore } from '@/stores/modal-store';

import { ModalName } from '@/constants';

import styles from './header.module.scss';

const Header = () => {
  const { publicKey, disconnect } = useWallet();
  const { showModal } = useModalStore();

  const handleButtonClick = () => {
    if (publicKey) {
      disconnect();
    } else {
      showModal(ModalName.WALLETS);
    }
  };

  return (
    <header className={styles.header}>
      <span className={styles.headerTitle}>SolForge</span>
      <Button
        className={styles.headerWalletButton}
        icon={<WalletIcon />}
        label={publicKey ? publicKey.toBase58() : 'Connect Wallet'}
        onClick={handleButtonClick}
      />
    </header>
  );
};

export default Header;
