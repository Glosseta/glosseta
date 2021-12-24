import { useEffect, useContext } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, HStack } from "@chakra-ui/react";
import { useState, SetStateAction } from "react";
import { useTranslation } from "next-i18next";
import Trie from "../../filter/trie";
import { termItem } from "../../types/glossary-item";

const SearchBar = ({
  baseWidth,
  smWidth,
  mdWidth,
  lgWidth,
  terms,
}: {
  baseWidth: string;
  smWidth: string;
  mdWidth: string;
  lgWidth: string;
  terms: termItem[];
}): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTrie, setFilterTrie] = useState(new Trie());
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(
    [] as string[]
  );

  const { t } = useTranslation();

  const Terms = () => {
    const filterTrie = new Trie();

    terms.forEach((term: termItem) => {
      filterTrie.insert(term.term);
    });

    setFilterTrie(filterTrie);
  };

  useEffect(() => {
    Terms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchTermChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const userInput = event.target.value as string;
    if (userInput.length === 0) {
      setSearchTerm("");
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else {
      setSearchTerm(userInput);
      const filter = filterTrie.find(userInput);
      console.log(filter);
      setFilteredSuggestions(filter);
      setShowSuggestions(true);
    }
  };

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
              {showSuggestions && (
                <ul className="autocomplete">
                  {filteredSuggestions.map((suggestion, index) => {
                    return (
                      <li
                        key={suggestion}
                        // onClick={onClick}
                      >
                        {suggestion}
                      </li>
                    );
                  })}
                </ul>
              )}
            </InputGroup>
          </fieldset>
        </form>
      </HStack>
    </>
  );
};

export default SearchBar;
