import React from "react";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Avatar,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "../../../../styles/Home.module.css";

/**
 * Implementation inspired from the developer dao website
 *
 * source: https://github.com/Developer-DAO/developerdao.com
 *  */
export default function Nav() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const { t } = useTranslation();

  return (
    <chakra.nav borderBottom="1px solid" borderColor="#2C3539" backgroundColor="#2C3539" minWidth="100vw">
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

            <Link href="/all-terms" passHref>
              <a>{t("allTermsButton")}</a>
            </Link>
          </HStack>

          <Box display={{ base: "inline-flex", md: "none" }}>
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              color={useColorModeValue("grey.800", "inherit")}
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />

            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? "flex" : "none"}
              flexDirection="column"
              pt={7}
              pb={7}
              m={0}
              bg={bg}
              spacing={3}
              rounded="sm"
              shadow="sm"
              zIndex="99"
            >
              <CloseButton
                aria-label="Close menu"
                onClick={mobileNav.onClose}
              />

              <Link href="/" passHref>
                <a>{t("searchButtonTitle")}</a>
              </Link>

              <Link href="/all-terms" passHref>
                <a>{t("allTermsButton")}</a>
              </Link>
            </VStack>
          </Box>
        </HStack>
      </Flex>
    </chakra.nav>
  );
}
