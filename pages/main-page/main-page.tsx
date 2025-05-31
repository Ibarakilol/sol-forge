import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import InfoBlock from '@/components/common/info-block';
import TokenForm from './components/token-form';
import TokenPreview from './components/token-preview';
import EyeIcon from '@/assets/icons/eye.svg';
import NetworkIcon from '@/assets/icons/network.svg';

import styles from './main-page.module.scss';

const MainPage = () => {
  const tokenInfoItems = [
    {
      key: 'Supply',
      value: '0',
    },
    {
      key: 'Decimals',
      value: '9',
    },
    {
      isNetwork: true,
      key: 'Network',
      value: 'Devnet',
    },
  ];

  const networkInfoItems = [
    {
      isNetwork: true,
      key: 'Network',
      value: 'Devnet',
    },
    {
      key: 'TPS',
      value: '2 860',
    },
    {
      key: 'Slot',
      value: '234 839 613',
    },
    {
      key: 'Epoch',
      value: '458',
    },
  ];

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
          <div className={styles.mainPageSidebar}>
            <InfoBlock icon={<EyeIcon />} infoItems={tokenInfoItems} title="Token Preview">
              <TokenPreview />
            </InfoBlock>
            <InfoBlock icon={<NetworkIcon />} infoItems={networkInfoItems} title="Network Status" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
