import {
  chakra,
  Text,
  Container,
  VStack,
  Heading,
  Link,
  VisuallyHidden,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/react";
import SearchBar from "../../../components/input/enspect-search-bar";
import PageLayout from "../../../components/layout/page";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useTranslation } from "next-i18next";

export const EnsSearchError = ({
  ensName,
}: {
  ensName: string;
}): JSX.Element => {
  const { t } = useTranslation();
  const twitter_href =
    "https://twitter.com/intent/tweet?screen_name=Glossetadotcom";

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
            <SearchBar
              baseWidth={"80vw"}
              smWidth={"50vw"}
              mdWidth={"50vw"}
              lgWidth={"30vw"}
            />

            <Container
              maxW={{ base: "sm", sm: "xl" }}
              background="white"
              borderWidth="5px"
              borderColor="black"
            >
              <VStack padding={3}>
                <Tooltip label={ensName}>
                  <Heading
                    as="h1"
                    padding={2}
                    maxWidth="50%"
                    color="black"
                    fontSize={{ base: "md", sm: "xl" }}
                    isTruncated
                  >
                    {ensName}
                  </Heading>
                </Tooltip>
                <Text
                  padding={2}
                  fontSize={{ base: "xs", sm: "md" }}
                  color="black"
                >
                  {t("ensFetchErrorText")}{" "}
                  <Link title="ens-search-error-twitter-link" color="twitter.400" href={twitter_href} isExternal>
                    {t("twitter")} <ExternalLinkIcon mx="2px" />
                    <VisuallyHidden>{t("opensInANewWindow")}</VisuallyHidden>
                  </Link>
                </Text>
              </VStack>
            </Container>
          </SimpleGrid>
        </chakra.main>
      </PageLayout>
    </>
  );
};

export default EnsSearchError;
