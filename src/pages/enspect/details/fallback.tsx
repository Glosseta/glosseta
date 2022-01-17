import {
  SimpleGrid,
  chakra,
  Container,
  Box,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

const FallBack = (): JSX.Element => {
  return (
    <>
      <Stack
        spacing={10}
        padding={1}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
      >
        <chakra.main>
          <SimpleGrid
            columns={1}
            spacing="80px"
            flex={1}
            justifyContent="center"
            flexDirection="column"
            display="flex"
            alignItems="center"
            w="100vw"
          >
            <Container
              title="glosseta-enslookop-fallback-page"
              marginTop="-65px"
            >
              <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonCircle size="15" />
                <SkeletonText mt="4" noOfLines={20} spacing="4" />
              </Box>
            </Container>
          </SimpleGrid>
        </chakra.main>
      </Stack>
    </>
  );
};

export default FallBack;
