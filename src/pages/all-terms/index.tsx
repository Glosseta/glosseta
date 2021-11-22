import PageLayout from "../components/layout/page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getTermList from "./termListUtil";
import { SimpleGrid, chakra, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
import { GetServerSideProps } from "next";

const AllTerms = ({ terms }: any): JSX.Element => {

/**
 * TODO:
 * 1. Add a return for if the terms map is empty
 * 2. Add some lipstick to the page
 * 3. Sort the subarray's
 * 4. Fix next build error
 */

  return (
    <>
      <PageLayout>
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
            <UnorderedList>
              {Object.keys(terms).map((category) => {
                return (
                  <ListItem key={category} fontSize="4xl">
                    {category.toUpperCase()}
                    <UnorderedList>
                      {terms[category].map((termItem: any) => {
                        return (
                          <Link
                            key={termItem.term}
                            href={termItem.href}
                            passHref
                          >
                            <a>
                              <ListItem
                                fontSize="xl"
                                _hover={{ color: "black" }}
                              >
                                {termItem.term}
                              </ListItem>
                            </a>
                          </Link>
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

export const getServerSideProps: GetServerSideProps = async({ locale }: any) => {
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
