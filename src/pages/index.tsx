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
import PageLayout from "./components/layout/page";
import SearchBar from "./search/search-bar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <Container maxW={{ base: "sm", sm: "xl" }} marginTop="-25px">
        <VStack spacing={5}>
          <Image src="/glosseta.png" alt="Glosseta logo" width={300} />
        </VStack>
      </Container>
      <chakra.main>
        <Container maxW={{ base: "sm", sm: "xl" }} marginTop="-35px">
          <VStack>
            <Heading as="h1" padding={1} color="white" textAlign="center">
              {t("web3GlossaryHeading")}
            </Heading>
            <HStack spacing={3}>
              <SearchBar
                baseWidth={"80vw"}
                smWidth={"50vw"}
                mdWidth={"50vw"}
                lgWidth={"30vw"}
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

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Home;
