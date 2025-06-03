import { type FC, useRef } from 'react';
import clsx from 'clsx';

import ModalWallets from '../modal-wallets';
import ModalWarn from '../modal-warn';

import { useModalStore } from '@/stores/modal-store';

import { Key, ModalName } from '@/constants';
import {
  useKeyUpGlobal,
  useOnClickOutside,
  useUnmountAnimation,
  useWindowScrollBlock,
} from '@/hooks';
import type { ICommonModalProps } from '@/interfaces';
import type { ModalProps } from './modal.props';

import styles from './modal.module.scss';

const MODAL_COMPONENTS: Record<ModalName, FC<ICommonModalProps>> = {
  [ModalName.WALLETS]: ModalWallets,
  [ModalName.WARNING]: ModalWarn,
};

const Modal = ({ modalName }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { closeModal } = useModalStore();
  const { isUnmounting, onAnimationEnd, unmountComponent } = useUnmountAnimation(closeModal);

  useOnClickOutside(modalRef, unmountComponent);
  useKeyUpGlobal(Key.ESCAPE, (evt) => {
    evt.stopPropagation();
    unmountComponent();
  });
  useWindowScrollBlock(true);

  const ModalComponent = MODAL_COMPONENTS[modalName] || null;

  return (
    <div className={clsx(styles.modal, isUnmounting && styles.modalHiding)}>
      <div ref={modalRef} className={styles.modalWrapper} onAnimationEnd={onAnimationEnd}>
        <ModalComponent onCloseButtonClick={unmountComponent} />
      </div>
    </div>
  );
};

export default Modal;
