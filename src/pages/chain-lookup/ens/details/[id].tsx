import PageLayout from "../../../components/layout/page";
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
} from "@chakra-ui/react";
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
import SearchBar from "../../../components/input/chain-contact-search-bar";
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
  url,
  qrcode,
}: {
  accountAddress: string;
  ensName: string;
  name: string;
  description: string;
  twitter: string;
  github: string;
  linkedin: string;
  url: string;
  qrcode: string;
}): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;

  const linkedInPrefix = "https://www.linkedin.com/in/";
  const githubPrefix = "https://github.com/";
  const twitterPrefix = "https://twitter.com/";
  const etherScanPrefix = "https://etherscan.io/address/";
  const avatarLink = `https://metadata.ens.domains/mainnet/avatar/${ensName}?v=1.0`;

  const copyText = useCallback(() => {
    navigator.clipboard.writeText(accountAddress);
    toast({
      title: "Address copied",
      status: "success",
      isClosable: true,
    });
  }, [toast, accountAddress]);

  if (router.isFallback) {
    return <FallBack />;
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
            {!router.isFallback && (
              <Container
                maxW={{ base: "sm", sm: "xl" }}
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
                        fontSize={{ base: "lg", sm: "xl" }}
                        isTruncated
                      >
                        {ensName.toUpperCase()}
                      </Heading>
                      <Avatar
                        size="2xl"
                        src={avatarLink}
                        borderWidth="5px"
                        borderColor="black"
                      />

                      <HStack>
                        <LinkComponent
                          username={twitter}
                          url={`${twitterPrefix}${twitter}`}
                          icon={<FaTwitter title="ens-twitter-icon" />}
                          allyText=""
                        />
                        <LinkComponent
                          username={github}
                          url={`${githubPrefix}${github}`}
                          icon={<FaGithub title="ens-github-icon" />}
                          allyText=""
                        />
                        <LinkComponent
                          username={linkedin}
                          url={`${linkedInPrefix}${linkedin}`}
                          icon={<FaLinkedin title="ens-twitter-icon" />}
                          allyText=""
                        />
                        <LinkComponent
                          username={url}
                          url={url}
                          icon={<FaHome title="ens-website-icon" />}
                          allyText=""
                        />
                        <LinkComponent
                          username={accountAddress}
                          url={`${etherScanPrefix}${accountAddress}`}
                          icon={<FaEthereum title="ens-etherscan-icon" />}
                          allyText=""
                        />
                      </HStack>
                      
                      <Divider orientation="horizontal" />

                      <VStack textAlign={"center"}>
                        <DataComponent label="Name" data={name} />
                        <DataComponent label="Description" data={description} />
                        <DataComponent
                          label="Ethereum Wallet Address"
                          data={accountAddress}
                        />
                        <IconButton
                          onClick={copyText}
                          colorScheme={"gray"}
                          aria-label="Copy Ethereum address"
                          size="lg"
                          icon={<FaCopy />}
                          isRound
                        >
                          <VisuallyHidden>
                            Click this button to copy the Ethereum wallet
                            address
                          </VisuallyHidden>
                        </IconButton>
                        <Image src={qrcode} alt="qrcode" />
                      </VStack>
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
  let name;
  let description;
  let twitter;
  let github;
  let linkedin;
  let url;
  let qrcode;

  try {
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
    name = await resolver?.getText("name");
    description = await resolver?.getText("description");
    twitter = await resolver?.getText("com.twitter");
    github = await resolver?.getText("com.github");
    linkedin = await resolver?.getText("com.linkedin");
    url = await resolver?.getText("url");
    qrcode = await QRCode.toDataURL(accountAddress);
  } catch (error) {
    console.log(`[error retrieving ens related data] error=${error}`);
  }

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
      qrcode: qrcode ? qrcode : NOT_SET,
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
 *  - can add an availability link to the ens.app for the user to purchase
 *   - i.e https://app.ens.domains/name/narbehshahnazarian.eth/register
 * 3. Need to fix the case when an eth address doesn't have an ENS
 *  - in this case the user should only be displayed the address and the etherscan link
 *
 *  - Flip side is to only allow the user to search a .eth name
 *      - pros: reduce friction for new users, easier to search
 *      - cons: power users can't search for
 * 5. Figure out if adding the tipping is feasible/works
 * 6. Integrate opensea api for fetching NFTs
 */

export default LookUpResult;
