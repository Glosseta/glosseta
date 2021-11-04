import { Box, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import styles from "../../../styles/Home.module.css";

export const UnavailableResult = ({ term }: any): JSX.Element => {
  const twitter_href = `https://twitter.com/intent/tweet?screen_name=Glossetadotcom&text=Please%20add%20${term}%20to%20the%20knowledge%20base`;

  return (
    <>
      <Box>
        <Text padding={2} fontSize={{ base: 'xs', sm: 'md' }}>
          The term {term} isn't in our knowledge base at the moment. If you
          think this is something we should have, please reach out to us on{" "}
          <Link color="aquamarine" href={twitter_href} isExternal>
            Twitter <ExternalLinkIcon mx="2px" />
            <span className={styles.visuallyhidden}>
              Opens in a new window
            </span>
          </Link>
        </Text>
      </Box>
    </>
  );
};

export default UnavailableResult;
