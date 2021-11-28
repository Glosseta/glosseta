import PageLayout from "../components/layout/page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getTermList from "../../utils/termListUtil";
import { SimpleGrid, chakra } from "@chakra-ui/react";
import { ResultBox } from "../search/result-box";
import { NewTermRequest } from "./new-term-request";
import { ScrollToTopButton } from "./scroll-to-top-button";

const AllTerms = ({ terms }: any): JSX.Element => {
  /**
   * TODO:
   * 1. Add a return for if the terms map is empty
   */

  return (
    <>
      <PageLayout>
        <chakra.main>
          <SimpleGrid
            columns={1}
            spacing={5}
            padding={3}
            flex={1}
            flexDirection="column"
            display="flex"
            alignItems="center"
          >     
            <NewTermRequest/>
            {terms.map((termItem: any) => {
              return (
                <ResultBox
                  key={termItem.term}
                  definition={termItem.definition}
                  category={termItem.category.toUpperCase()}
                  term={termItem.term.toUpperCase()}
                />
              );
            })}
            <ScrollToTopButton />
          </SimpleGrid>
        </chakra.main>
      </PageLayout>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  const terms = await getTermList(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      terms: terms,
      // Will be passed to the page component as props
    },
  };
}

export default AllTerms;
