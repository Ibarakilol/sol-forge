import { forwardRef } from 'react';
import clsx from 'clsx';

import type { SelectDropdownProps } from './select-dropdown.props';

import styles from './select-dropdown.module.scss';

const SelectDropdown = forwardRef<HTMLDivElement, SelectDropdownProps>(
  ({ isOptional, items, position = 'bottom', value, handleChange }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.selectDropdown,
          position === 'bottom' ? styles.selectDropdownBottom : styles.selectDropdownTop
        )}
      >
        <div className={clsx(styles.selectDropdownWrapper, 'scrollbar')}>
          <div className={styles.selectDropdownContainer}>
            {isOptional && (
              <button className={styles.selectDropdownItem} onClick={() => handleChange(null)}>
                -
              </button>
            )}
            {items.map((item) => (
              <button
                key={item.id}
                className={clsx(styles.selectDropdownItem, {
                  [styles.selectDropdownItemActive]: item.id === value,
                  [styles.selectDropdownItemEmpty]: !item.value,
                })}
                onClick={() => handleChange(item)}
              >
                {item.value}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

SelectDropdown.displayName = 'SelectDropdown';
export default SelectDropdown;
