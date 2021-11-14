import type { NextPage } from "next";
import { HStack, VStack, Image, chakra, Heading } from "@chakra-ui/react";
import PageLayout from "./components/layout/page";
import SearchBar from "./search/search-bar";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <chakra.main>
        <VStack>
          <Image src="/glosseta.png" alt="Glosseta logo" width={300} />
          <Heading padding={1} color="white">
            {t('web3GlossaryHeading')}
          </Heading>
          <HStack spacing={3}>
            <SearchBar baseWidth={"80vw"} smWidth={"30vw"}/>
          </HStack>
        </VStack>
      </chakra.main>
    </PageLayout>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
