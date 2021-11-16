import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from 'next-i18next';

function SEO() {
  return (
    <Head>
      <title>Glosseta</title>
      <meta
        name="description"
        content="The metaverse's glossary into web3 terms and lingo"
      />
      <link rel="icon" href="/glosseta_icon.png" />
      <script defer data-domain="glosseta.com" src="https://plausible.io/js/plausible.js"></script>
    </Head>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
export default appWithTranslation(MyApp);
