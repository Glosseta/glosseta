import type { NextPage } from "next";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Image,
  SimpleGrid,
  Input,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import PageLayout from "../components/layout/page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { RiRocketLine, RiBookMarkLine, RiLightbulbLine } from "react-icons/ri";

const Home: NextPage = () => {
  const toast = useToast();

  return (
    <PageLayout>
      {/* Hero Section with Background Image */}
      <Box
        position="relative"
        h="90vh"
        w="full"
        background="linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/mesh-background.webp')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          backdropFilter="blur(2px)"
        />
        <Container maxW="container.xl" h="full">
          <VStack
            position="relative"
            justify="center"
            align="center"
            h="full"
            spacing={8}
            textAlign="center"
          >
            <Heading
              size="4xl"
              color="white"
              fontWeight="bold"
              lineHeight="shorter"
            >
              Glosseta
            </Heading>
            <Text fontSize="xl" color="white" maxW="2xl">
              Your Gateway to Understanding Web3 and Blockchain Technology
            </Text>
            <Button
              size="lg"
              colorScheme="purple"
              rounded="full"
              px={8}
              onClick={() => window.location.href = '/search'}
            >
              Start Learning
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* What is Glosseta Section */}
      <Box py={20} bg="black">
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <VStack 
              align="start" 
              spacing={6}
              justify="center"
              h="full"
            >
              <Heading
                bgGradient="linear(to-r, purple.400, blue.500)"
                bgClip="text"
              >
                What is Glosseta?
              </Heading>
              <Text color="whiteAlpha.900" fontSize="lg">
                Glosseta is your comprehensive guide to understanding Web3 terminology.
                We break down complex blockchain concepts into simple, digestible explanations.
              </Text>
            </VStack>
            <Box>
              <Image 
                src="/mascot_engaged.png" 
                rounded="2xl" 
                alt="About Glosseta"
                objectFit="cover"
                w="full"
                h="full"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Why Glosseta Section */}
      <Box py={20} bg="whiteAlpha.100">
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <Heading
              bgGradient="linear(to-r, purple.400, blue.500)"
              bgClip="text"
              textAlign="center"
            >
              Why Choose Glosseta?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              {[
                {
                  icon: RiLightbulbLine,
                  title: "Daily Updates",
                  description: "New terms added daily to keep you current with Web3 developments"
                },
                {
                  icon: RiBookMarkLine,
                  title: "Expert Curated",
                  description: "Definitions verified by blockchain experts and community leaders"
                },
                {
                  icon: RiRocketLine,
                  title: "Community Driven",
                  description: "Powered by the community, for the community"
                }
              ].map((feature, index) => (
                <VStack
                  key={index}
                  p={8}
                  bg="blackAlpha.400"
                  rounded="xl"
                  spacing={4}
                  align="start"
                >
                  <Box
                    p={3}
                    bg="purple.400"
                    rounded="lg"
                    color="white"
                  >
                    <feature.icon size={24} />
                  </Box>
                  <Heading size="md" color="white">
                    {feature.title}
                  </Heading>
                  <Text color="whiteAlpha.900">
                    {feature.description}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* How it Works Section */}
      <Box py={20} bg="black">
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading
              bgGradient="linear(to-r, purple.400, blue.500)"
              bgClip="text"
            >
              How It Works
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {[1, 2, 3].map((step) => (
                <VStack
                  key={step}
                  spacing={4}
                  p={6}
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="whiteAlpha.100"
                    rounded="xl"
                    transform="rotate(-2deg)"
                  />
                  <Box
                    position="relative"
                    p={6}
                    textAlign="center"
                  >
                    <Text
                      fontSize="6xl"
                      fontWeight="bold"
                      bgGradient="linear(to-r, purple.400, blue.500)"
                      bgClip="text"
                    >
                      {step}
                    </Text>
                    <Text color="white" mt={4}>
                      {step === 1 ? "Search for a term" :
                       step === 2 ? "Learn the definition" :
                       "Share with others"}
                    </Text>
                  </Box>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box py={20} bg="purple.400">
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading color="white" textAlign="center">
              Stay Updated with Web3
            </Heading>
            <Text color="whiteAlpha.900" textAlign="center" fontSize="lg">
              Get the latest Web3 terminology delivered to your inbox
            </Text>
            <Box w="full" maxW="md">
              <form onSubmit={(e) => {
                e.preventDefault();
                toast({
                  title: "Thanks for subscribing!",
                  status: "success",
                  duration: 3000,
                });
              }}>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    bg="white"
                    size="lg"
                    rounded="full"
                    borderWidth={0}
                    _focus={{
                      boxShadow: "outline",
                    }}
                  />
                  <Button
                    type="submit"
                    colorScheme="black"
                    size="lg"
                    rounded="full"
                    w="full"
                    mt={4}
                  >
                    Subscribe
                  </Button>
                </FormControl>
              </form>
            </Box>
          </VStack>
        </Container>
      </Box>
    </PageLayout>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 1200,
  };
}

export default Home;
