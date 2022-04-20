import type { NextPage } from "next";
import {
  HStack,
  VStack,
  Image,
  chakra,
  Heading,
  Text,
  Box,
  Container,
} from "@chakra-ui/react";
import PageLayout from "../components/layout/page";
import SearchBar from "../components/input/search-bar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { termFilter } from "../filter/termConfig";
import DailyWord from "../components/daily-word/daily-word";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <Container maxW={{ base: "sm", sm: "xl" }} marginTop="-65px">
        <VStack spacing={5}>
          <Image
            title="glosseta-logo"
            src="/glosseta.png"
            alt="Glosseta logo"
            width={300}
          />
        </VStack>
      </Container>
      <chakra.main>
        <Container
          title="glosseta-landing-page"
          maxW={{ base: "sm", sm: "xl" }}
          marginTop="-65px"
        >
          <VStack>
            <HStack marginBottom="60px">
              <DailyWord words={termFilter}/>
            </HStack>
            <HStack spacing={3}>
              <SearchBar
                baseWidth={"80vw"}
                smWidth={"50vw"}
                mdWidth={"50vw"}
                lgWidth={"30vw"}
                filterItems={termFilter}
              />
            </HStack>
            <HStack spacing={3}>
              <Box width="100%" letterSpacing="wide">
                <Text
                  textAlign="center"
                  padding={2}
                  fontSize={{ base: "xs", md: "sm" }}
                  color="white"
                >
                  {t("glossetaDescription")}
                </Text>
              </Box>
            </HStack>
          </VStack>
        </Container>
      </chakra.main>
    </PageLayout>
  );
};

export async function getStaticProps({ locale }: any) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
    revalidate: 1200, // In seconds
  };
}

export default Home;
