import { Button } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import styles from "../../../styles/Home.module.css";
import { useTranslation } from "next-i18next";

export const ScrollToTopButton = ({
  anchorIdToFocus = "",
}: {
  anchorIdToFocus: string;
}): JSX.Element => {
  const { t } = useTranslation();

  const scrollToTheTop = () => {
    if (anchorIdToFocus === "") {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      // @ts-ignore: Object is possibly 'null'.
      document.getElementById(anchorIdToFocus).focus();
    }
  };

  return (
    <>
      <Button
        title="glossary-scroll-to-top-button"
        onClick={scrollToTheTop}
        position="fixed"
        bottom="6"
        right="6"
        zIndex="99"
        colorScheme="blackAlpha"
        size="lg"
        rounded="full"
        shadow="lg"
        aria-label={t("scrollToTheTopButton")}
        _hover={{
          transform: "translateY(-2px)",
          shadow: "xl"
        }}
        _active={{
          transform: "translateY(0)",
          shadow: "md"
        }}
        transition="all 0.2s"
      >
        <ArrowUpIcon boxSize={6} />
        <span className={styles.visuallyhidden}>
          {t("scrollToTheTopButton")}
        </span>
      </Button>
    </>
  );
};

export default ScrollToTopButton;
