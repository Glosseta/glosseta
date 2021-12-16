import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../../src/pages/search/search-bar";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

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
    const baseWidth = "100vw";
    const smWidth = "80vw";
    const mdWidth = "70vw";
    const lgWidth = "670vw";

    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
      />
    );

    const searchBarIcon = screen.getByTitle("search-bar-icon");
    const searchBarInput = screen.getByTitle("search-bar-input");

    expect(searchBarIcon).toBeInTheDocument();
    expect(searchBarInput).toBeInTheDocument();
  });

  it("It updates the search bar input", () => {
    const baseWidth = "100vw";
    const smWidth = "80vw";
    const mdWidth = "70vw";
    const lgWidth = "670vw";

    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
      />
    );
    const searchBarInput = screen.getByTitle("search-bar-input");
    const searchTerm = "hodl";

    fireEvent.change(searchBarInput, { target: { value: searchTerm } });
    expect(searchBarInput.value).toBe(searchTerm);
  });

  it("It successfully searches a term when input present", () => {
    const baseWidth = "100vw";
    const smWidth = "80vw";
    const mdWidth = "70vw";
    const lgWidth = "670vw";

    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
      />
    );
    const searchBarInput = screen.getByTitle("search-bar-input");
    const searchTerm = "hodl";

    fireEvent.change(searchBarInput, { target: { value: searchTerm } });
    expect(searchBarInput.value).toBe(searchTerm);

    fireEvent.keyPress(searchBarInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(window.location.assign).toHaveBeenCalledWith(
      `/search?term=${searchTerm}`
    );
  });

  it("It doesn't search a term when input empty", () => {
    const baseWidth = "100vw";
    const smWidth = "80vw";
    const mdWidth = "70vw";
    const lgWidth = "670vw";

    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
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
});
