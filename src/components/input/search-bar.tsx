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
    if (userInput.trim().length === 0) {
      setSearchTerm("");
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setActiveSuggestion(-1);
    } else {
      //Grab the first 5 entries found in the trie to limit the size of the filter
      const filter = filterTrie.find(userInput.trim().toLowerCase()).slice(0, 5);

      setSearchTerm(userInput);
      setFilteredSuggestions(filter);
      setShowSuggestions(true);
      setActiveSuggestion(-1);
    }
  };

  const shouldMoveUpFilter = (event: any) => {
    return (
      (event.key === "ArrowUp" && activeSuggestion !== -1) ||
      (event.shiftKey && event.key === "Tab" && activeSuggestion !== -1)
    );
  };

  const shouldMoveDownFilter = (event: any) => {
    return event.key === "ArrowDown" || event.key === "Tab";
  };

  const onKeyDown = (event: any) => {
    if (event.key === "Enter" && searchTerm.trim().length != 0) {
      event.preventDefault();
      location.assign(`/search/term/${searchTerm.trim().toLowerCase()}`);
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
                    color="gray.500"
                  />
                </InputLeftElement>
                <Input
                  title="search-bar-input"
                  aria-expanded={showSuggestions}
                  aria-owns="filter-list"
                  autoComplete={"off"}
                  variant="filled"
                  aria-label={t("searchInputAriaLabel")}
                  backgroundColor="gray.50"
                  color="gray.900"
                  rounded="xl"
                  shadow="sm"
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
                    color: "gray.400",
                    fontSize: { base: "sm", sm: "md" },
                  }}
                  _hover={{
                    backgroundColor: "gray.100"
                  }}
                  _focus={{
                    backgroundColor: "white",
                    borderColor: "blue.400",
                    shadow: "md"
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
            spacing={1}
            padding={2}
            background="white"
            color="gray.900"
            rounded="xl"
            shadow="lg"
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
                      key={suggestion}
                      aria-selected={index === activeSuggestion ? true : false}
                      onClick={(event) => {
                        setSearchTerm(event.currentTarget.innerText);
                        setFilteredSuggestions([]);
                        setShowSuggestions(false);
                        setActiveSuggestion(0);
                        location.assign(
                          `/search/term/${event.currentTarget.innerText
                            .trim()
                            .toLowerCase()}`
                        );
                      }}
                      background={
                        index === activeSuggestion ? "blue.50" : "white"
                      }
                      color={index === activeSuggestion ? "blue.700" : "gray.700"}
                      padding={3}
                      rounded="md"
                      cursor="pointer"
                      _hover={{
                        background: "blue.50",
                        color: "blue.700"
                      }}
                      transition="all 0.2s"
                    >
                      <ListIcon as={SearchIcon} color={index === activeSuggestion ? "blue.500" : "gray.400"} />
                      {suggestion}
                    </ListItem>
                  </>
                );
              })}

            {filteredSuggestions.length === 0 && (
              <>
                <ListItem 
                  key="unknown" 
                  color="gray.500"
                  padding={3}
                >
                  <ListIcon as={SearchIcon} color="gray.400" />
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
