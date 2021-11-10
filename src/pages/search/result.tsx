import { Heading, Box, Text, Button, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { VIEWBLOCK_URL } from "../../utils/glosseta-constants";
import styles from "../../../styles/Home.module.css";

export const Result = ({
  transactionId,
  definition,
  category,
  term,
}: any): JSX.Element => {
  const view_block_url = `${VIEWBLOCK_URL}/${transactionId}` as string;

  return (
    <>
      <Box>
        <Text padding={2} fontSize={{ base: 'xs', sm: 'md' }}>
          {definition}
        </Text>
      </Box>
      <Box>
        <Heading as="h2"  padding={2}>
          Content Source
        </Heading>
        <Text padding={2} fontSize={{ base: 'xs', sm: 'md' }}>
          The definition you see above for {term} is stored on Arweave network
          which is a protocol for storing data permanently in a decentralized
          manner among network users who have storage to spare. This means that
          this definition of {term} will live forever on the Arweave network.
          <Link href={view_block_url} isExternal padding={2}>
            Click here to view the Arweave transaction for this definition
            <ExternalLinkIcon mx="2px" />
            <span className={styles.visuallyhidden}>
              Opens a new window
            </span>
          </Link>
        </Text>
      </Box>
    </>
  );
};

export default Result;
