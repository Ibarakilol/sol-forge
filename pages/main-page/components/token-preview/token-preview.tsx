import Image from 'next/image';

import styles from './token-preview.module.scss';

const TokenPreview = () => {
  return (
    <div className={styles.tokenPreview}>
      <Image
        alt="Token Placeholder"
        className={styles.tokenPreviewImage}
        height={40}
        src="/placeholder.png"
        width={40}
      />
      <div className={styles.tokenPreviewText}>
        <span className={styles.tokenPreviewName}>Token Name</span>
        <span className={styles.tokenPreviewSymbol}>SYMBOL</span>
      </div>
    </div>
  );
};

export default TokenPreview;
