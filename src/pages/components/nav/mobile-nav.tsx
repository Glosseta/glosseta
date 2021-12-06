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
import NavItems from "./nav-items";

export default function MobileNav({
  isHomePage,
  isGlossaryPage,
  isSearchPage,
}: any) {
  const bg = useColorModeValue("gray.800", "gray.800");
  const { onClose, onOpen, isOpen } = useDisclosure();

  return (
    <Box display={{ base: "inline-flex", md: "none" }}>
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="Open menu"
        fontSize="20px"
        color="white"
        variant="ghost"
        icon={<AiOutlineMenu />}
        onClick={onOpen}
        title="mobile-nav-open-button"
      />

      <VStack
        pos="absolute"
        top={0}
        left={0}
        right={0}
        display={isOpen ? "flex" : "none"}
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
        <CloseButton aria-label="Close menu" onClick={onClose} color="white" title="mobile-nav-close-button"/>

        <NavItems
          isHomePage={isHomePage}
          isGlossaryPage={isGlossaryPage}
          isSearchPage={isSearchPage}
        />
      </VStack>
    </Box>
  );
}
