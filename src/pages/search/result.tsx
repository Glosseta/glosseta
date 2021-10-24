import { Heading, Box, Text, Button, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { VIEWBLOCK_URL } from "../../utils/glosseta-constants";

export const Result = ({
  transactionId,
  definition,
  category,
}: any): JSX.Element => {
  const view_block_url = `${VIEWBLOCK_URL}/${transactionId}` as string;

  return (
    <>
      <Box>
        <Heading as="h1" padding={1}>
          Definition
        </Heading>
        <Text padding={2}>{definition}</Text>
      </Box>
      <Box>
        <Heading as="h1" padding={1}>
          Arweave transaction
        </Heading>
        <Text padding={2}>Transaction ID: {transactionId}</Text>
        <Button color="teal">
          <Link href={view_block_url} isExternal>
            View transaction
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Button>
      </Box>
    </>
  );
};

export default Result;
