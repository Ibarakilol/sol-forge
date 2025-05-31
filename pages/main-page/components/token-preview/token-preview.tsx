import Image from 'next/image';

import { useTokenStore } from '@/stores/token-store';

import styles from './token-preview.module.scss';

const TokenPreview = () => {
  const { tokenForm } = useTokenStore();

  return (
    <div className={styles.tokenPreview}>
      <Image
        alt={tokenForm.name || 'Token Placeholder'}
        className={styles.tokenPreviewImage}
        height={40}
        src={tokenForm.logo?.fileUrl || '/placeholder.png'}
        width={40}
      />
      <div className={styles.tokenPreviewText}>
        <span className={styles.tokenPreviewName}>{tokenForm.name || 'Token Name'}</span>
        <span className={styles.tokenPreviewSymbol}>{tokenForm.symbol || 'SYMBOL'}</span>
      </div>
    </div>
  );
};

export default TokenPreview;
