export interface CheckboxProps {
  isChecked: boolean;
  isDisabled?: boolean;
  label?: string;
  onChange: (isChecked: boolean) => void;
}
