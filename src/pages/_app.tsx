import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import { useTranslation } from 'next-i18next';

function SEO() {
  const {t} = useTranslation();

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{t("glossetaTitle")}</title>
      <meta
        name="description"
        content={t("glossetaDescription")}
      />
      <link rel="icon" href="/glosseta_icon.png" />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.glosseta.com" />
      <meta property="og:title" content={t("glossetaTitle")} />
      <meta property="og:description" content={t("glossetaDescription")}/>
      <meta property="og:image" content="https://www.glosseta.com/glosseta_social_banner.png" />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.glosseta.com" />
      <meta property="twitter:title" content={t("glossetaTitle")} />
      <meta property="twitter:description" content={t("glossetaDescription")} />
      <meta property="twitter:image" content="https://www.glosseta.com/glosseta_social_banner.png" />
      <script
        defer
        data-domain="glosseta.com"
        src="https://plausible.io/js/plausible.js"
      ></script>
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
