import Checkbox from '@/components/ui/checkbox';
import SettingsIcon from '@/assets/icons/settings.svg';

import { useTokenStore } from '@/stores/token-store';

import styles from './authority-options.module.scss';

const AuthorityOptions = () => {
  const { tokenForm, changeTokenForm } = useTokenStore();

  return (
    <div className={styles.authorityOptions}>
      <div className={styles.authorityOptionsHeader}>
        <SettingsIcon className={styles.authorityOptionsIcon} />
        <h2 className={styles.authorityOptionsTitle}>Authority Revoke Options</h2>
      </div>
      <ul className={styles.authorityOptionsList}>
        <li className={styles.authorityOptionsItem}>
          <Checkbox
            isChecked={tokenForm.freezeAuthority}
            label="Revoke Freeze Authority"
            onChange={changeTokenForm('freezeAuthority')}
          />
          <span className={styles.authorityOptionsDescription}>
            Freeze Authority allows you to freeze token accounts of holders
          </span>
        </li>
        <li className={styles.authorityOptionsItem}>
          <Checkbox
            isChecked={tokenForm.mintAuthority}
            label="Revoke Mint Authority"
            onChange={changeTokenForm('mintAuthority')}
          />
          <span className={styles.authorityOptionsDescription}>
            Mint Authority allows you to mint more more supply of your token
          </span>
        </li>
        <li className={styles.authorityOptionsItem}>
          <Checkbox
            isChecked={tokenForm.updateAuthority}
            label="Revoke Update Authority"
            onChange={changeTokenForm('updateAuthority')}
          />
          <span className={styles.authorityOptionsDescription}>
            Update Authority allows you to update the token metadata about your token
          </span>
        </li>
      </ul>
    </div>
  );
};

export default AuthorityOptions;
