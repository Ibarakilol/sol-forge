import Modal from './modal';

import { useModalStore } from '@/stores/modal-store';

const Modals = () => {
  const { activeModal } = useModalStore();

  const renderModal = () => {
    if (!activeModal) {
      return null;
    }

    return <Modal modalName={activeModal} />;
  };

  return <>{renderModal()}</>;
};

export default Modals;
