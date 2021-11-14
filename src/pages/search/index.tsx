import { fetchTransactionIdsByTag } from "../api/arweave/arweave-client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  TERM_TAG,
  DESCRIPTION_TAG,
  LOCALE_TAG,
  CATEGORY_TAG,
} from "../../utils/glosseta-constants";
import { SimpleGrid, chakra } from "@chakra-ui/react";
import { tag } from "../../types/arweave";
import { glossetaSearchResult } from "../../types/glosseta-lookup-item";
import { Result } from "./result";
import { UnavailableResult } from "./unavailable-result";
import PageLayout from "../components/layout/page";
import SearchBar from "./search-bar";
import ApiError from "./api-error";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SearchResults = ({
  term,
  definition,
  locale,
  isAvailable,
  category,
  transactionId,
  isError,
}: any): JSX.Element => {
  if (isError) {
    return (
      <PageLayout>
        <SearchBar baseWidth={"80vw"} smWidth={"50vw"} />
        <chakra.main>
          <SimpleGrid
            columns={1}
            spacing="80px"
            flex={1}
            justifyContent="center"
            flexDirection="column"
            display="flex"
            alignItems="center"
          >
            <ApiError />
          </SimpleGrid>
        </chakra.main>
      </PageLayout>
    );
  }

  return (
    <>
      <PageLayout>
        <SearchBar baseWidth={"80vw"} smWidth={"50vw"} />
        <chakra.main>
          <SimpleGrid
            columns={1}
            spacing="80px"
            flex={1}
            justifyContent="center"
            flexDirection="column"
            display="flex"
            alignItems="center"
          >
            {isAvailable && (
              <Result
                transactionId={transactionId}
                definition={definition}
                category={category.toUpperCase()}
                term={term.toUpperCase()}
              />
            )}
            {!isAvailable && <UnavailableResult term={term.toUpperCase()} />}
          </SimpleGrid>
        </chakra.main>
      </PageLayout>
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
    isError: false,
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
  locale,
}: any) => {
  const data = (await fetchTransactionIdsByTag(
    query.term.toLowerCase()
  )) as any;

  const { edges } = data.props;

  let result = {} as glossetaSearchResult;

  if (edges === "error") {
    result = {
      term: query.term.toLowerCase(),
      definition: "",
      locale: "",
      isAvailable: false,
      category: "unavailable",
      transactionId: "",
      isError: true,
    };
  } else if (edges.length === 0) {
    result = {
      term: query.term.toLowerCase(),
      definition: "",
      locale: "",
      isAvailable: false,
      category: "unavailable",
      transactionId: "",
      isError: false,
    };
  } else {
    result = createSearchResult(edges[0].node.tags) as glossetaSearchResult;
    result.transactionId = edges[0].node.id;
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      term: result.term,
      definition: result.definition,
      locale: result.locale,
      isAvailable: result.isAvailable,
      category: result.category,
      transactionId: result.transactionId,
      isError: result.isError,
    },
  };
};

export default SearchResults;
