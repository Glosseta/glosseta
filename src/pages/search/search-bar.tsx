import { useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  List,
  ListItem,
  ListIcon,
  VStack,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useState, SetStateAction } from "react";
import { useTranslation } from "next-i18next";
import Trie from "../../filter/trie";
import AutocompleteFilter from "../../filter/autocomplete";

const SearchBar = ({
  baseWidth,
  smWidth,
  mdWidth,
  lgWidth,
  filterItems,
}: {
  baseWidth: string;
  smWidth: string;
  mdWidth: string;
  lgWidth: string;
  filterItems: any[];
}): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTrie, setFilterTrie] = useState(new Trie());
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(
    [] as string[]
  );

  const { t } = useTranslation();

  const SetUpFilter = () => {
    const autocompleteFilter = new AutocompleteFilter();
    const filter = autocompleteFilter.getFilter(filterItems) as Trie;
    setFilterTrie(filter);
  };

  useEffect(() => {
    SetUpFilter();
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
      setActiveSuggestion(-1);
    } else {
      //Grab the first 5 entries found in the trie to limit the size of the filter
      const filter = filterTrie.find(userInput.toLowerCase()).slice(0, 5);

      setSearchTerm(userInput);
      setFilteredSuggestions(filter);
      setShowSuggestions(true);
      setActiveSuggestion(-1);
    }
  };

  const shouldMoveUpFilter = (event: any) => {
    return event.key === "ArrowUp" || (event.shiftKey && event.key === "Tab");
  };

  const shouldMoveDownFilter = (event: any) => {
    return event.key === "ArrowDown" || event.key === "Tab";
  };

  const onKeyDown = (event: any) => {
    if (event.key === "Enter" && searchTerm.trim().length != 0) {
      event.preventDefault();
      location.assign(`/search?term=${searchTerm.trim().toLowerCase()}`);
    } else if (shouldMoveUpFilter(event) && filteredSuggestions.length > 0) {
      event.preventDefault();

      //Compute the modulo so that we can wrap around the filter
      let index = (activeSuggestion - 1) % filteredSuggestions.length;

      //Need special attention to the negative case since the % operator is actually computes a remainder
      if (index < 0) {
        index = index + filteredSuggestions.length;
      }

      setActiveSuggestion(index);
      setSearchTerm(filteredSuggestions[index]);
    } else if (shouldMoveDownFilter(event) && filteredSuggestions.length > 0) {
      event.preventDefault();

      const index = (activeSuggestion + 1) % filteredSuggestions.length;
      setActiveSuggestion(index);
      setSearchTerm(filteredSuggestions[index]);
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
                  aria-expanded={showSuggestions}
                  aria-owns="filter-list"
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
                  onKeyDown={onKeyDown}
                  value={searchTerm}
                  isRequired={true}
                />
              </InputGroup>
            </fieldset>
          </form>
        </HStack>
        {showSuggestions && (
          <List
            id="filter-list"
            role={"listbox"}
            spacing={3}
            padding={2}
            background="white"
            color="black"
            rounded="lg"
            width={{
              base: baseWidth,
              sm: smWidth,
              md: mdWidth,
              lg: lgWidth,
            }}
          >
            {filteredSuggestions.length > 0 &&
              filteredSuggestions.map((suggestion, index) => {
                return (
                  <>
                    <ListItem
                      role={"option"}
                      color={"black"}
                      key={suggestion}
                      aria-selected={index === activeSuggestion ? true : false}
                      onClick={(event) => {
                        setSearchTerm(event.currentTarget.innerText);
                        setFilteredSuggestions([]);
                        setShowSuggestions(false);
                        setActiveSuggestion(0);
                        location.assign(
                          `/search?term=${event.currentTarget.innerText
                            .trim()
                            .toLowerCase()}`
                        );
                      }}
                      background={
                        index === activeSuggestion ? "darkgray" : "white"
                      }
                      padding={1}
                    >
                      <ListIcon as={SearchIcon} color="gray.300" />
                      {suggestion}
                    </ListItem>
                  </>
                );
              })}

            {filteredSuggestions.length === 0 && (
              <>
                <ListItem key="unknown" color={"black"}>
                  <ListIcon as={SearchIcon} color="gray.300" />
                  {t("searchTermNotFoundInFilter")}
                </ListItem>
              </>
            )}
          </List>
        )}
      </VStack>
    </>
  );
};

export default SearchBar;
