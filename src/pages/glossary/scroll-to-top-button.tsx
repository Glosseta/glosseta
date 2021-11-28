import {
  Button,
} from "@chakra-ui/react";
import { ArrowUpIcon } from '@chakra-ui/icons'
import styles from "../../../styles/Home.module.css";
import { useTranslation } from "next-i18next";

export const ScrollToTopButton = (): JSX.Element => {
  const { t } = useTranslation();

  const scrollToTheTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <Button
        onClick={scrollToTheTop}
        position="fixed"
        bottom="20px"
        right="30px"
        zIndex="99"
        backgroundColor="#A3A3A3"
        fontSize="18px"
        textColor="black"
      >
        <ArrowUpIcon/>
        <span className={styles.visuallyhidden}>
            {t('scrollToTheTopButton')}
        </span>
      </Button>
    </>
  );
};

export default ScrollToTopButton;
