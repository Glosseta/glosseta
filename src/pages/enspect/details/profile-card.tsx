import { useCallback } from "react";
import {
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
  FaComments,
} from "react-icons/fa";
import LinkComponent from "./link-component";
import DataComponent from "./data-component";
import { useTranslation } from "next-i18next";

const NOT_SET = "NOT_SET";

const ProfileCard = ({
  accountAddress,
  ensName,
  name,
  description,
  twitter,
  github,
  linkedin,
  website,
  qrcode,
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
}): JSX.Element => {
  const { t } = useTranslation();
  const toast = useToast();

  const copyText = useCallback(() => {
    navigator.clipboard.writeText(accountAddress);
    toast({
      title: t("ensCopyAddressToastMessage"),
      status: "success",
      isClosable: true,
    });
  }, [toast, t, accountAddress]);

  const createUrl = ({
    identifier,
    urlPrefix,
  }: {
    identifier: string;
    urlPrefix: string;
  }) => {
    return identifier && identifier.toLocaleLowerCase().includes("http")
      ? identifier
      : `${urlPrefix}${identifier}`;
  };

  const linkedInUrl = createUrl({
    identifier: linkedin,
    urlPrefix: "https://www.linkedin.com/in/",
  });
  const githubUrl = createUrl({
    identifier: github,
    urlPrefix: "https://github.com/",
  });
  const twitterUrl = createUrl({
    identifier: twitter,
    urlPrefix: "https://twitter.com/",
  });
  const websiteUrl = createUrl({
    identifier: website,
    urlPrefix: "http://",
  });
  const etherScanUrl = createUrl({
    identifier: accountAddress,
    urlPrefix: "https://etherscan.io/address/",
  });
  const openseaUrl = createUrl({
    identifier: accountAddress,
    urlPrefix: "https://opensea.io/",
  });
  const ensSearchUrl = createUrl({
    identifier: ensName,
    urlPrefix: "https://app.ens.domains/search/",
  });

  const blockScanChatUrl = createUrl({
    identifier: accountAddress,
    urlPrefix: "https://chat.blockscan.com/index?a=",
  });

  const avatarLink = `https://metadata.ens.domains/mainnet/avatar/${ensName}?v=1.0`;

  return (
    <Container
      title="ens-result-search-result-container"
      maxW={{ base: "sm", sm: "xl" }}
      background="white"
      borderWidth="5px"
      borderColor="black"
    >
      <VStack>
        <>
          <VStack spacing={3}>
            <Tooltip label={ensName}>
              <Heading
                as="h1"
                padding={1}
                color="black"
                textAlign="center"
                fontSize={{ base: "lg", sm: "xl" }}
                maxW={"xs"}
                isTruncated
              >
                {ensName}
              </Heading>
            </Tooltip>
            <Avatar
              title="ens-profile-avatar"
              size="2xl"
              src={avatarLink}
              borderWidth="5px"
              borderColor="black"
              name={ensName}
            />

            <HStack>
              <LinkComponent
                title="twitter"
                identifier={twitter}
                url={twitterUrl}
                icon={<FaTwitter title="ens-twitter-icon" />}
                a11yText={t("ensTwitterA11yText")}
              />
              <LinkComponent
                title="github"
                identifier={github}
                url={githubUrl}
                icon={<FaGithub title="ens-github-icon" />}
                a11yText={t("ensGithubA11yText")}
              />
              <LinkComponent
                title="linkedin"
                identifier={linkedin}
                url={linkedInUrl}
                icon={<FaLinkedin title="ens-linkedin-icon" />}
                a11yText={t("ensLinkedin11yText")}
              />
              <LinkComponent
                title="website"
                identifier={website}
                url={websiteUrl}
                icon={<FaHome title="ens-website-icon" />}
                a11yText={t("ensPersonalWebsitebA11yText")}
              />
              <LinkComponent
                title="opensea"
                identifier={accountAddress}
                url={openseaUrl}
                icon={
                  <Image
                    height="20px"
                    width="20px"
                    src="/opensea_logo.svg"
                    alt="Opensea"
                  />
                }
                a11yText={t("ensOpenseaA11yText")}
              />
            </HStack>

            <Divider orientation="horizontal" />

            <VStack textAlign={"center"}>
              {accountAddress != NOT_SET && (
                <>
                  <DataComponent label={t("ensNameLabel")} data={name} />
                  <DataComponent
                    label={t("ensAboutLabel")}
                    data={description}
                  />
                  <DataComponent
                    label={t("ethereumWalletAddress")}
                    data={accountAddress}
                  />
                  <Tooltip label={t("addressCopyToolTip")}>
                    <IconButton
                      title="copy-ethereum-address-button"
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
                      title="qrcode-ethereum-address"
                      src={qrcode}
                      alt={t("ethereumAddressQRCode")}
                    />
                  </Tooltip>
                  <HStack>
                    <LinkComponent
                      title="blockScanChat"
                      identifier={accountAddress}
                      url={blockScanChatUrl}
                      icon={<FaComments title="ens-blockscan-chat-icon" />}
                      a11yText={t("ensBlockScanChatA11yText")}
                    />
                    <LinkComponent
                      title="etherscan"
                      identifier={accountAddress}
                      url={etherScanUrl}
                      icon={<FaEthereum title="ens-etherscan-icon" />}
                      a11yText={t("ensEtherscanA11yText")}
                    />
                  </HStack>
                </>
              )}
              {accountAddress == NOT_SET && (
                <>
                  <VStack>
                    <Text
                      padding={2}
                      textAlign={"left"}
                      color="black"
                      fontSize={{ base: "sm", sm: "md" }}
                    >
                      {t("ensNameAvailableText")}
                      <Link href={ensSearchUrl} color="blue" isExternal>
                        {t("ens")}
                        <VisuallyHidden>{t("ensLinkA11yText")}</VisuallyHidden>
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
  );
};

export default ProfileCard;
