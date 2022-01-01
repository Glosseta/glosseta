import React from "react";
import { render, screen, fireEvent, createEvent } from "@testing-library/react";
import SearchBar from "../../../src/pages/search/search-bar";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const filter = ["eip", "ethereum", "whale", "web3"];
const baseWidth = "100vw";
const smWidth = "80vw";
const mdWidth = "70vw";
const lgWidth = "670vw";

const loc = window.location;

beforeEach(() => {
  delete window.location;
  window.location = { assign: jest.fn() };
});

afterEach(() => {
  window.location = loc;
});

describe("Search Bar", () => {
  it("It renders the search bar", () => {
    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
        filterItems={filter}
      />
    );

    const searchBarIcon = screen.getByTitle("search-bar-icon");
    const searchBarInput = screen.getByTitle("search-bar-input");

    expect(searchBarIcon).toBeInTheDocument();
    expect(searchBarInput).toBeInTheDocument();
  });

  it("It updates the search bar input", () => {
    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
        filterItems={filter}
      />
    );
    const searchBarInput = screen.getByTitle("search-bar-input");
    const searchTerm = "hodl";

    fireEvent.change(searchBarInput, { target: { value: searchTerm } });
    expect(searchBarInput.value).toBe(searchTerm);
  });

  it("It successfully searches a term when input present", () => {
    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
        filterItems={filter}
      />
    );
    const searchBarInput = screen.getByTitle("search-bar-input");
    const searchTerm = "hodl";

    fireEvent.change(searchBarInput, { target: { value: searchTerm } });
    expect(searchBarInput.value).toBe(searchTerm);

    fireEvent.keyDown(searchBarInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(window.location.assign).toHaveBeenCalledWith(
      `/search?term=${searchTerm}`
    );
  });

  it("It successfully displays the filter items with user input", () => {
    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
        filterItems={filter}
      />
    );
    const searchBarInput = screen.getByTitle("search-bar-input");
    const searchTerm = "e";

    fireEvent.change(searchBarInput, { target: { value: searchTerm } });
    expect(searchBarInput.value).toBe(searchTerm);

    const autoCompleteFilter = screen.getAllByRole("listitem");
    expect(autoCompleteFilter.length).toBe(2);
  });

  it("It successfully cycles through the filter and selects a item for search", () => {
    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
        filterItems={filter}
      />
    );
    const searchBarInput = screen.getByTitle("search-bar-input");
    const searchTerm = "e";

    fireEvent.change(searchBarInput, { target: { value: searchTerm } });
    expect(searchBarInput.value).toBe(searchTerm);

    const autoCompleteFilter = screen.getAllByRole("listitem");
    expect(autoCompleteFilter.length).toBe(2);

    fireEvent.keyDown(searchBarInput, {
      key: "ArrowDown",
      code: "ArrowDown",
      charCode: 40,
    });

    fireEvent.keyDown(searchBarInput, {
      key: "ArrowDown",
      code: "ArrowDown",
      charCode: 40,
    });

    fireEvent.keyDown(searchBarInput, {
      key: "ArrowUp",
      code: "ArrowUp",
      charCode: 38,
    });

    fireEvent.keyDown(searchBarInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(window.location.assign).toHaveBeenCalledWith(
      `/search?term=${autoCompleteFilter[0].textContent}`
    );
  });

  it("It successfully rolls around the filter options and searches", () => {
    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
        filterItems={filter}
      />
    );
    const searchBarInput = screen.getByTitle("search-bar-input");
    const searchTerm = "e";

    fireEvent.change(searchBarInput, { target: { value: searchTerm } });
    expect(searchBarInput.value).toBe(searchTerm);

    const autoCompleteFilter = screen.getAllByRole("listitem");
    expect(autoCompleteFilter.length).toBe(2);

    fireEvent.keyDown(searchBarInput, {
      key: "ArrowDown",
      code: "ArrowDown",
      charCode: 40,
    });

    fireEvent.keyDown(searchBarInput, {
      key: "ArrowDown",
      code: "ArrowDown",
      charCode: 40,
    });

    fireEvent.keyDown(searchBarInput, {
      key: "ArrowDown",
      code: "ArrowDown",
      charCode: 40,
    });

    fireEvent.keyDown(searchBarInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(window.location.assign).toHaveBeenCalledWith(
      `/search?term=${autoCompleteFilter[0].textContent}`
    );
  });

  it("It successfully searches when filter item clicked", () => {
    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
        filterItems={filter}
      />
    );
    const searchBarInput = screen.getByTitle("search-bar-input");
    const searchTerm = "e";

    fireEvent.change(searchBarInput, { target: { value: searchTerm } });
    expect(searchBarInput.value).toBe(searchTerm);

    const autoCompleteFilter = screen.getAllByRole("listitem");
    expect(autoCompleteFilter.length).toBe(2);

    const filterSelection = autoCompleteFilter[0].textContent;

    fireEvent.click(autoCompleteFilter[0] , {
      target: {
        innerText: filterSelection,
      },
    })

    expect(searchBarInput.value).toBe(filterSelection);
    expect(window.location.assign).toHaveBeenCalledWith(
      `/search?term=${filterSelection}`
    );
  });

  it("It doesn't cycles through the filter when no matches found", () => {
    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
        filterItems={filter}
      />
    );
    const searchBarInput = screen.getByTitle("search-bar-input");
    const searchTerm = "z";

    fireEvent.change(searchBarInput, { target: { value: searchTerm } });
    expect(searchBarInput.value).toBe(searchTerm);

    const autoCompleteFilter = screen.getAllByRole("listitem");
    expect(autoCompleteFilter.length).toBe(1);
    expect(autoCompleteFilter[0].textContent).toBe(
      "searchTermNotFoundInFilter"
    );

    fireEvent.keyDown(searchBarInput, {
      key: "ArrowDown",
      code: "ArrowDown",
      charCode: 40,
    });
  });
});

describe("Search Bar - preventing bad user input", () => {
  it("It doesn't search a term when input empty", () => {
    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
        filterItems={filter}
      />
    );
    const searchBarInput = screen.getByTitle("search-bar-input");

    fireEvent.change(searchBarInput, { target: { value: "" } });
    expect(searchBarInput.value).toBe("");

    fireEvent.keyPress(searchBarInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(window.location.assign).toHaveBeenCalledTimes(0);
  });

  it("It doesn't search a term when input is whitespace", () => {
    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
        filterItems={filter}
      />
    );
    const searchBarInput = screen.getByTitle("search-bar-input");

    fireEvent.change(searchBarInput, { target: { value: "   " } });
    expect(searchBarInput.value).toBe("   ");

    fireEvent.keyPress(searchBarInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(window.location.assign).toHaveBeenCalledTimes(0);
  });
});
