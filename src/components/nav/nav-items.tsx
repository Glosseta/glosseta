import React from "react";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/react";

export default function NavItems() {
  const { t } = useTranslation();

  return (
    <>
      <Link href="https://blog.glosseta.com" passHref>
        <Button color="white" variant="ghost" title="nav-blog-button">
          {t("blogButtonTitle")}
        </Button>
      </Link>
      <Link href="/glossary" passHref>
        <Button color="white" variant="ghost" title="nav-glossary-button">
          {t("glossaryButton")}
        </Button>
      </Link>
    </>
  );
}
