import clsx from 'clsx';

import type { ExternalLinkProps } from './external-link.props';

import styles from './external-link.module.scss';

const ExternalLink = ({
  children,
  className,
  href,
  isDecorated,
  withHover,
  ...props
}: ExternalLinkProps) => {
  return (
    <a
      className={clsx(
        styles.externalLink,
        isDecorated && styles.externalLinkDecorated,
        withHover && styles.externalLinkWithHover,
        className
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
