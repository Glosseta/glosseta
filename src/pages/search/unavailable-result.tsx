import { Heading, Box, Text } from "@chakra-ui/react";

export const UnavailableResult = ({ term }: any): JSX.Element => {
  //TODO: add the proper styling, layout and add the layout for when a term is not found
  return (
    <>
      <Box>
        <Heading as="h2" padding={1}>
          Definition
        </Heading>
        <Text padding={2}>
          This term isn't in our knowledge base at the moment. If you think this
          is something we should have, please reach out to us on twitter to get{" "}
          {term} added into Glosseta
        </Text>
      </Box>
    </>
  );
};

export default UnavailableResult;
