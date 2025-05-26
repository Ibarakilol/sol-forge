import { useWallet } from '@solana/wallet-adapter-react';

import Button from '@/components/ui/button';
import WalletIcon from '@/assets/icons/wallet.svg';

import styles from './header.module.scss';

const Header = () => {
  const { publicKey } = useWallet();

  return (
    <header className={styles.header}>
      <span className={styles.headerTitle}>SolForge</span>
      <Button
        className={styles.headerWalletButton}
        icon={<WalletIcon />}
        label={publicKey ? publicKey.toBase58() : 'Connect Wallet'}
        onClick={() => {}}
      />
    </header>
  );
};

export default Header;
