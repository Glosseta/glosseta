import React from "react";
import { Stack } from "@chakra-ui/react";
import Footer from "../../footer/footer";

const PageLayout = ({ children }: { children?: object }): JSX.Element => {
  return (
    <Stack
      spacing={10}
      background="#7a08fc"
      padding={1}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      flex="1"
    >
      {children}
      <Footer />
    </Stack>
  );
};

export default PageLayout;
