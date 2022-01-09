import PageLayout from "../../components/layout/page";
import {
  SimpleGrid,
  chakra,
  Container,
  VStack,
  Heading,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const LookUpResult = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

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
              title="glosseta-landing-page"
              maxW={{ base: "sm", sm: "xl" }}
              marginTop="-65px"
            >
              <VStack>
                <Heading as="h1" padding={1} color="white" textAlign="center">
                  ENS Result page
                </Heading>
                <HStack spacing={3}>
                  <Text>{id}</Text>
                </HStack>
                <VStack spacing={3}>
                  <Box width="100%" letterSpacing="wide">
                    <Text
                      textAlign="center"
                      padding={2}
                      fontSize={{ base: "xs", md: "sm" }}
                      color="white"
                    >
                      Description
                    </Text>
                  </Box>
                </VStack>
              </VStack>
            </Container>
          </SimpleGrid>
        </chakra.main>
      </PageLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

/**
 * TODO
 * 3. Integrate ethers.js
 * 4. Integrate opensea api for fetching NFTs
 */

export default LookUpResult;
