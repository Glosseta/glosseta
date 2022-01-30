import PageLayout from "../../components/layout/page";
import { SimpleGrid, chakra } from "@chakra-ui/react";
import FallBack from "./fallback";
import ProfileCard from "./profile-card";
import SearchBar from "../../components/input/enspect-search-bar";
import EnsSearchError from "./ens-search-error";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import QRCode from "qrcode";

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
  const router = useRouter();

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
            title="enspect-details-content"
            columns={1}
            spacing="80px"
            flex={1}
            justifyContent="center"
            flexDirection="column"
            display="flex"
            alignItems="center"
            marginTop={10}
          >
            <SearchBar
              baseWidth={"80vw"}
              smWidth={"50vw"}
              mdWidth={"50vw"}
              lgWidth={"30vw"}
            />
            <ProfileCard
              accountAddress={accountAddress}
              ensName={ensName}
              name={name}
              description={description}
              twitter={twitter}
              github={github}
              linkedin={linkedin}
              website={website}
              qrcode={qrcode}
            />
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
    pocket: {
      applicationId: process.env.NEXT_PUBLIC_POCKET_APP_ID,
      applicationSecretKey: process.env.NEXT_PUBLIC_POCKET_SECRET_KEY
    }
  });

  let ensName = params.id as string;;
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
      ensName: ensName ? ensName.toUpperCase() : NOT_SET,
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

export default LookUpResult;
