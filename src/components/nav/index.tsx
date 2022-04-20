import React from "react";
import { chakra, Flex, HStack, Avatar } from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import MobileNav from "./mobile-nav";
import NavItems from "./nav-items";
import { useRouter } from "next/router";

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
      backgroundColor="#2C3539"
      minWidth="100vw"
      title="glosseta-nav"
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
              title="nav-glosseta-icon"
            />
            <chakra.span
              fontWeight="bold"
              fontSize="sm"
              transition="color 300ms ease-in-out"
              color="white"
              title="nav-glosseta-home-button"
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
            <NavItems />
          </HStack>

          <MobileNav />
        </HStack>
      </Flex>
    </chakra.nav>
  );
}
