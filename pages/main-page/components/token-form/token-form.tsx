import ImageUploader from '@/components/common/image-uploader';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import PlusIcon from '@/assets/icons/plus.svg';
import RocketIcon from '@/assets/icons/rocket.svg';

import styles from './token-form.module.scss';

const TokenForm = () => {
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
            <Input placeholder="My Awesome Token" value="" onChange={() => {}} />
            <span className={styles.tokenFormInputDescription}>The display name of your token</span>
          </div>

          <div className={styles.tokenFormInputWrapper}>
            <span className={styles.tokenFormInputLabel}>Symbol</span>
            <Input placeholder="MAT" value="" onChange={() => {}} />
            <span className={styles.tokenFormInputDescription}>
              Your token&apos;s symbol (e.g., SOL, BTC)
            </span>
          </div>
        </div>

        <div className={styles.tokenFormInputs}>
          <div className={styles.tokenFormInputWrapper}>
            <span className={styles.tokenFormInputLabel}>Total Supply</span>
            <Input placeholder="1000000000" value="" onChange={() => {}} />
            <span className={styles.tokenFormInputDescription}>
              Total number of tokens to create
            </span>
          </div>

          <div className={styles.tokenFormInputWrapper}>
            <span className={styles.tokenFormInputLabel}>Decimals</span>
            <Select
              items={[
                { id: '1', value: '6' },
                { id: '2', value: '9' },
              ]}
              value="2"
              onSelect={() => {}}
            />
            <span className={styles.tokenFormInputDescription}>Number of decimal places</span>
          </div>
        </div>

        <div className={styles.tokenFormInputWrapper}>
          <span className={styles.tokenFormInputLabel}>Token Description</span>
          <Input placeholder="Describe your token..." rows={3} value="" onChange={() => {}} />
          <span className={styles.tokenFormInputDescription}>
            A brief description of your token
          </span>
        </div>

        <div className={styles.tokenFormInputWrapper}>
          <span className={styles.tokenFormInputLabel}>Token Logo</span>
          <ImageUploader onImageUpload={() => {}} />
        </div>
      </div>

      <Button icon={<RocketIcon />} label="Create Token" onClick={() => {}} />
    </div>
  );
};

export default TokenForm;
