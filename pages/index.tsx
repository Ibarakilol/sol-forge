import { Roboto } from 'next/font/google';
import Head from 'next/head';

const fontSans = Roboto({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Sol Forge</title>
        <meta content="Launch your own token on Solana with advanced features" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className={fontSans.variable}></div>
    </>
  );
}
