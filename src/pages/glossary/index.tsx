import PageLayout from "../../components/layout/page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getTermList from "../../utils/termListUtil";
import {
  SimpleGrid,
  chakra,
  Heading,
  VStack,
  Container,
} from "@chakra-ui/react";
import { ResultBox } from "../search/result-box";
import { NewTermRequest } from "../../components/glossary/new-term-request";
import { ScrollToTopButton } from "../../components/glossary/scroll-to-top-button";
import { useTranslation } from "react-i18next";
import { GlossaryDataFetchError } from "../../components/glossary/glossary-data-fetch-error";

const AllTerms = ({ terms }: any): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <PageLayout>
        <chakra.main>
          <Heading
            title="glossary-list-heading"
            as="h1"
            padding={5}
            color="white"
            fontSize={{ base: "xl", sm: "3xl" }}
            textAlign="center"
            id="glossary-heading"
            tabIndex={-1}
          >
            {t("glossaryPageHeading")}
          </Heading>
          <SimpleGrid
            columns={1}
            spacing={5}
            padding={3}
            flex={1}
            flexDirection="column"
            display="flex"
            alignItems="center"
          >
            <Container title="glossary-term-list" maxW={{ base: "sm", sm: "xl" }}>
              <VStack spacing={5}>
                {terms.length === 0 ? (
                  <GlossaryDataFetchError />
                ) : (
                  <>
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
                    <ScrollToTopButton anchorIdToFocus="glossary-heading"/>
                    <NewTermRequest />
                  </>
                )}
              </VStack>
            </Container>
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
