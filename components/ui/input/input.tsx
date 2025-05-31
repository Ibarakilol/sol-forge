import { type ChangeEvent, useCallback, useId, useState } from 'react';
import clsx from 'clsx';

import Placeholder from './components/placeholder';

import type { InputProps } from './input.props';

import styles from './input.module.scss';

const Input = ({
  isDisabled,
  isValid = true,
  maxLength,
  placeholder,
  rows,
  value,
  onBlur,
  onChange,
  onFocus,
}: InputProps) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = event.currentTarget.value;
      onChange(inputValue);
    },
    [onChange]
  );

  const renderInput = () => {
    return !!rows ? (
      <textarea
        className={clsx(styles.inputTextarea, 'scrollbar')}
        disabled={isDisabled}
        id={id}
        maxLength={maxLength}
        rows={rows}
        value={value}
        onBlur={handleBlur}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
    ) : (
      <input
        className={styles.inputField}
        disabled={isDisabled}
        id={id}
        maxLength={maxLength}
        value={value}
        onBlur={handleBlur}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
    );
  };

  return (
    <div
      className={clsx(styles.input, {
        [styles.inputDisabled]: isDisabled,
        [styles.inputInvalid]: !isValid,
        [styles.inputMulti]: !!rows,
      })}
    >
      {placeholder && (
        <Placeholder
          hide={!!value || isFocused}
          htmlFor={id}
          isValid={isValid}
          placeholder={placeholder}
        />
      )}
      {renderInput()}
    </div>
  );
};

export default Input;
