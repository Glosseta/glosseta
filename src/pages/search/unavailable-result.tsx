import { Box, Text, Link, Container, VStack, Heading } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import styles from "../../../styles/Home.module.css";

export const UnavailableResult = ({ term }: any): JSX.Element => {
  const twitter_href = `https://twitter.com/intent/tweet?screen_name=Glossetadotcom&text=Please%20add%20${term}%20to%20the%20knowledge%20base`;

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
            <Text padding={2} fontSize={{ base: "xs", sm: "md" }}>
              This term isn't in our knowledge base at the moment. If you think
              this is something we should have, please reach out to us on{" "}
              <Link color="aquamarine" href={twitter_href} isExternal>
                Twitter <ExternalLinkIcon mx="2px" />
                <span className={styles.visuallyhidden}>
                  Opens in a new window
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
