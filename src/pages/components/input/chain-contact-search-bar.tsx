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

  const onKeyDown = (event: any) => {
    if (event.key === "Enter" && searchTerm.trim().length != 0) {
      event.preventDefault();
      location.assign(`/chaintact/details/${searchTerm.trim().toLowerCase()}`);
    }
  };

  // This submit handler prevents input of whitespace from being submitted
  const handleSubmit = (event: any) => {
    event.preventDefault();
    return false;
  };

  return (
    <>
      <VStack>
        <HStack padding={2}>
          <form action="#" onSubmit={handleSubmit}>
            <fieldset>
              <InputGroup
                aria-label={t("searchInputGroupAriaLabel")}
                role={"combobox"}
              >
                <InputLeftElement
                  className="InputLeft"
                  pointerEvents="none"
                  size="xs"
                  title="search-bar-icon"
                >
                  <SearchIcon
                    aria-label={t("searchIconAriaLabel")}
                    className="SearchIcon"
                    color="gray.300"
                  />
                </InputLeftElement>
                <Input
                  title="search-bar-input"
                  autoComplete={"off"}
                  variant="outline"
                  aria-label={t("searchInputAriaLabel")}
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
                  placeholder="Search for an ENS name i.e. glosseta.eth"
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
