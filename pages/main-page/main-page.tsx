import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import InfoBlock from '@/components/common/info-block';
import TokenForm from './components/token-form';
import TokenPreview from './components/token-preview';
import EyeIcon from '@/assets/icons/eye.svg';

import { useTokenStore } from '@/stores/token-store';

import { useNetwork } from '@/providers/wallet-context-provider';
import { NetworkLabel } from '@/constants';

import styles from './main-page.module.scss';

const MainPage = () => {
  const { tokenForm } = useTokenStore();
  const { network } = useNetwork();

  const tokenInfoItems = [
    {
      key: 'Supply',
      value: tokenForm.supply || '0',
    },
    {
      key: 'Decimals',
      value: tokenForm.decimals,
    },
    {
      isNetwork: true,
      key: 'Network',
      value: NetworkLabel[network],
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
