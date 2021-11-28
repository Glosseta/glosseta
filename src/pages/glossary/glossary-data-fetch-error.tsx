import { Box, Text, Container, VStack, Heading, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useTranslation } from "next-i18next";
import styles from "../../../styles/Home.module.css";

export const GlossaryDataFetchError = (): JSX.Element => {
  const twitter_href = `https://twitter.com/intent/tweet?screen_name=Glossetadotcom`;
  const { t } = useTranslation();

  return (
    <>
      <Container maxW={{ base: "sm", sm: "xl" }}>
        <Box
          width="100%"
          background="#2C3539"
          borderWidth="1px"
          borderColor="black"
        >
          <VStack padding={3}>
            <Heading
              as="h1"
              padding={2}
              maxWidth="50%"
              color="white"
              fontSize={{ base: "md", sm: "xl" }}
              isTruncated
            >
              {t("glossaryTermFetchErrorHeading")}
            </Heading>
            <Text padding={2} fontSize={{ base: "xs", sm: "md" }} color="white">
              {t("glossaryTermFetchErrorText")}{" "}
              <Link color="aquamarine" href={twitter_href} isExternal>
                {t("twitter")} <ExternalLinkIcon mx="2px" />
                <span className={styles.visuallyhidden}>
                  {t("opensInANewWindow")}
                </span>
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </>
  );
};

export default GlossaryDataFetchError;
