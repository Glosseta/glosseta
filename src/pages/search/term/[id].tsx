import { GetStaticPaths, GetStaticProps } from "next";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Icon,
  useColorModeValue,
  Button,
  Flex,
  Tooltip,
  Image,
  Link
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiBook, FiShare2, FiCopy, FiArrowLeft } from "react-icons/fi";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PageLayout from "../../../components/layout/page";
import SearchBar from "../../../components/input/search-bar";
import ApiError from "../../../components/search/api-error";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { termFilter } from "../../../filter/termConfig";
import { fetchGlossaryTerm } from "../../../backend/service/glosseta.service";
import FallBack from "../../../components/loading/fallback";
import styles from "../../../../styles/Home.module.css";
import { VIEWBLOCK_URL } from "../../../utils/glosseta-constants";

const MotionBox = motion(Box);

const SearchResults = ({
  term,
  definition,
  isAvailable,
  category,
  transactionId,
  isError,
}: any): JSX.Element => {
  const twitter_href = `https://twitter.com/intent/tweet?screen_name=Glossetadotcom&text=Please%20add%20${term}%20to%20the%20knowledge%20base`;

  const router = useRouter();
  const { t } = useTranslation();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  if (router.isFallback) {
    return <FallBack />;
  }

  if (isError) {
    return (
      <Container maxW="container.xl" py={10}>
        <ApiError />
      </Container>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(term);
    // Add toast notification here
  };

  const handleShare = () => {
    navigator
      .share({
        title: term,
        text: definition,
        url: window.location.href,
      })
      .catch(() => {
        navigator.clipboard.writeText(window.location.href);
      });
  };

  return (
    <PageLayout>
      <Container maxW="container.xl" py={{ base: 6, md: 12 }}>
        {isAvailable ? (
          <VStack spacing={8} align="stretch">
            {/* Term Header Section */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              bg={bgColor}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={borderColor}
              p={6}
              shadow="sm"
            >
              <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                <VStack align="start" spacing={3}>
                  <Badge
                    colorScheme="blue"
                    fontSize="sm"
                    textTransform="uppercase"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {category}
                  </Badge>
                  <Heading as={"h1"} size="2xl">
                    {term.toUpperCase()}
                  </Heading>
                </VStack>
                <HStack spacing={4}>
                  <Tooltip label="Copy Term">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      leftIcon={<Icon as={FiCopy} />}
                    >
                      {t("copy")}
                    </Button>
                  </Tooltip>
                  <Tooltip label="Share">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleShare}
                      leftIcon={<Icon as={FiShare2} />}
                    >
                      {t("share")}
                    </Button>
                  </Tooltip>
                </HStack>
              </Flex>
            </MotionBox>

            {/* Definition Section */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              bg={bgColor}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={borderColor}
              p={6}
              shadow="sm"
            >
              <VStack align="stretch" spacing={6}>
                <HStack>
                  <Icon as={FiBook} color="blue.500" boxSize={5} />
                  <Heading as={"h2"} fontWeight="bold" fontSize="xl">
                    {t("definition")}
                  </Heading>
                </HStack>
                <Text fontSize="lg" lineHeight="tall">
                  {definition}
                </Text>
                <Divider />
                <HStack justify="space-between" align="center" width="100%">
                  <Link
                    href={`${VIEWBLOCK_URL}/${transactionId}`}
                    isExternal
                    padding={2}
                    color="blue"
                  >
                    {t("searchResultContentSourceTransactionLinkText")}
                    <ExternalLinkIcon mx="2px" />
                    <span className={styles.visuallyhidden}>
                      {t("opensInANewWindow")}
                    </span>
                  </Link>
                  <Image
                    srcSet="/arweave_seal_mobile_light.svg 360w,
                      /arweave_seal_light.png 1100w,"
                    sizes="(max-width: 600px) 360px,
                      1100px"
                    alt="Permanent on Arweave"
                    width="100px"
                  />
                </HStack>
              </VStack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              bg={bgColor}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={borderColor}
              p={6}
              shadow="sm"
            >
              <Heading as={"h2"} size="md" mb={4}>
                {t("moreLearningMaterials")}
              </Heading>
              <VStack spacing={4} align="stretch">
                <Text color="black.500" fontSize="md">
                  {t("comingSoon")}
                </Text>
              </VStack>
            </MotionBox>
          </VStack>
        ) : (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Box
              width="100%"
              background="white"
              borderRadius="xl"
              boxShadow="lg"
              overflow="hidden"
              p={6}
            >
              <VStack spacing={4} align="stretch">
                <Heading
                  as="h1"
                  color="gray.800"
                  fontSize={{ base: "lg", sm: "2xl" }}
                  fontWeight="bold"
                  lineHeight="tight"
                >
                  {term.toUpperCase()}
                </Heading>
                <Text
                  fontSize={{ base: "sm", sm: "md" }}
                  color="gray.600"
                  lineHeight="tall"
                >
                  {t("unavailableSearchResultDescription")}
                </Text>
                <Button
                  as="a"
                  href={twitter_href}
                  target="_blank"
                  colorScheme="purple"
                  size="md"
                  width="fit-content"
                  leftIcon={<FiBook />}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s"
                  rounded="full"
                  px={6}
                >
                  {t("requestThisTerm")}
                </Button>
              </VStack>
            </Box>
          </MotionBox>
        )}
        <Box h={8} />
        {/* Enhanced Search Section */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          position="sticky"
          top={4}
          zIndex={10}
          mb={8}
        >
          <Box
            bg={bgColor}
            borderRadius="2xl"
            boxShadow="lg"
            p={4}
            borderWidth="1px"
            borderColor={borderColor}
            _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
            transition="all 0.2s"
          >
            <VStack spacing={4}>
              <HStack w="full" justify="space-between">
                <Button
                  leftIcon={<FiArrowLeft />}
                  variant="ghost"
                  size="sm"
                  onClick={() => router.back()}
                >
                  {t("back")}
                </Button>
              </HStack>

              <Heading
                as={"h2"}
                fontSize="md"
                color="black.500"
                textAlign="center"
              >
                {t("searchForAnotherTerm")}
              </Heading>

              <Box position="relative" w="full" maxW="600px" mx="auto">
                <SearchBar
                  baseWidth="100%"
                  smWidth="100%"
                  mdWidth="100%"
                  lgWidth="100%"
                  filterItems={termFilter}
                />
              </Box>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
}: any) => {
  const result = await fetchGlossaryTerm(params.id.toLowerCase(), locale);

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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default SearchResults;
