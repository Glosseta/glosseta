import PageLayout from "../../components/layout/page";
import {
  SimpleGrid,
  chakra,
  Container,
  VStack,
  Heading,
  HStack,
  Box,
  Text,
  SkeletonCircle,
  SkeletonText,
  Avatar,
  Stat,
  StatLabel,
  Link,
  VisuallyHidden,
  Button,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaHome,
  FaEthereum,
} from "react-icons/fa";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { ethers } from "ethers";

const NOT_SET = "NOT_SET";

const LookUpResult = ({
  accountAddress,
  ensName,
  name,
  description,
  twitter,
  github,
  linkedin,
  url,
}: {
  accountAddress: string;
  ensName: string;
  name: string;
  description: string;
  twitter: string;
  github: string;
  linkedin: string;
  url: string;
}): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  const linkedInPrefix = "https://www.linkedin.com/in/";
  const githubPrefix = "https://github.com/";
  const twitterPrefix = "https://twitter.com/";
  const etherScanPrefix = "https://etherscan.io/address/";
  const avatarLink = `https://metadata.ens.domains/mainnet/avatar/${ensName}?v=1.0`;

  //TODO: Issue with the nav bar element translations showing up when staticProps hasn't returned

  if (router.isFallback) {
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
              w="100vw"
            >
              <Container title="glosseta-landing-page" marginTop="-65px">
                <Box padding="6" boxShadow="lg" bg="white">
                  <SkeletonCircle size="20" />
                  <SkeletonText mt="4" noOfLines={4} spacing="4" />
                </Box>
              </Container>
            </SimpleGrid>
          </chakra.main>
        </PageLayout>
      </>
    );
  }

  const linkComponent = ({
    username,
    url,
    icon,
    allyTextKey,
  }: {
    username: string;
    url: string;
    icon: JSX.Element;
    allyTextKey: string;
  }) => {
    if (!url.toLocaleLowerCase().includes("http")) {
      url = "http://" + url;
    }
    return (
      <>
        {username != NOT_SET && (
          <Link
            padding={2}
            href={url}
            display="flex"
            title="twitter"
            isExternal
          >
            {icon}
            <VisuallyHidden>{t(allyTextKey)}</VisuallyHidden>
            <ExternalLinkIcon mx="2px" />
          </Link>
        )}
      </>
    );
  };

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
            {!router.isFallback && (
              <Container
                maxW={{ base: "sm", sm: "xl" }}
                marginTop="-65px"
                background="white"
                borderWidth="5px"
                borderColor="black"
              >
                <VStack>
                  <>
                    <VStack spacing={3}>
                      <Heading
                        as="h1"
                        padding={1}
                        color="black"
                        textAlign="center"
                      >
                        {ensName}
                      </Heading>
                      <Avatar
                        size="2xl"
                        src={avatarLink}
                        borderWidth="5px"
                        borderColor="black"
                      />

                      <HStack>
                        {linkComponent({
                          username: twitter,
                          url: `${twitterPrefix}${twitter}`,
                          icon: <FaTwitter title="ens-twitter-icon" />,
                          allyTextKey: "",
                        })}
                        {linkComponent({
                          username: github,
                          url: `${githubPrefix}${github}`,
                          icon: <FaGithub title="ens-github-icon" />,
                          allyTextKey: "",
                        })}
                        {linkComponent({
                          username: linkedin,
                          url: `${linkedInPrefix}${linkedin}`,
                          icon: <FaLinkedin title="ens-twitter-icon" />,
                          allyTextKey: "",
                        })}
                        {linkComponent({
                          username: url,
                          url: url,
                          icon: <FaHome title="ens-website-icon" />,
                          allyTextKey: "",
                        })}
                        {linkComponent({
                          username: accountAddress,
                          url: `${etherScanPrefix}${accountAddress}`,
                          icon: <FaEthereum title="ens-etherscan-icon" />,
                          allyTextKey: "",
                        })}
                      </HStack>
                      <Stat>
                        <StatLabel>Wallet address</StatLabel>
                        {accountAddress}
                      </Stat>
                      <Stat>
                        <StatLabel>Name</StatLabel>
                        <Text>{name}</Text>
                      </Stat>
                      <Stat>
                        <StatLabel>Description</StatLabel>
                        <Text>{description}</Text>
                      </Stat>
                      <Button
                        as="a"
                        href={`https://tipeth.xyz/${
                          ensName ? ensName : accountAddress
                        }`}
                        colorScheme="purple"
                        leftIcon={<FaEthereum />}
                      >
                        Tip
                      </Button>
                    </VStack>
                  </>
                </VStack>
              </Container>
            )}
          </SimpleGrid>
        </chakra.main>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  locale,
  params,
}: any) => {
  const provider = ethers.getDefaultProvider("homestead", {
    etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
    infura: process.env.NEXT_PUBLIC_INFURA_API_KEY,
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  });

  let ensName;
  let accountAddress;

  if (!params.id.includes(".eth")) {
    ensName = await provider.lookupAddress(params.id);
    // must preform a reverse resolution here to ensure that both the name that was found here
    // and what's returned above match.  If they don't then you should not display the ens name and only the address
    accountAddress = params.id;
  } else {
    ensName = params.id;
    accountAddress = await provider.resolveName(ensName);
  }

  const resolver = await provider.getResolver(ensName);
  const name = await resolver?.getText("name");
  const description = await resolver?.getText("description");
  const twitter = await resolver?.getText("com.twitter");
  const github = await resolver?.getText("com.github");
  const linkedin = await resolver?.getText("com.linkedin");
  const url = await resolver?.getText("url");

  return {
    props: {
      accountAddress: accountAddress,
      ensName: ensName ? ensName : NOT_SET,
      name: name ? name : NOT_SET,
      description: description ? description : NOT_SET,
      twitter: twitter ? twitter : NOT_SET,
      github: github ? github : NOT_SET,
      linkedin: linkedin ? linkedin : NOT_SET,
      url: url ? url : NOT_SET,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60, // In seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

/**
 * TODO
 * 2. Need to fix the case when the ENS name is not registered - touch up the UI to display available data
 * 3. Need to fix the case when an eth address doesn't have an ENS
 *  - in this case the user should only be displayed the address and the etherscan link
 *  - Flip side is to only allow the user to search a .eth name
 *      - pros: reduce friction for new users, easier to search
 *      - cons: power users can't search for
 * 4. Need to fix the cases when certain elements are available and when others aren't
 * 5. Figure out if adding the tipping is feasible/works
 * 6. Figure out how to prevent the missing translation while the use waits for the page to load
 * 6. Integrate opensea api for fetching NFTs
 */

export default LookUpResult;
