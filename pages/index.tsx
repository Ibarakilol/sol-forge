import { Roboto } from 'next/font/google';
import Head from 'next/head';

import Modals from '@/components/modals';
import MainPage from './main-page';

import WalletContextProvider from '@/providers/wallet-context-provider';

const fontSans = Roboto({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>SolForge</title>
        <meta content="Launch your own token on Solana with advanced features" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <WalletContextProvider>
        <div className={fontSans.variable}>
          <MainPage />
          <Modals />
        </div>
      </WalletContextProvider>
    </>
  );
}
