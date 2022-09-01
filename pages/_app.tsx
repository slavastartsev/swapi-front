import { CSSProperties } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import type { AppProps } from 'next/app';

// for safari and firefox
import 'urlpattern-polyfill';

import '../styles/reset.css';

const wapperStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const contentStyles: CSSProperties = {
  minWidth: 960,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const headTitle = 'Swapi front';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <div style={wapperStyles}>
        <main style={contentStyles}>
          <Component {...pageProps} />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
