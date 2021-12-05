import { HStack, Link, Image, chakra, VStack } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import styles from "../../../../styles/Home.module.css";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useTranslation } from 'next-i18next';

const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <chakra.footer isTruncated={false} py={10} color="white">
        <VStack>
          <HStack direction="row" spacing={10}>
            <Link
              padding={2}
              href={"https://twitter.com/Glossetadotcom"}
              display="flex"
              title="twitter"
              isExternal
            >
              <FaTwitter />
              <span className={styles.visuallyhidden}>
                {t('footerTwitterA11yText')}
              </span>
              <ExternalLinkIcon mx="2px" />
            </Link>
            <Link
              padding={2}
              href={"https://github.com/narbs91/glosseta"}
              display="flex"
              title="github"
              isExternal
            >
              <FaGithub />
              <span className={styles.visuallyhidden}>
                {t('footerGitHubA11yText')}
              </span>
              <ExternalLinkIcon mx="2px" />
            </Link>
            <Link
              padding={2}
              href={"https://www.arweave.org/"}
              display="flex"
              title="arweave"
              isExternal
            >
              <Image
                borderRadius="full"
                boxSize="18px"
                src="./arweave_logo.png"
                alt=""
              />
              <span className={styles.visuallyhidden}>
                {t('footerArweaveA11yText')}
              </span>
              <ExternalLinkIcon mx="2px" />
            </Link>
          </HStack>
        </VStack>
      </chakra.footer>
    </>
  );
};

export default Footer;
