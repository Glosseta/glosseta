import React from "react";
import { Stack } from "@chakra-ui/react";
import Footer from "../../footer/footer";

const PageLayout = ({ children }: { children?: object }): JSX.Element => {
  return (
    <Stack
      background="#7a08fc"
      minHeight="100vh" 
    >
      {children}
      <Footer />
    </Stack>
  );
};

export default PageLayout;
