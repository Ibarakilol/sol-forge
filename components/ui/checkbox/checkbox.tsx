import { type FormEvent, type KeyboardEvent, useId } from 'react';
import clsx from 'clsx';

import { Key } from '@/constants';
import type { CheckboxProps } from './checkbox.props';

import styles from './checkbox.module.scss';

const Checkbox = ({ isChecked, isDisabled, label, onChange }: CheckboxProps) => {
  const id = useId();

  const handleChange = (evt: FormEvent<HTMLInputElement>) => onChange(evt.currentTarget.checked);

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === Key.ENTER) {
      onChange(evt.currentTarget.checked);
    }
  };

  return (
    <div
      className={clsx(styles.checkbox, label && styles.checkboxWithLabel, {
        [styles.checkboxChecked]: isChecked,
        [styles.checkboxDisabled]: isDisabled,
      })}
      onClick={(evt) => evt.stopPropagation()}
    >
      <input
        checked={isChecked}
        className={styles.checkboxInput}
        disabled={isDisabled}
        id={id}
        type="checkbox"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <span className={styles.checkboxWrapper}>
        <label className={styles.checkboxLabel} htmlFor={id}>
          <span className={styles.checkboxIconWrapper}>
            <span className={styles.checkboxIconSquare}>
              <span className={styles.checkboxIconCheck} />
            </span>
          </span>
          {label && <span className={styles.checkboxLabelText}>{label}</span>}
        </label>
      </span>
    </div>
  );
};

export default Checkbox;
