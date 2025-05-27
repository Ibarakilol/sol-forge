import clsx from 'clsx';
import Image from 'next/image';

import EyeIcon from '@/assets/icons/eye.svg';

import { useTokenStore } from '@/stores/token-store';

import styles from './token-preview.module.scss';

const TokenPreview = () => {
  const { token } = useTokenStore();

  return (
    <div className={styles.tokenPreview}>
      <div className={styles.tokenPreviewHeader}>
        <EyeIcon className={styles.tokenPreviewIcon} />
        <h2 className={styles.tokenPreviewTitle}>Token Preview</h2>
      </div>
      <div className={styles.tokenPreviewToken}>
        <Image
          alt="Token Placeholder"
          className={styles.tokenPreviewTokenImage}
          height={40}
          src="/placeholder.png"
          width={40}
        />
        <div className={styles.tokenPreviewTokenText}>
          <span className={styles.tokenPreviewTokenName}>Token Name</span>
          <span className={styles.tokenPreviewTokenSymbol}>SYMBOL</span>
        </div>
      </div>
      <ul className={styles.tokenPreviewInfo}>
        <li className={styles.tokenPreviewInfoItem}>
          <span className={styles.tokenPreviewInfoItemLabel}>Supply:</span>
          <span className={styles.tokenPreviewInfoItemValue}>0</span>
        </li>
        <li className={styles.tokenPreviewInfoItem}>
          <span className={styles.tokenPreviewInfoItemLabel}>Decimals:</span>
          <span className={styles.tokenPreviewInfoItemValue}>9</span>
        </li>
        <li className={styles.tokenPreviewInfoItem}>
          <span className={styles.tokenPreviewInfoItemLabel}>Network:</span>
          <span
            className={clsx(
              styles.tokenPreviewInfoItemValue,
              styles.tokenPreviewInfoItemValueNetwork
            )}
          >
            Devnet
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TokenPreview;
