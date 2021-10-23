import react, { useState, useEffect, SetStateAction } from "react";
import {
  fetchTransactionsForWallet,
  fetchTransactionIdsByTag,
} from "../api/arweave/arweave-client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  TERM_TAG,
  DESCRIPTION_TAG,
  LOCALE_TAG,
  SOURCE_TAG,
} from "../../utils/glosseta-constants";
import {
    Container,
    VStack
  } from "@chakra-ui/react";
import { tag } from "../../types/arweave";
import { glossetaSearchResult } from "../../types/glosseta-lookup-item";
import styles from "../../../styles/Home.module.css";

const SearchResults = ({ term, definition, locale }: any): JSX.Element => {


    //TODO: add the proper styling, layout and add the layout for when a term is not found
  return (
    <>
      <div className={styles.container}>
        <p>Term: {term}</p>
        <br />
        <p>Definition: {definition}</p>
        <br />
        <p>locale: {locale}</p>
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
  } as glossetaSearchResult;

  tags.forEach((tag) => {
    if (TERM_TAG === tag.name.toLocaleLowerCase()) {
      searchResult.term = tag.value;
    } else if (DESCRIPTION_TAG === tag.name.toLocaleLowerCase()) {
      searchResult.definition = tag.value;
    } else if (LOCALE_TAG === tag.name.toLocaleLowerCase()) {
      searchResult.locale = tag.value;
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

  //TODO: handle the case when the search term isn't found.  Edges will be empty
  const result = createSearchResult(edges[0].node.tags) as glossetaSearchResult;

  return {
    props: {
      term: result.term,
      definition: result.definition,
      locale: result.locale,
    },
  };
};

export default SearchResults;
