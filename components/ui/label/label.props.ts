import type { DetailedHTMLProps, LabelHTMLAttributes } from 'react';

export interface LabelProps
  extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  htmlFor?: string;
  isDisabled?: boolean;
  isPlaceholder?: boolean;
  isValid?: boolean;
  label?: string;
}
