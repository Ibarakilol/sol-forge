import type { ReactNode } from 'react';

export interface ButtonProps {
  icon?: ReactNode;
  isDisabled?: boolean;
  label: string;
  onClick: () => void;
}
