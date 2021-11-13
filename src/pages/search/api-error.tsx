import { Box, Text, Container, VStack, Heading } from "@chakra-ui/react";

export const ApiError = ({ term }: any): JSX.Element => {
  return (
    <>
      <Container maxW={{ base: "sm", sm: "xl" }}>
        <Box
          width="100%"
          background="#2C3539"
          borderWidth="1px"
          borderColor="black"
        >
          <VStack padding={3}>
            <Heading
              as="h1"
              padding={2}
              maxWidth="50%"
              color="white"
              isTruncated
            >
              {term}
            </Heading>
            <Text padding={2} fontSize={{ base: "xs", sm: "md" }} color="white">
              Something went wrong while trying to retrieve the definition.
              Please refresh the page or search for another term
            </Text>
          </VStack>
        </Box>
      </Container>
    </>
  );
};

export default ApiError;
