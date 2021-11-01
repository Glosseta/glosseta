import { HStack, Link } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import styles from "../../../../styles/Home.module.css";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Footer = (): JSX.Element => {
  return (
    <>
      <footer className={styles.footer}>
        <HStack>
          <Link href={"https://twitter.com/Glossetadotcom"} isExternal>
            <FaTwitter />
            <span className={styles.visuallyhidden}>
              Opens Twitter in a new window
            </span>
            <ExternalLinkIcon mx="2px" />
          </Link>
          <Link href={"https://github.com/narbs91/glosseta"} isExternal>
            <FaGithub />
            <span className={styles.visuallyhidden}>
              Opens GitHub in a new window
            </span>
            <ExternalLinkIcon mx="2px" />
          </Link>
        </HStack>
      </footer>
    </>
  );
};

export default Footer;
