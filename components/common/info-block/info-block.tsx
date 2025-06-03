import { useWallet } from '@solana/wallet-adapter-react';
import clsx from 'clsx';

import WalletStub from '../wallet-stub';

import type { InfoBlockProps } from './info-block.props';

import styles from './info-block.module.scss';

const InfoBlock = ({ children, icon, infoItems, title }: InfoBlockProps) => {
  const { publicKey } = useWallet();

  return (
    <div className={styles.infoBlock}>
      <div className={styles.infoBlockHeader}>
        {icon}
        <h2 className={styles.infoBlockTitle}>{title}</h2>
      </div>
      {children}
      {!!infoItems.length && (
        <ul className={styles.infoBlockInfo}>
          {infoItems.map(({ isNetwork, key, value }) => (
            <li key={key} className={styles.infoBlockInfoItem}>
              <span className={styles.infoBlockInfoItemLabel}>{key}:</span>
              <span
                className={clsx(
                  styles.infoBlockInfoItemValue,
                  isNetwork && styles.infoBlockInfoItemValueNetwork
                )}
              >
                {value}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!publicKey && <WalletStub />}
    </div>
  );
};

export default InfoBlock;
