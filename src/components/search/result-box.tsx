import { Heading, Box, Text, VStack, Tag, TagLabel } from "@chakra-ui/react";

export const ResultBox = ({ definition, category, term }: any): JSX.Element => {
  return (
    <>
      <Box
        width="100%"
        background="white" 
        borderRadius="xl"
        boxShadow="lg"
        overflow="hidden"
        transition="all 0.2s"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "xl"
        }}
      >
        <VStack 
          spacing={4}
          align="stretch"
          padding={6}
        >
          <Heading
            as="h1"
            color="gray.800"
            fontSize={{ base: "lg", sm: "2xl" }}
            fontWeight="bold"
            lineHeight="tight"
          >
            {term}
          </Heading>
          <Tag
            variant="subtle"
            colorScheme="blue"
            size="md"
            borderRadius="full"
            paddingX={4}
            paddingY={1}
          >
            <TagLabel fontWeight="medium">{category}</TagLabel>
          </Tag>
          <Text 
            fontSize={{ base: "sm", sm: "md" }}
            color="gray.600"
            lineHeight="tall"
          >
            {definition}
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default ResultBox;
