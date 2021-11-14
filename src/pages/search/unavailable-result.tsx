import { Box, Text, Link, Container, VStack, Heading } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import styles from "../../../styles/Home.module.css";
import { useTranslation } from 'next-i18next';

export const UnavailableResult = ({ term }: any): JSX.Element => {
  const { t } = useTranslation();
  const twitter_href = `https://twitter.com/intent/tweet?screen_name=Glossetadotcom&text=Please%20add%20${term}%20to%20the%20knowledge%20base`;
  // TODO: Change this to the actual issue template when the url is available
  const github_issue_href = 'https://github.com/narbs91/glosseta/issues';

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
              isTruncated
            >
              {term}
            </Heading>
            <Text padding={2} fontSize={{ base: "xs", sm: "md" }} color="white">
              {t('unavailableSearchResultDescription')}{" "}
              <Link color="aquamarine" href={twitter_href} isExternal>
                {t('twitter')} <ExternalLinkIcon mx="2px" />
                <span className={styles.visuallyhidden}>
                  {t('opensInANewWindow')}
                </span>
              </Link>
              {t('or')}{" "} 
              <Link color="aquamarine" href={github_issue_href} isExternal>
                {t('gitHubIssueText')} <ExternalLinkIcon mx="2px" />
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

export default UnavailableResult;
