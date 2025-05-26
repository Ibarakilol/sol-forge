import clsx from 'clsx';

import type { LogoProps } from './logo.props';

import styles from './logo.module.scss';

const Logo = ({ isSmall }: LogoProps) => {
  return <span className={clsx(styles.logo, isSmall && styles.logoSmall)}>SolForge</span>;
};

export default Logo;
