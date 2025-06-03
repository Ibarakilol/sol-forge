import { useCallback } from 'react';

import ExternalLink from '@/components/common/external-link';
import Button from '@/components/ui/button';
import CopyIcon from '@/assets/icons/copy.svg';

import { useModalStore } from '@/stores/modal-store';

import { copyToClipboard } from '@/utils';
import type { ICommonModalProps } from '@/interfaces';

import styles from './modal-token.module.scss';

const ModalToken = ({ onCloseButtonClick }: ICommonModalProps) => {
  const { modalState } = useModalStore();
  const { mint, onModalClose } = modalState!;

  const handleCloseButtonClick = () => {
    onModalClose();
    onCloseButtonClick();
  };

  const handleCopyClick = useCallback(() => {
    void copyToClipboard(mint);
  }, [mint]);

  return (
    <div className={styles.modalToken}>
      <div className={styles.modalTokenHeader}>
        <span className={styles.modalTokenTitle}>Your token has been CREATED!</span>
        <span className={styles.modalTokenMint} onClick={handleCopyClick}>
          <CopyIcon className={styles.modalTokenMintIcon} />
          {mint}
        </span>
      </div>
      <div className={styles.modalTokenLinks}>
        <ExternalLink
          className={styles.modalTokenLink}
          href="https://raydium.io/liquidity/create-pool/"
        >
          Create Liquidity Pool
        </ExternalLink>
        <ExternalLink
          className={styles.modalTokenLink}
          href={`https://dexscreener.com/solana/${mint}`}
        >
          View on Explorer
        </ExternalLink>
        <ExternalLink className={styles.modalTokenLink} href={`https://solscan.io/token/${mint}`}>
          View on Solscan
        </ExternalLink>
      </div>
      <Button label="Close" onClick={handleCloseButtonClick} />
    </div>
  );
};

export default ModalToken;
