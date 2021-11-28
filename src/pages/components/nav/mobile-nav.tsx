import React from "react";
import {
  Box,
  useColorModeValue,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function MobileNav() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const { t } = useTranslation();

  return (
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
        <CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />

        <Link href="/" passHref>
          <a>{t("searchButtonTitle")}</a>
        </Link>

        <Link href="/glossary" passHref>
          <a>{t("glossaryButton")}</a>
        </Link>
      </VStack>
    </Box>
  );
}
