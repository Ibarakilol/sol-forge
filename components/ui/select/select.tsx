import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

import SelectDropdown from './components/select-dropdown';
import ChevronDown from '@/assets/icons/chevron-down.svg';

import { useElementPosition, useOnClickOutside } from '@/hooks';
import type { ISelectOption } from '@/interfaces';
import type { SelectProps } from './select.props';

import styles from './select.module.scss';

const Select = ({ isDisabled, isOptional, items, value, onSelect }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectDropdownHeight, setSelectDropdownHeight] = useState<number>(0);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const selectDropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownPosition = useElementPosition(selectRef, selectDropdownHeight);

  useEffect(() => {
    if (selectDropdownRef.current) {
      setSelectDropdownHeight(selectDropdownRef.current.offsetHeight);
    }
  }, [isOpen]);

  useOnClickOutside([selectRef, selectDropdownRef], () => setIsOpen(false), !isOpen);

  const handleClick = () => setIsOpen(!isOpen);

  const handleChange = (item: ISelectOption | null) => {
    onSelect(item?.id ?? '', item);
    setIsOpen(false);
  };

  const currentValueLabel = useMemo(() => {
    return items.find((item) => item.id === value)?.value || '';
  }, [items, value]);

  return (
    <div
      ref={selectRef}
      className={clsx(styles.select, {
        [styles.selectDisabled]: isDisabled,
        [styles.selectOpen]: isOpen,
      })}
    >
      <button className={styles.selectButton} disabled={isDisabled} onClick={handleClick}>
        <span className={styles.selectValue}>{currentValueLabel}</span>
        <ChevronDown className={styles.selectIcon} />
      </button>
      {isOpen && (
        <SelectDropdown
          ref={selectDropdownRef}
          handleChange={handleChange}
          isOptional={isOptional}
          items={items}
          position={dropdownPosition}
          value={value}
        />
      )}
    </div>
  );
};

export default Select;
