import type { NextPage } from "next";
import { SearchIcon } from "@chakra-ui/icons";
import {
  HStack,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  chakra,
  Heading,
} from "@chakra-ui/react";
import { useState, SetStateAction } from "react";
import PageLayout from "./components/layout/page";

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setSearchTerm(event.target.value);

  return (
    <PageLayout>
      <chakra.main>
        <VStack>
          <Image src="/glosseta.png" alt="Glosseta logo" width={300} />
          <Heading padding={1} color="white">Web3 Glossary</Heading>
          <HStack spacing={3}>
            <InputGroup aria-label="Search Bar">
              <InputLeftElement
                className="InputLeft"
                pointerEvents="none"
                children={
                  <SearchIcon
                    aria-label="Magnifying glass image"
                    className="SearchIcon"
                    color="gray.300"
                  />
                }
                size="xs"
              />
              <Input
                autoComplete={"off"}
                variant="outline"
                aria-label="Search web3 terms here"
                backgroundColor="white"
                color="gray.300"
                rounded="lg"
                onChange={handleSearchTermChange}
                width="250px"
                onKeyPress={(event) => {
                  if (event.key === "Enter" && searchTerm !== "") {
                    event.preventDefault();
                    location.assign(`/search?term=${searchTerm.toLowerCase()}`);
                  }
                }}
              />
            </InputGroup>
          </HStack>
        </VStack>
      </chakra.main>
    </PageLayout>
  );
};

export default Home;
