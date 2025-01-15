import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import Footer from "../../footer/footer";
import Nav from "../../nav";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps): JSX.Element => {
  return (
    <Flex direction="column" minH="100vh">
      {/* Navigation */}
      <Box 
        as="header" 
        position="sticky"
        top={0}
        zIndex={1000}
        bg="black"
        borderBottom="1px"
        borderColor="whiteAlpha.100"
      >
        <Nav />
      </Box>

      {/* Main Content */}
      <Container 
        as="main"
        maxW="container.xl"
        flex="1"
        px={{ base: 4, md: 8 }}
        py={{ base: 6, md: 10 }}
      >
        {children}
      </Container>

      {/* Footer */}
      <Box 
        as="footer"
        borderTop="1px"
        borderColor="whiteAlpha.100"
      >
        <Footer />
      </Box>
    </Flex>
  );
};

export default PageLayout;
