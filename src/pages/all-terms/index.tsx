import PageLayout from "../components/layout/page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getTermList from "../../utils/termListUtil";
import {
  SimpleGrid,
  chakra,
  ListItem,
  UnorderedList,
  Button,
} from "@chakra-ui/react";

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
            spacing="80px"
            flex={1}
            justifyContent="left"
            flexDirection="column"
            display="flex"
            alignItems="center"
          >
            <UnorderedList>
              {Object.keys(terms).map((category) => {
                return (
                  <ListItem key={category} fontSize="4xl">
                    {category.toUpperCase()}
                    <UnorderedList>
                      {terms[category].map((termItem: any) => {
                        return (
                          <chakra.a
                            key={termItem.term}
                            onClick={(event) => {
                              event.preventDefault();
                              location.assign(termItem.href);
                            }}
                            _hover={{ color: "black" }}
                          >
                            <ListItem fontSize="xl">{termItem.term}</ListItem>
                          </chakra.a>
                        );
                      })}
                    </UnorderedList>
                  </ListItem>
                );
              })}
            </UnorderedList>
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
