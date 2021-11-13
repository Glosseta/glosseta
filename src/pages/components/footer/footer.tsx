import { HStack, Link, Image, chakra, VStack } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import styles from "../../../../styles/Home.module.css";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Footer = (): JSX.Element => {
  return (
    <>
      <chakra.footer isTruncated={false} py={10} color="white">
        <VStack>
          <HStack direction="row" spacing={10}>
            <Link
              padding={2}
              href={"https://twitter.com/Glossetadotcom"}
              display="flex"
              isExternal
            >
              <FaTwitter />
              <span className={styles.visuallyhidden}>
                Opens the Glosseta Twitter page in a new window
              </span>
              <ExternalLinkIcon mx="2px" />
            </Link>
            <Link
              padding={2}
              href={"https://github.com/narbs91/glosseta"}
              display="flex"
              isExternal
            >
              <FaGithub />
              <span className={styles.visuallyhidden}>
                Opens the GitHub project repo in a new window
              </span>
              <ExternalLinkIcon mx="2px" />
            </Link>
            <Link
              padding={2}
              href={"https://www.arweave.org/"}
              display="flex"
              isExternal
            >
              <Image
                borderRadius="full"
                boxSize="18px"
                src="./arweave_logo.png"
                role="none"
              />
              <span className={styles.visuallyhidden}>
                Opens Arweave.org in a new window
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
