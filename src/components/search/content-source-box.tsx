import { Heading, Box, Text, Link, VStack, Image } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { VIEWBLOCK_URL } from "../../utils/glosseta-constants";
import styles from "../../../styles/Home.module.css";
import { useTranslation } from "next-i18next";

export const ContentSourceBox = ({ transactionId }: any): JSX.Element => {
  const { t } = useTranslation();
  const view_block_url = `${VIEWBLOCK_URL}/${transactionId}` as string;

  return (
    <>
      <Box
        width="100%"
        background="#2C3539"
        borderWidth="1px"
        borderColor="black"
      >
        <VStack padding={5}>
          <Heading
            as="h2"
            padding={2}
            color="white"
            fontSize={{ base: "md", sm: "xl" }}
          >
            {t("searchResultContentSourceHeading")}
          </Heading>
          <Text padding={2} fontSize={{ base: "xs", sm: "md" }} color="white">
            {t("searchResultContentSourceDescription")}
            <Link
              href={view_block_url}
              isExternal
              padding={2}
              color="aquamarine"
            >
              {t("searchResultContentSourceTransactionLinkText")}
              <ExternalLinkIcon mx="2px" />
              <span className={styles.visuallyhidden}>
                {t("opensInANewWindow")}
              </span>
            </Link>
          </Text>
          <Image
            src="./arweave_seal_light.png"
            alt="Permanent on Arweave"
          />
        </VStack>
      </Box>
    </>
  );
};

export default ContentSourceBox;
