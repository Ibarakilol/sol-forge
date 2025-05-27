import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import TokenForm from './components/token-form';
import TokenPreview from './components/token-preview';

import styles from './main-page.module.scss';

const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <Header />
      <main className={styles.mainPageWrapper}>
        <div className={styles.mainPageIntro}>
          <h1 className={styles.mainPageTitle}>Create Your Solana Token</h1>
          <p className={styles.mainPageMoto}>From concept to token in just a few clicks!</p>
        </div>
        <div className={styles.mainPageContent}>
          <TokenForm />
          <TokenPreview />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
