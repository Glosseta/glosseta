import PageLayout from "../../components/layout/page";
import {
  SimpleGrid,
  chakra,
  Container,
  VStack,
  Heading,
  HStack,
  Avatar,
  Divider,
  Image,
  useToast,
  IconButton,
  VisuallyHidden,
  Tooltip,
  Text,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaHome,
  FaEthereum,
  FaCopy,
} from "react-icons/fa";
import FallBack from "./fallback";
import LinkComponent from "./link-component";
import DataComponent from "./data-component";
import SearchBar from "../../components/input/enspect-search-bar";
import EnsSearchError from "./ens-search-error";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import QRCode from "qrcode";
import { useCallback } from "react";

const NOT_SET = "NOT_SET";

const LookUpResult = ({
  accountAddress,
  ensName,
  name,
  description,
  twitter,
  github,
  linkedin,
  website,
  qrcode,
  isError,
}: {
  accountAddress: string;
  ensName: string;
  name: string;
  description: string;
  twitter: string;
  github: string;
  linkedin: string;
  website: string;
  qrcode: string;
  isError: boolean;
}): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const toast = useToast();

  const linkedInUrl =
    linkedin && linkedin.toLocaleLowerCase().includes("http")
      ? linkedin
      : `https://www.linkedin.com/in/${linkedin}`;
  const githubUrl =
    github && github.toLocaleLowerCase().includes("http")
      ? github
      : `https://github.com/${github}`;
  const twitterUrl =
    twitter && twitter.toLocaleLowerCase().includes("http")
      ? twitter
      : `https://twitter.com/${twitter}`;
  const websiteUrl =
    website && !website.toLocaleLowerCase().includes("http")
      ? `http://${website}`
      : website;
  const etherScanPrefix = "https://etherscan.io/address/";
  const avatarLink = `https://metadata.ens.domains/mainnet/avatar/${ensName}?v=1.0`;
  const openseaLink = `https://opensea.io/${accountAddress}`;
  const ensSearchLink = `https://app.ens.domains/search/${ensName}`;

  const copyText = useCallback(() => {
    navigator.clipboard.writeText(accountAddress);
    toast({
      title: t("ensCopyAddressToastMessage"),
      status: "success",
      isClosable: true,
    });
  }, [toast, t, accountAddress]);

  if (router.isFallback) {
    return <FallBack />;
  }

  if (isError) {
    return <EnsSearchError ensName={ensName} />;
  }

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
            <SearchBar
              baseWidth={"80vw"}
              smWidth={"50vw"}
              mdWidth={"50vw"}
              lgWidth={"30vw"}
            />
            <Container
              maxW={{ base: "sm", sm: "xl" }}
              background="white"
              borderWidth="5px"
              borderColor="black"
            >
              <VStack>
                <>
                  <VStack spacing={3}>
                    <Tooltip label={ensName.toUpperCase()}>
                      <Heading
                        as="h1"
                        padding={1}
                        color="black"
                        textAlign="center"
                        fontSize={{ base: "lg", sm: "xl" }}
                        maxW={"xs"}
                        isTruncated
                      >
                        {ensName.toUpperCase()}
                      </Heading>
                    </Tooltip>
                    <Avatar
                      size="2xl"
                      src={avatarLink}
                      borderWidth="5px"
                      borderColor="black"
                      name={ensName}
                    />

                    <HStack>
                      <LinkComponent
                        identifier={twitter}
                        url={twitterUrl}
                        icon={<FaTwitter title="ens-twitter-icon" />}
                        a11yText={t("ensTwitterA11yText")}
                      />
                      <LinkComponent
                        identifier={github}
                        url={githubUrl}
                        icon={<FaGithub title="ens-github-icon" />}
                        a11yText={t("ensGithubA11yText")}
                      />
                      <LinkComponent
                        identifier={linkedin}
                        url={linkedInUrl}
                        icon={<FaLinkedin title="ens-twitter-icon" />}
                        a11yText={t("ensLinkedin11yText")}
                      />
                      <LinkComponent
                        identifier={website}
                        url={websiteUrl}
                        icon={<FaHome title="ens-website-icon" />}
                        a11yText={t("ensPersonalWebsitebA11yText")}
                      />
                      <LinkComponent
                        identifier={accountAddress}
                        url={`${etherScanPrefix}${accountAddress}`}
                        icon={<FaEthereum title="ens-etherscan-icon" />}
                        a11yText={t("ensEtherscanA11yText")}
                      />
                      <LinkComponent
                        identifier={accountAddress}
                        url={openseaLink}
                        icon={
                          <Image
                            height="24px"
                            width="24px"
                            src="/opensea_logo.svg"
                            alt="Opensea"
                          />
                        }
                        a11yText={t("ensOpenseaA11yText")}
                      />
                    </HStack>

                    <Divider orientation="horizontal" />

                    <VStack textAlign={"center"}>
                      <DataComponent label={t("ensNameLabel")} data={name} />
                      <DataComponent
                        label={t("ensAboutLabel")}
                        data={description}
                      />
                      {accountAddress != NOT_SET && (
                        <>
                          <DataComponent
                            label={t("ethereumWalletAddress")}
                            data={accountAddress}
                          />
                          <Tooltip label={t("addressCopyToolTip")}>
                            <IconButton
                              onClick={copyText}
                              colorScheme={"gray"}
                              aria-label={t("copyEthereumAddress")}
                              size="lg"
                              icon={<FaCopy />}
                              isRound
                            >
                              <VisuallyHidden>
                                {t("copyEthereumAddressA11yText")}
                              </VisuallyHidden>
                            </IconButton>
                          </Tooltip>
                          <Tooltip label={t("addressQRCodeToolTip")}>
                            <Image
                              src={qrcode}
                              alt={t("ethereumAddressQRCode")}
                            />
                          </Tooltip>
                        </>
                      )}
                      {accountAddress == NOT_SET && (
                        <>
                          <VStack>
                            <Text
                              textAlign={"left"}
                              color="black"
                              fontSize={{ base: "sm", sm: "md" }}
                            >
                              {t("ensNameAvailableText")}
                              <Link
                                href={ensSearchLink}
                                color="blue"
                                isExternal
                              >
                                {t("ens")}
                                <VisuallyHidden>
                                  {t("ensLinkA11yText")}
                                </VisuallyHidden>
                                <ExternalLinkIcon mx="2px" />
                              </Link>
                            </Text>
                          </VStack>
                        </>
                      )}
                    </VStack>
                  </VStack>
                </>
              </VStack>
            </Container>
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
  let name;
  let description;
  let twitter;
  let github;
  let linkedin;
  let website;
  let qrcode;
  let isError = false;

  try {
    ensName = params.id;
    accountAddress = await provider.resolveName(ensName);

    const resolver = await provider.getResolver(ensName);
    name = await resolver?.getText("name");
    description = await resolver?.getText("description");
    twitter = await resolver?.getText("com.twitter");
    github = await resolver?.getText("com.github");
    linkedin = await resolver?.getText("com.linkedin");
    website = await resolver?.getText("url");
    qrcode = accountAddress ? await QRCode.toDataURL(accountAddress) : null;
  } catch (error) {
    console.log(`[error retrieving ens related data] error=${error}`);
    isError = true;
  }

  return {
    props: {
      accountAddress: accountAddress ? accountAddress : NOT_SET,
      ensName: ensName ? ensName : NOT_SET,
      name: name ? name : NOT_SET,
      description: description ? description : NOT_SET,
      twitter: twitter ? twitter : NOT_SET,
      github: github ? github : NOT_SET,
      linkedin: linkedin ? linkedin : NOT_SET,
      website: website ? website : NOT_SET,
      qrcode: qrcode ? qrcode : NOT_SET,
      isError: isError,
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
 * 0. Fix error handling to properly handle the case of 
 *    error=Error: invalid ENS address; missing component (argument="name", value="test.test.test.brantly.xyz.luxe.", code=INVALID_ARGUMENT, version=hash/5.5.0)
 * 1. Add header tooltip to ens-search-error heading
 * 2. Fix search bar so it doesn't move up and down when there is a different amount of content on the page
 * 7/ unit tests
 */

export default LookUpResult;
