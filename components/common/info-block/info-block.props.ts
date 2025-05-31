import type { ReactNode } from 'react';

interface InfoBlockItem {
  isNetwork?: boolean;
  key: string;
  value: string;
}

export interface InfoBlockProps {
  children?: ReactNode;
  icon: ReactNode;
  infoItems: InfoBlockItem[];
  title: string;
}
