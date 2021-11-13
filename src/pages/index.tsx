import type { NextPage } from "next";
import { HStack, VStack, Image, chakra, Heading } from "@chakra-ui/react";
import PageLayout from "./components/layout/page";
import SearchBar from "./search/search-bar";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <chakra.main>
        <VStack>
          <Image src="/glosseta.png" alt="Glosseta logo" width={300} />
          <Heading padding={1} color="white">
            Web3 Glossary
          </Heading>
          <HStack spacing={3}>
            <SearchBar barWidth={"70vw"}/>
          </HStack>
        </VStack>
      </chakra.main>
    </PageLayout>
  );
};

export default Home;
