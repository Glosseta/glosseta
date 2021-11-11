import {
  Heading,
  Box,
  Text,
  Link,
  Container,
  VStack,
  Tag,
  TagLabel,
  Stack,
  Divider,
} from "@chakra-ui/react";
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
      <Container maxW={{ base: "sm", sm: "xl" }}>
        <VStack spacing={5}>
          <Box
            width="100%"
            background="#2C3539"
            borderWidth="1px"
            borderColor="black"
            padding={3}
          >
            <VStack padding={3}>
              <Heading as="h1" padding={2} color="white">
                {term.toUpperCase()}
              </Heading>
              <Tag variant="solid" colorScheme="black">
                <TagLabel>{category.toUpperCase()}</TagLabel>
              </Tag>
              <Stack direction="row" h="120px">
                <Divider orientation="vertical" background="white" />
                <Text padding={2} fontSize={{ base: "xs", sm: "md" }}>
                  {definition}
                </Text>
              </Stack>
            </VStack>
          </Box>
          <Box
            width="100%"
            background="#2C3539"
            borderWidth="1px"
            borderColor="black"
          >
            <VStack padding={5}>
              <Heading as="h2" padding={2}>
                SOURCE
              </Heading>
              <Stack direction="row">
                <Divider orientation="vertical" background="white" />
                <Text padding={2} fontSize={{ base: "xs", sm: "md" }}>
                  The definition you see above for {term} is stored on the
                  Arweave network which is a protocol for storing data
                  permanently in a decentralized manner among network users who
                  have storage to spare. This means that this definition of{" "}
                  {term} will live forever on the Arweave network.
                  <Link href={view_block_url} isExternal padding={2}>
                    Click here to view the Arweave transaction for this
                    definition
                    <ExternalLinkIcon mx="2px" />
                    <span className={styles.visuallyhidden}>
                      Opens a new window
                    </span>
                  </Link>
                </Text>
              </Stack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default Result;
