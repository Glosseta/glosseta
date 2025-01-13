import React from "react";
import { Stack } from "@chakra-ui/react";
import Footer from "../../footer/footer";
import Nav from "../../nav";

const PageLayout = ({ children }: { children?: object }): JSX.Element => {
  return (
    <>
      <Nav />
      <Stack
        spacing={8}
        px={{ base: 4, md: 8 }}
        py={{ base: 6, md: 10 }}
        flex="1"
        width="100%"
        alignItems="center"
        minH="100vh"
      >
        {children}
      </Stack>
      <Footer />
    </>
  );
};

export default PageLayout;
