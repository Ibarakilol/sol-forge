import styles from './wallet-stub.module.scss';

const WalletStub = () => {
  return (
    <div className={styles.walletStub}>
      <span className={styles.walletStubLock}>🔒</span>
      <span className={styles.walletStubTitle}>Connect Your Wallet</span>
      <p className={styles.walletStubDescription}>Connect your wallet to create token</p>
    </div>
  );
};

export default WalletStub;
