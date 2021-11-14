import {
  Heading,
  Box,
  Text,
  Link,
  Container,
  VStack,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { VIEWBLOCK_URL } from "../../utils/glosseta-constants";
import styles from "../../../styles/Home.module.css";
import { useTranslation } from "next-i18next";

export const Result = ({
  transactionId,
  definition,
  category,
  term,
}: any): JSX.Element => {
  const { t } = useTranslation();
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
          >
            <VStack padding={3}>
              <Heading as="h1" padding={2} color="white">
                {term}
              </Heading>
              <Tag variant="solid" colorScheme="black">
                <TagLabel color="white">{category}</TagLabel>
              </Tag>
              <Text
                padding={2}
                fontSize={{ base: "xs", sm: "md" }}
                color="white"
              >
                {definition}
              </Text>
            </VStack>
          </Box>
          <Box
            width="100%"
            background="#2C3539"
            borderWidth="1px"
            borderColor="black"
          >
            <VStack padding={5}>
              <Heading as="h2" padding={2} color="white">
                {t("searchResultContentSourceHeading")}
              </Heading>
              <Text
                padding={2}
                fontSize={{ base: "xs", sm: "md" }}
                color="white"
              >
                {t("searchResultContentSourceDescription")}
                <Link href={view_block_url} isExternal padding={2}>
                  {t("searchResultContentSourceTransactionLinkText")}
                  <ExternalLinkIcon mx="2px" />
                  <span className={styles.visuallyhidden}>
                    {t("opensInANewWindow")}
                  </span>
                </Link>
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default Result;
