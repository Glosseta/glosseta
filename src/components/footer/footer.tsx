import { HStack, Link, Image, chakra, VStack, Text } from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";
import styles from "../../../styles/Home.module.css";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useTranslation } from "next-i18next";

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
              <FaTwitter title="footer-twitter-icon" />
              <span
                className={styles.visuallyhidden}
                title="footer-twitter-a11y-text"
              >
                {t("footerTwitterA11yText")}
              </span>
              <ExternalLinkIcon mx="2px" />
            </Link>
            <Link
              padding={2}
              href={"https://www.instagram.com/glosseta_foundation"}
              display="flex"
              title="instagram"
              isExternal
            >
              <FaInstagram title="footer-instagram-icon" />
              <span
                className={styles.visuallyhidden}
                title="footer-instagram-a11y-text"
              >
                {t("footerInstagramA11yText")}
              </span>
              <ExternalLinkIcon mx="2px" />
            </Link>
            <Link
              padding={2}
              href={"https://www.tiktok.com/@glossetadotcom"}
              display="flex"
              title="tiktok"
              isExternal
            >
              <FaTiktok title="footer-tiktok-icon" />
              <span
                className={styles.visuallyhidden}
                title="footer-tiktok-a11y-text"
              >
                {t("footerTiktokA11yText")}
              </span>
              <ExternalLinkIcon mx="2px" />
            </Link>
            <Link
              padding={2}
              href={"https://github.com/glosseta/glosseta"}
              display="flex"
              title="github"
              isExternal
            >
              <FaGithub title="footer-github-icon" />
              <span
                className={styles.visuallyhidden}
                title="footer-github-a11y-text"
              >
                {t("footerGitHubA11yText")}
              </span>
              <ExternalLinkIcon mx="2px" />
            </Link>
          </HStack>
          <Text title="copyright-text" fontSize={{ base: "xs", sm: "sm" }}>{t("copyright")}</Text>
        </VStack>
      </chakra.footer>
    </>
  );
};

export default Footer;
