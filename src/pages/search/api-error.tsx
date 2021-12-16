import { Box, Text, Container, VStack, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

export const ApiError = ({ term }: any): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <Container title="api-error-result" maxW={{ base: "sm", sm: "xl" }}>
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
              fontSize={{ base: "md", sm: "xl" }}
              isTruncated
            >
              {term}
            </Heading>
            <Text padding={2} fontSize={{ base: "xs", sm: "md" }} color="white">
              {t("apiFetchErrorText")}
            </Text>
          </VStack>
        </Box>
      </Container>
    </>
  );
};

export default ApiError;
