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
            srcSet="/arweave_seal_mobile_light.svg 360w,
                    /arweave_seal_light.png 1100w,"
            sizes="(max-width: 600px) 480px,
                    800px"
            alt="Permanent on Arweave"
          />
        </VStack>
      </Box>
    </>
  );
};

export default ContentSourceBox;
