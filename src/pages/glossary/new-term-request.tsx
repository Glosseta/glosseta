import { Box, Text, Link, Container, VStack, Heading } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import styles from "../../../styles/Home.module.css";
import { useTranslation } from 'next-i18next';

export const NewTermRequest = (): JSX.Element => {
  const { t } = useTranslation();
  const twitter_href = 'https://twitter.com/intent/tweet?screen_name=Glossetadotcom&text=Please%20add%20the%20following%20term%20to%20the%20knowledge%20base:';

  return (
    <>
      <Container title="glossary-new-term-request" maxW={{ base: "sm", sm: "6xl" }}>
        <Box>
          <VStack padding={3}>
            <Heading
              as="h1"
              padding={2}
              color="white"
              fontSize={{ base: "md", sm: "xl" }}
            >
              {t('somethingMissingHeading')}
            </Heading>
            <Text padding={2} fontSize={{ base: "xs", sm: "md" }} color="white">
              {t('twitterTermRequestDescription')}{" "}
              <Link color="aquamarine" href={twitter_href} isExternal>
                {t('twitter')} <ExternalLinkIcon mx="2px" />
                <span className={styles.visuallyhidden}>
                  {t('opensInANewWindow')}
                </span>
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </>
  );
};

export default NewTermRequest;
