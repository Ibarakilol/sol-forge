export interface InputProps {
  isDisabled?: boolean;
  isValid?: boolean;
  maxLength?: number;
  placeholder?: string;
  rows?: number;
  textError?: string;
  value: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
  onFocus?: () => void;
}
