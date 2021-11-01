import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { SearchIcon } from "@chakra-ui/icons";
import {
  HStack,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Image
} from "@chakra-ui/react";
import { useState, SetStateAction } from "react";
import Footer from "./components/footer/footer";

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setSearchTerm(event.target.value);

  return (
    <div className={styles.container}>
      <Head>
        <title>Glosseta</title>
        <meta
          name="description"
          content="The metaverse's glossary into web3 terms and lingo"
        />
        <link rel="icon" href="/glosseta_icon.png" />
      </Head>

      <main className={styles.main}>
        <VStack>
          <Image
            src="/glosseta.png"
            alt="Glosseta logo"
            width={300}
            height={300}
          />
          <HStack spacing={3}>
            <InputGroup aria-label="Search Bar">
              <InputLeftElement
                className="InputLeft"
                pointerEvents="none"
                children={
                  <SearchIcon aria-label="Magnifying glass image" className="SearchIcon" color="gray.300" />
                }
                size="xs"
              />
              <Input
                autoComplete={"off"}
                variant="outline"
                placeholder="Search Glosseta for web 3.0 terms (i.e. gm)"
                backgroundColor="white"
                rounded="lg"
                onChange={handleSearchTermChange}
                width="400px"
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
      </main>
      <Footer />
    </div>
  );
};

export default Home;
