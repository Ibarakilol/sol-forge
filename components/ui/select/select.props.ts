import type { ISelectOption } from '@/interfaces';

export interface SelectProps {
  isDisabled?: boolean;
  isOptional?: boolean;
  items: ISelectOption[];
  value: string;
  onSelect: (id: string, value: ISelectOption | null) => void;
}
