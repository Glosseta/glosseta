import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, HStack } from "@chakra-ui/react";
import { useState, SetStateAction } from "react";
import { useTranslation } from "next-i18next";

const SearchBar = ({
  baseWidth,
  smWidth,
  mdWidth,
  lgWidth,
}: any): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const handleSearchTermChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setSearchTerm(event.target.value);

  return (
    <>
      <HStack padding={2}>
        <form action="#">
          <fieldset>
            <InputGroup aria-label={t("searchInputGroupAriaLabel")}>
              <InputLeftElement
                className="InputLeft"
                pointerEvents="none"
                size="xs"
              >
                <SearchIcon
                  aria-label={t("searchIconAriaLabel")}
                  className="SearchIcon"
                  color="gray.300"
                />
              </InputLeftElement>
              <Input
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
                placeholder="Search for a word i.e. web3"
                _placeholder={{
                  color: "gray.500",
                  fontSize: { base: "sm", sm: "md" },
                }}
                onClick={(event) => {
                  event.currentTarget.scrollIntoView(false);
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter" && searchTerm !== "") {
                    event.preventDefault();
                    location.assign(`/search?term=${searchTerm.toLowerCase()}`);
                  }
                }}
              />
            </InputGroup>
          </fieldset>
        </form>
      </HStack>
    </>
  );
};

export default SearchBar;
