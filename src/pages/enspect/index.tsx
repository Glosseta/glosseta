import PageLayout from "../components/layout/page";
import {
  SimpleGrid,
  chakra,
  Container,
  VStack,
  Heading,
  HStack,
  Box,
  Text,
  Link,
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import SearchBar from "../components/input/enspect-search-bar";

const ENSpect = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <PageLayout>
        <chakra.main>
          <SimpleGrid
            columns={1}
            spacing="80px"
            flex={1}
            justifyContent="center"
            flexDirection="column"
            display="flex"
            alignItems="center"
          >
            <Container
              title="glosseta-enspect-page"
              maxW={{ base: "sm", sm: "xl" }}
              marginTop="-65px"
            >
              <VStack>
                <Heading
                  as="h1"
                  padding={1}
                  fontSize={"7xl"}
                  color="white"
                  textAlign="center"
                >
                  {t("ENSSearchLandingPageHeading")}
                </Heading>
                <HStack spacing={3}>
                  <Box width="100%" letterSpacing="wide">
                    <Text
                      textAlign="center"
                      padding={2}
                      fontSize={{ base: "xs", md: "sm" }}
                      color="white"
                    >
                      {t("ENSSearchLandingPageDescription")}
                    </Text>
                  </Box>
                </HStack>

                <HStack spacing={3}>
                  <SearchBar
                    baseWidth={"80vw"}
                    smWidth={"50vw"}
                    mdWidth={"50vw"}
                    lgWidth={"30vw"}
                  />
                </HStack>

                <Link
                  padding={2}
                  href={"/search?term=ens"}
                  display="flex"
                  fontSize={{ base: "md", sm: "xl" }}
                  color={"white"}
                >
                  {t("whatIsEnsLink")}
                </Link>
              </VStack>
            </Container>
          </SimpleGrid>
        </chakra.main>
      </PageLayout>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default ENSpect;
