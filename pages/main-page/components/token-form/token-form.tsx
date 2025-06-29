import { useCallback, useEffect, useState } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import ImageUploader from '@/components/common/image-uploader';
import WalletStub from '@/components/common/wallet-stub';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import AuthorityOptions from '../authority-options';
import PlusIcon from '@/assets/icons/plus.svg';
import RocketIcon from '@/assets/icons/rocket.svg';

import { useModalStore } from '@/stores/modal-store';
import { useTokenStore } from '@/stores/token-store';

import { useNetwork } from '@/providers/wallet-context-provider';
import { ModalName, NetworkLabel, Regex } from '@/constants';
import { createSolanaToken } from '@/libs';
import { getOnlyNumbers } from '@/utils';
import type { IFile, ITokenResult } from '@/interfaces';

import styles from './token-form.module.scss';

const TokenForm = () => {
  const { isProcessing, tokenForm, tokenFormValidationData, createToken, changeTokenForm } =
    useTokenStore();
  const { showModal } = useModalStore();
  const { network, setNetwork } = useNetwork();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [tokenResult, setTokenResult] = useState<ITokenResult | null>(null);
  const isWalletConnected = !(!publicKey || !signTransaction);

  const handleCreateSolanaToken = async () => {
    if (isWalletConnected) {
      const handleCreateToken = createSolanaToken(connection, publicKey, signTransaction);
      const createTokenResult = await createToken(handleCreateToken);

      if (createTokenResult) {
        setTokenResult(createTokenResult);
      }
    }
  };

  useEffect(() => {
    if (tokenResult) {
      const { data, isSuccess } = tokenResult;

      if (isSuccess) {
        showModal(ModalName.TOKEN, {
          mint: data,
          onModalClose: () => setTokenResult(null),
        });
      } else {
        showModal(ModalName.WARNING, { errorText: data, onModalClose: () => setTokenResult(null) });
      }
    }
  }, [showModal, tokenResult]);

  const validateTokenNaming = (value: string) => {
    if (value.match(Regex.TOKEN_NAME)) {
      return value;
    } else {
      return '';
    }
  };

  const handleImageUpload = useCallback(
    (image: IFile) => {
      changeTokenForm('logo')(image);
    },
    [changeTokenForm]
  );

  return (
    <div className={styles.tokenForm}>
      <div className={styles.tokenFormHeader}>
        <PlusIcon className={styles.tokenFormIcon} />
        <h2 className={styles.tokenFormTitle}>Token Creation</h2>
      </div>

      <div className={styles.tokenFormWrapper}>
        <div className={styles.tokenFormInputs}>
          <div className={styles.tokenFormInputWrapper}>
            <span className={styles.tokenFormInputLabel}>Token Name</span>
            <Input
              isDisabled={isProcessing}
              isValid={tokenFormValidationData.name.isValid}
              placeholder="My Awesome Token"
              value={tokenForm.name}
              onChange={(value) => changeTokenForm('name')(validateTokenNaming(value))}
            />
            <span className={styles.tokenFormInputDescription}>The display name of your token</span>
          </div>

          <div className={styles.tokenFormInputWrapper}>
            <span className={styles.tokenFormInputLabel}>Symbol</span>
            <Input
              isDisabled={isProcessing}
              isValid={tokenFormValidationData.symbol.isValid}
              placeholder="MAT"
              value={tokenForm.symbol}
              onChange={(value) =>
                changeTokenForm('symbol')(validateTokenNaming(value.trim().toUpperCase()))
              }
            />
            <span className={styles.tokenFormInputDescription}>
              Your token&apos;s symbol (e.g., SOL, BTC)
            </span>
          </div>
        </div>

        <div className={styles.tokenFormInputs}>
          <div className={styles.tokenFormInputWrapper}>
            <span className={styles.tokenFormInputLabel}>Total Supply</span>
            <Input
              isDisabled={isProcessing}
              isValid={tokenFormValidationData.supply.isValid}
              maxLength={10}
              placeholder="1000000000"
              value={tokenForm.supply}
              onChange={(value) => changeTokenForm('supply')(getOnlyNumbers(value))}
            />
            <span className={styles.tokenFormInputDescription}>Total number of tokens to mint</span>
          </div>

          <div className={styles.tokenFormInputWrapper}>
            <span className={styles.tokenFormInputLabel}>Decimals</span>
            <Select
              isDisabled={isProcessing}
              items={[
                { id: '0', value: '0 (No decimals)' },
                { id: '6', value: '6 (USDC standart)' },
                { id: '9', value: '9 (SOL standart)' },
                { id: '18', value: '18 (Ethereum standart)' },
              ]}
              value={tokenForm.decimals}
              onSelect={changeTokenForm('decimals')}
            />
            <span className={styles.tokenFormInputDescription}>Number of decimal places</span>
          </div>
        </div>

        <div className={styles.tokenFormInputWrapper}>
          <span className={styles.tokenFormInputLabel}>Network</span>
          <Select
            isDisabled={isProcessing}
            items={[
              { id: WalletAdapterNetwork.Devnet, value: NetworkLabel[WalletAdapterNetwork.Devnet] },
              {
                id: WalletAdapterNetwork.Mainnet,
                value: NetworkLabel[WalletAdapterNetwork.Mainnet],
              },
            ]}
            value={network}
            onSelect={(network) => setNetwork(network as WalletAdapterNetwork)}
          />
          <span className={styles.tokenFormInputDescription}>
            Choose the Solana network for token deployment
          </span>
        </div>

        <div className={styles.tokenFormInputWrapper}>
          <span className={styles.tokenFormInputLabel}>Token Description</span>
          <Input
            isDisabled={isProcessing}
            maxLength={512}
            placeholder="Describe your token..."
            rows={3}
            value={tokenForm.description || ''}
            onChange={changeTokenForm('description')}
          />
          <span className={styles.tokenFormInputDescription}>
            A brief description of your token
          </span>
        </div>

        <div className={styles.tokenFormInputWrapper}>
          <span className={styles.tokenFormInputLabel}>Token Logo</span>
          <ImageUploader
            isDisabled={isProcessing}
            isValid={tokenFormValidationData.logo.isValid}
            onImageUpload={handleImageUpload}
          />
        </div>
      </div>

      <AuthorityOptions />

      <Button
        icon={<RocketIcon />}
        isDisabled={isProcessing}
        label="Create Token"
        onClick={handleCreateSolanaToken}
      />

      {!isWalletConnected && <WalletStub />}
    </div>
  );
};

export default TokenForm;
