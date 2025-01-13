import { Container, VStack } from "@chakra-ui/react";
import { ResultBox } from "./result-box";
import { ContentSourceBox } from "./content-source-box";

export const Result = ({
  transactionId,
  definition,
  category,
  term,
}: any): JSX.Element => {
  return (
    <Container title="search-result-content" maxW={{ base: "sm", sm: "xl" }}>
      <VStack spacing={5}>
        <ResultBox definition={definition} category={category} term={term} />
        <ContentSourceBox transactionId={transactionId} />
      </VStack>
    </Container>
  );
};

export default Result;
