import type { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ExternalLinkProps
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
  href: string;
  isDecorated?: boolean;
  withHover?: boolean;
}
