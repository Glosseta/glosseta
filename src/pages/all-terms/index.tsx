import PageLayout from "../components/layout/page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getTermList from "../../utils/termListUtil";
import { SimpleGrid, chakra } from "@chakra-ui/react";
import { ResultBox } from "../search/result-box";

const AllTerms = ({ terms }: any): JSX.Element => {
  /**
   * TODO:
   * 1. Add a return for if the terms map is empty
   * 2. Add some lipstick to the page
   * 3. Add the gray search result boxes into the view for each term instead of the list
   * 4. Add search bar for filtering
   * 5. Sort the subarray's
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
