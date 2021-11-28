import { Heading, Box, Text, VStack, Tag, TagLabel } from "@chakra-ui/react";

export const ResultBox = ({ definition, category, term }: any): JSX.Element => {
  return (
    <>
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
            color="white"
            fontSize={{ base: "md", sm: "xl" }}
          >
            {term}
          </Heading>
          <Tag variant="solid" colorScheme="black" size={"sm"}>
            <TagLabel color="white">{category}</TagLabel>
          </Tag>
          <Text padding={2} fontSize={{ base: "xs", sm: "md" }} color="white">
            {definition}
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default ResultBox;
