import clsx from 'clsx';

import type { LabelProps } from './label.props';

import styles from './label.module.scss';

const Label = ({
  htmlFor,
  isDisabled,
  isPlaceholder,
  isValid = true,
  label,
  ...props
}: LabelProps) => {
  return label ? (
    <label
      className={clsx(styles.label, {
        [styles.labelDisabled]: isDisabled,
        [styles.labelInvalid]: !isValid,
        [styles.labelPlaceholder]: isPlaceholder,
      })}
      htmlFor={htmlFor}
      {...props}
    >
      {label}
    </label>
  ) : null;
};

export default Label;
