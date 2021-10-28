import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { Button } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import {
  HStack,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState, SetStateAction } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";

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
            <InputGroup>
              <InputLeftElement
                className="InputLeft"
                pointerEvents="none"
                children={
                  <SearchIcon className="SearchIcon" color="gray.300" />
                }
                size="xs"
              />
              <Input
                autoComplete={"off"}
                variant="outline"
                placeholder="Search Glosseta (i.e. gm)"
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
          <Text color="white" padding={2}>
            The Metaverse's glossary
          </Text>
        </VStack>
      </main>

      <footer className={styles.footer}>
        <HStack>
          <Link href={"https://twitter.com/Glossetadotcom"} isExternal>
            <Button aria-label="Twitter link for Glosseta" size="lg" colorScheme="clear">
              <FaTwitter />
            </Button>
          </Link>
          <Link href={"https://github.com/narbs91/glosseta"} isExternal>
            <Button aria-label="GitHub link for Glosseta" size="lg" colorScheme="clear">
              <FaGithub />
            </Button>
          </Link>
        </HStack>
      </footer>
    </div>
  );
};

export default Home;
