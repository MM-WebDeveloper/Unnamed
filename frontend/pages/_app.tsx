import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '../components/Footer';
import Head from 'next/head';
import { createClient, Provider } from 'urql';
import { UserProvider } from '../context';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: { credentials: 'include' },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <UserProvider>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <title>PhotoDiary</title>
        </Head>
        <Component {...pageProps} />
        <Footer />
      </UserProvider>
    </Provider>
  );
}
export default MyApp;
