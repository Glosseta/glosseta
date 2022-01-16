import { Link, VisuallyHidden } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const NOT_SET = "NOT_SET";

const LinkComponent = ({
  username,
  url,
  icon,
  a11yText,
}: {
  username: string;
  url: string;
  icon: JSX.Element;
  a11yText: string;
}): JSX.Element => {
  if (url && !url.toLocaleLowerCase().includes("http")) {
    url = "http://" + url;
  }
  return (
    <>
      {username != NOT_SET && (
        <Link
          padding={2}
          href={url}
          display="flex"
          isExternal
          fontSize={{ base: "md", sm: "xl" }}
        >
          {icon}
          <VisuallyHidden>{a11yText}</VisuallyHidden>
          <ExternalLinkIcon mx="2px" />
        </Link>
      )}
    </>
  );
};

export default LinkComponent;
