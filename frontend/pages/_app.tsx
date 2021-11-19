import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/graphql',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Test</title>
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
export default MyApp;
