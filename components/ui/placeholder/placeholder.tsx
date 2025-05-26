import type { PlaceholderProps } from './placeholder.props';

import styles from './placeholder.module.scss';

const Placeholder = ({ hide, htmlFor, placeholder }: PlaceholderProps) => {
  if (hide || !placeholder) {
    return null;
  }

  return htmlFor ? (
    <label className={styles.placeholder} htmlFor={htmlFor}>
      {placeholder}
    </label>
  ) : (
    <span className={styles.placeholder}>{placeholder}</span>
  );
};

export default Placeholder;
