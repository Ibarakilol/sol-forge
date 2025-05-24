import clsx from 'clsx';

import type { ButtonProps } from './button.props';

import styles from './button.module.scss';

const Button = ({ icon, isDisabled, label, onClick }: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, icon && styles.buttonWithIcon)}
      disabled={isDisabled}
      onClick={onClick}
    >
      {icon && <span className={styles.buttonIcon}>{icon}</span>}
      <span className={styles.buttonLabel}>{label}</span>
    </button>
  );
};

export default Button;
