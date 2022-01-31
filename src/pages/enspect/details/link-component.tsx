import { Link, VisuallyHidden } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const NOT_SET = "NOT_SET";

const LinkComponent = ({
  title,
  identifier,
  url,
  icon,
  a11yText,
}: {
  title: string;
  identifier: string;
  url: string;
  icon: JSX.Element;
  a11yText: string;
}): JSX.Element => {
  return (
    <>
      {identifier && identifier != NOT_SET && (
        <Link
          title={title}
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
