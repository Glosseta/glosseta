import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, HStack } from "@chakra-ui/react";
import { useState, SetStateAction } from "react";

const SearchBar = ({ barWidth }: any): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setSearchTerm(event.target.value);

  return (
    <>
      <HStack padding={2}>
        <form action="#">
          <fieldset>
            <InputGroup aria-label="Search Bar">
              <InputLeftElement
                className="InputLeft"
                pointerEvents="none"
                size="xs"
              >
                <SearchIcon
                  aria-label="Magnifying glass image"
                  className="SearchIcon"
                  color="gray.300"
                />
              </InputLeftElement>
              <Input
                autoComplete={"off"}
                variant="outline"
                aria-label="Search web3 terms here"
                backgroundColor="white"
                color="black"
                rounded="lg"
                onChange={handleSearchTermChange}
                width={barWidth}
                type="search"
                id="search"
                onClick={(event) => {
                  event.currentTarget.scrollIntoView();
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
