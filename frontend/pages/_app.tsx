import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Nav from '../components/Navbar';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Test</title>
      </Head>
      <Nav />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
