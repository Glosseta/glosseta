import react, { useState, useEffect, SetStateAction } from "react";
import { fetchTransactionIdsByTag } from "../api/arweave/arweave-client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  TERM_TAG,
  DESCRIPTION_TAG,
  LOCALE_TAG,
  CATEGORY_TAG,
} from "../../utils/glosseta-constants";
import { Heading, SimpleGrid, Box, Text } from "@chakra-ui/react";
import { tag } from "../../types/arweave";
import { glossetaSearchResult } from "../../types/glosseta-lookup-item";
import styles from "./search.module.css";
import { Result } from "./result";
import { UnavailableResult } from "./unavailable-result";

const SearchResults = ({
  term,
  definition,
  locale,
  isAvailable,
  category,
  transactionId,
}: any): JSX.Element => {
  const [isSearchResultAvailable, setIsSearchResultAvailable] =
    useState(isAvailable);

  //TODO: add the proper styling, layout and add the layout for when a term is not found
  return (
    <>
      <div className={styles.container}>
        <SimpleGrid columns={1} spacing="80px">
          <Box>
            <Heading as="h1" padding={1}>
              Term
            </Heading>
            <Text padding={2}>{term.toUpperCase()}</Text>
          </Box>
          {isSearchResultAvailable && (
            <Result
              transactionId={transactionId}
              definition={definition}
              category={category}
            />
          )}
          {!isSearchResultAvailable && <UnavailableResult term={term} />}
        </SimpleGrid>
      </div>
    </>
  );
};

export const createSearchResult = (tags: tag[]) => {
  let searchResult = {
    term: "",
    definition: "",
    locale: "",
    source: "",
    isAvailable: true,
    category: "",
    transactionId: "",
  } as glossetaSearchResult;

  tags.forEach((tag) => {
    if (TERM_TAG === tag.name.toLocaleLowerCase()) {
      searchResult.term = tag.value;
    } else if (DESCRIPTION_TAG === tag.name.toLocaleLowerCase()) {
      searchResult.definition = tag.value;
    } else if (LOCALE_TAG === tag.name.toLocaleLowerCase()) {
      searchResult.locale = tag.value;
    } else if (CATEGORY_TAG === tag.name.toLocaleLowerCase()) {
      searchResult.category = tag.value;
    }
  });

  return searchResult;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: any) => {
  const data = (await fetchTransactionIdsByTag(
    query.term.toLowerCase()
  )) as any;

  const { edges } = data.props;

  let result = {} as glossetaSearchResult;

  if (edges.length === 0) {
    result = {
      term: query.term.toLowerCase(),
      definition: "This term is currently unavailable",
      locale: "",
      isAvailable: false,
      category: "unavailable",
      transactionId: "",
    };
  } else {
    result = createSearchResult(edges[0].node.tags) as glossetaSearchResult;
    result.transactionId = edges[0].node.id;
  }

  return {
    props: {
      term: result.term,
      definition: result.definition,
      locale: result.locale,
      isAvailable: result.isAvailable,
      category: result.category,
      transactionId: result.transactionId,
    },
  };
};

export default SearchResults;
