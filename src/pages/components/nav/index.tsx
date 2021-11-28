import React from "react";
import { chakra, Flex, HStack, Avatar } from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "../../../../styles/Home.module.css";
import MobileNav from "./mobile-nav";

/**
 * Implementation inspired from the developer dao website
 *
 * source: https://github.com/Developer-DAO/developerdao.com
 *  */
export default function Nav() {
  const { t } = useTranslation();

  return (
    <chakra.nav
      borderBottom="1px solid"
      borderColor="#2C3539"
      backgroundColor="#2C3539!important"
      minWidth="100vw"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        maxW="7xl"
        py={3}
        px={5}
      >
        <Link href="/" passHref>
          <HStack
            as="a"
            title={t("glossetaTitle")}
            display="flex"
            alignItems="center"
          >
            <Avatar
              name="Glosseta"
              src="/glosseta_icon.png"
              alt="Glosseta logo"
              bg="#7a08fc"
            />
            <chakra.span
              fontWeight="bold"
              fontSize="sm"
              transition="color 300ms ease-in-out"
              _hover={{ color: "black" }}
            >
              {t("glossetaTitle")}
            </chakra.span>
          </HStack>
        </Link>
        <HStack display="flex" alignItems="center" spacing={1}>
          <HStack
            spacing={{ base: 3, sm: 10 }}
            display={{ base: "none", md: "inline-flex" }}
          >
            <Link href="/" passHref>
              <a>
                {t("searchButtonTitle")}
                <span className={styles.visuallyhidden}>
                  {t("glossetaNavbarButtonA11yText")}
                </span>
              </a>
            </Link>

            <Link href="/glossary" passHref>
              <a>{t("glossaryButton")}</a>
            </Link>
          </HStack>

          <MobileNav />
        </HStack>
      </Flex>
    </chakra.nav>
  );
}
