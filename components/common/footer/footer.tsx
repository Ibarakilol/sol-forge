import Logo from '../logo';

import styles from './footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Logo />
        <p className={styles.footerInfo}>
          The most advanced Solana token creation platform. Create, manage, and distribute SPL
          tokens with enterprise-grade security and reliability.
        </p>
      </div>
      <span className={styles.footerCopyrights}>
        © {currentYear} SolForge. Built with ❤️ on Next.js + Solana.
      </span>
    </footer>
  );
};

export default Footer;
