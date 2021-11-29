import React from "react";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "../../../../styles/Home.module.css";
import { Button } from "@chakra-ui/react";

export default function NavItems({
  isHomePage,
  isGlossaryPage,
  isSearchPage,
}: any) {
  const { t } = useTranslation();

  /**
   * The intent of the conditional checks is so that the respective pages link is not available to the user to click.
   * So if the user is on the Glossary page, they will see every nav item except the Search (i.e. Home) item.
   */
  return (
    <>
      {isGlossaryPage && (
        <Link href="/" passHref>
          <Button color="white" variant="ghost">
            {t("searchButtonTitle")}
            <span className={styles.visuallyhidden}>
              {t("glossetaNavbarButtonA11yText")}
            </span>
          </Button>
        </Link>
      )}

      {(isHomePage || isSearchPage) && (
        <Link href="/glossary" passHref>
          <Button color="white" variant="ghost">
            {t("glossaryButton")}
          </Button>
        </Link>
      )}
    </>
  );
}
