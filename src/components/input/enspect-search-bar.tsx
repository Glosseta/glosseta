import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useState, SetStateAction } from "react";
import { useTranslation } from "next-i18next";

const SearchBar = ({
  baseWidth,
  smWidth,
  mdWidth,
  lgWidth,
}: {
  baseWidth: string;
  smWidth: string;
  mdWidth: string;
  lgWidth: string;
}): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");

  const { t } = useTranslation();

  const handleSearchTermChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const userInput = event.target.value as string;
    if (userInput.trim().length === 0) {
      setSearchTerm("");
    } else {
      setSearchTerm(userInput);
    }
  };

  const requestContainsValidTLD = (request: string) => {
    return (
      /.eth$/.test(request) ||
      /.xyz$/.test(request) ||
      /.luxe$/.test(request) ||
      /.kred$/.test(request) ||
      request.includes(".")
    );
  };

  const onKeyDown = (event: any) => {
    if (event.key === "Enter" && searchTerm.trim().length != 0) {
      event.preventDefault();
      let request = searchTerm.trim().toLowerCase();
      // If the user types a name without a valid TLD, default to .eth
      if (!requestContainsValidTLD(request)) {
        request = `${request}.eth`;
      }

      location.assign(`/enspect/details/${request}`);
    }
  };

  // This submit handler prevents input of whitespace from being submitted
  const handleSubmit = (event: any) => {
    event.preventDefault();
    return false;
  };

  return (
    <>
      <VStack title="enspect-search-bar">
        <HStack padding={2}>
          <form action="#" onSubmit={handleSubmit}>
            <fieldset>
              <InputGroup
                aria-label={t("searchInputGroupAriaLabel")}
              >
                <InputLeftElement
                  className="InputLeft"
                  pointerEvents="none"
                  size="xs"
                  title="enspect-bar-icon"
                >
                  <SearchIcon
                    aria-label={t("searchIconAriaLabel")}
                    className="SearchIcon"
                    color="gray.300"
                  />
                </InputLeftElement>
                <Input
                  title="enspect-bar-input"
                  autoComplete={"off"}
                  variant="outline"
                  aria-label={t("enspectSearchInputAriaLabel")}
                  backgroundColor="white"
                  color="black"
                  rounded="lg"
                  onChange={handleSearchTermChange}
                  width={{
                    base: baseWidth,
                    sm: smWidth,
                    md: mdWidth,
                    lg: lgWidth,
                  }}
                  type="search"
                  id="search"
                  placeholder="Search here i.e. brantly.eth"
                  _placeholder={{
                    color: "gray.500",
                    fontSize: { base: "sm", sm: "md" },
                  }}
                  onClick={(event) => {
                    event.currentTarget.scrollIntoView(false);
                  }}
                  onKeyDown={onKeyDown}
                  value={searchTerm}
                  isRequired={true}
                />
              </InputGroup>
            </fieldset>
          </form>
        </HStack>
      </VStack>
    </>
  );
};

export default SearchBar;
