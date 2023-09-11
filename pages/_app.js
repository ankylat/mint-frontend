import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import { Rubik, Righteous } from 'next/font/google';
import Head from 'next/head';
import Modal from 'react-modal';
import ErrorBoundary from '../components/ErrorBoundary';
import { Ethereum } from '@thirdweb-dev/chains';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  trustWallet,
} from '@thirdweb-dev/react';

import { useRouter } from 'next/router';

const rubik = Rubik({ subsets: ['latin'] });
const righteous = Righteous({ subsets: ['latin'], weight: ['400'] });

//aloja

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ErrorBoundary>
      <ThirdwebProvider
        supportedWallets={[metamaskWallet(), coinbaseWallet(), trustWallet()]}
        clientId='599b25aaf4ecdc0bd8bcb2dfc50000a9'
        activeChain={Ethereum}
        supportedChains={[Ethereum]}
      >
        <Head>
          <title>anky genesis</title>
        </Head>
        <main className={`${righteous.className} h-full`}>
          <>
            <Navbar />
            <Component {...pageProps} />
          </>
        </main>
      </ThirdwebProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
