import React from "react";
import { Stack } from "@chakra-ui/react";
import Footer from "../../footer/footer";
import Nav from "../../nav";

const PageLayout = ({ children }: { children?: object }): JSX.Element => {
  return (
    <>
      <Nav />
      <Stack
        spacing={10}
        padding={1}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
      >
        {children}
      </Stack>
      <Footer />
    </>
  );
};

export default PageLayout;
