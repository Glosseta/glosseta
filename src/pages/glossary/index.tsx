import PageLayout from "../../components/layout/page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getTermList from "../../utils/termListUtil";
import {
  SimpleGrid,
  chakra,
  Heading,
  VStack,
  Container,
  Box,
  Text,
  HStack,
  Link,
  Badge,
} from "@chakra-ui/react";
import { NewTermRequest } from "../../components/glossary/new-term-request";
import { ScrollToTopButton } from "../../components/glossary/scroll-to-top-button";
import { useTranslation } from "react-i18next";
import { GlossaryDataFetchError } from "../../components/glossary/glossary-data-fetch-error";

const AllTerms = ({ terms }: any): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <PageLayout>
        <chakra.main maxW="1200px" mx="auto" px={4}>
          {/* Hero Section */}
          <Box 
            bg="linear-gradient(to right, blue.600, purple.600)"
            borderRadius="xl"
            mb={8}
            p={8}
          >
            <Heading
              title="glossary-list-heading"
              as="h1"
              color="white"
              fontSize={{ base: "2xl", sm: "4xl" }}
              textAlign="center"
              id="glossary-heading"
              tabIndex={-1}
              mb={4}
            >
              {t("glossaryPageHeading")}
            </Heading>
            
            {/* Quick intro text */}
            <Text 
              color="whiteAlpha.900" 
              textAlign="center"
              fontSize={{ base: "md", sm: "lg" }}
              maxW="2xl"
              mx="auto"
            >
              {t("glossaryPageDescription")}
            </Text>
          </Box>

          {/* Alphabet Navigation */}
          <Box 
            mb={8}
            overflowX="auto"
            py={4}
            css={{
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            <HStack
              spacing={2}
              justify="center"
              flexWrap="wrap"
            >
              
              {Object.keys(
                terms.reduce((acc: Record<string, any[]>, term: any) => {
                  const firstLetter = term.term[0].toUpperCase();
                  if (!acc[firstLetter]) {
                    acc[firstLetter] = [];
                  }
                  acc[firstLetter].push(term);
                  return acc;
                }, {})
              )
              .sort()
              .map((letter) => (
                <Link
                  key={letter}
                  href={`#section-${letter}`}
                  px={2}
                  py={2}
                  borderRadius="full"
                  fontSize={{ base: "sm", sm: "md", md: "lg" }}
                  fontWeight="medium"
                  bg="gray.800"
                  color="white"
                  mx={1}
                  minW={{ base: "36px", sm: "40px", md: "44px" }}
                  height={{ base: "36px", sm: "40px", md: "44px" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{
                    textDecoration: "none",
                    bg: "blue.600",
                    transform: "translateY(-1px)"
                  }}
                  _active={{
                    bg: "blue.700",
                    transform: "translateY(0)"
                  }}
                  transition="all 0.2s"
                >
                  {letter}
                </Link>
              ))}
            </HStack>
          </Box>

          {/* Terms Grid */}
          
          <Box>
            <Container 
              title="glossary-term-list" 
              maxW="full" 
              p={0}
            >
              {terms.length === 0 ? (
                <GlossaryDataFetchError />
              ) : (
                <>
                  {/* Category filters */}
                  <HStack 
                    spacing={4} 
                    mb={6} 
                    overflowX="auto" 
                    py={2}
                    css={{
                      '&::-webkit-scrollbar': {
                        display: 'none'
                      }
                    }}
                  >
                   
                  </HStack>

                  {/* Terms Grid */}
                  <Box>
                    {/* Group and sort terms alphabetically */}
                    {Object.entries(
                      terms.reduce((acc: Record<string, any[]>, term: any) => {
                        const firstLetter = term.term[0].toUpperCase();
                        if (!acc[firstLetter]) {
                          acc[firstLetter] = [];
                        }
                        acc[firstLetter].push(term);
                        return acc;
                      }, {})
                    )
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([letter, letterTerms]) => (
                      <Box key={letter} mb={12} id={`section-${letter}`}>
                        <Heading
                          as="h2"
                          size="lg"
                          color="gray.800"
                          mb={6}
                          px={4}
                          py={2}
                          borderRadius="lg"
                          bg="white"
                          boxShadow="md"
                          display="inline-block"
                          position="relative"
                          _before={{
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "4px",
                            height: "70%",
                            borderRadius: "full"
                          }}
                        >
                          {letter}
                        </Heading>
                        <SimpleGrid
                          columns={{ base: 1, md: 2, lg: 3 }}
                          spacing={6}
                        >
                          {(letterTerms as any[]).sort((a,b) => a.term.localeCompare(b.term)).map((termItem: any) => (
                            <Link
                              href={`/search/term/${termItem.term}`}
                              key={termItem.term}
                              _hover={{ textDecoration: 'none' }}
                            >
                              <Box
                                p={6}
                                bg="white"
                                borderRadius="xl"
                                boxShadow="sm"
                                transition="all 0.2s"
                                height="250px"
                                _hover={{
                                  transform: "translateY(-4px)",
                                  boxShadow: "lg"
                                }}
                              >
                                <VStack align="start" spacing={3} height="100%">
                                  <Badge
                                    colorScheme="blue"
                                    fontSize="sm" 
                                    textTransform="uppercase"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                  >
                                    {termItem.category.toUpperCase()}
                                  </Badge>
                                  <Heading
                                    as="h3"
                                    size="md"
                                    color="gray.800"
                                  >
                                    {termItem.term.toUpperCase()}
                                  </Heading>
                                  <Text
                                    color="gray.600"
                                    noOfLines={3}
                                    flex="1"
                                  >
                                    {termItem.definition}
                                  </Text>
                                </VStack>
                              </Box>
                            </Link>
                          ))}
                        </SimpleGrid>
                      </Box>
                    ))}
                  </Box>

                  {/* Bottom Actions */}
                  <VStack spacing={4} mt={8}>
                    <NewTermRequest />
                    <ScrollToTopButton 
                      anchorIdToFocus="glossary-heading"
                    />
                  </VStack>
                </>
              )}
            </Container>
          </Box>
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
