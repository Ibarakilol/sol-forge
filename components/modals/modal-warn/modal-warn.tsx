import Button from '@/components/ui/button';

import { useModalStore } from '@/stores/modal-store';

import type { ICommonModalProps } from '@/interfaces';

import styles from './modal-warn.module.scss';

const ModalWarn = ({ onCloseButtonClick }: ICommonModalProps) => {
  const { modalState } = useModalStore();
  const { errorText, onModalClose } = modalState!;

  const handleCloseButtonClick = () => {
    onModalClose();
    onCloseButtonClick();
  };

  return (
    <div className={styles.modalWarn}>
      <div className={styles.modalWarnInfo}>
        <span className={styles.modalWarnTitle}>Something went wrong</span>
        <p className={styles.modalWarnText}>{errorText}</p>
      </div>
      <Button label="Close" onClick={handleCloseButtonClick} />
    </div>
  );
};

export default ModalWarn;
