import { GetServerSideProps } from "next";
import { SimpleGrid, chakra } from "@chakra-ui/react";
import { Result } from "../../components/search/result";
import { UnavailableResult } from "../../components/search/unavailable-result";
import PageLayout from "../../components/layout/page";
import SearchBar from "../../components/input/search-bar";
import ApiError from "../../components/search/api-error";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { termFilter } from "../../filter/termConfig";
import { fetchGlossaryTerm } from "../../backend/service/glosseta.service";

const SearchResults = ({
  term,
  definition,
  isAvailable,
  category,
  transactionId,
  isError,
}: any): JSX.Element => {
  if (isError) {
    return (
      <PageLayout>
        <SearchBar
          baseWidth={"80vw"}
          smWidth={"50vw"}
          mdWidth={"50vw"}
          lgWidth={"30vw"}
          filterItems={termFilter}
        />
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
        <SearchBar
          baseWidth={"80vw"}
          smWidth={"50vw"}
          mdWidth={"50vw"}
          lgWidth={"30vw"}
          filterItems={termFilter}
        />
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

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}: any) => {
  const result = await fetchGlossaryTerm(query.term.toLowerCase(), locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      term: result.term,
      definition: result.definition,
      isAvailable: result.isAvailable,
      category: result.category,
      transactionId: result.transactionId,
      isError: result.isError,
    },
  };
};

export default SearchResults;
