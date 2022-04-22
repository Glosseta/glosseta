import React from "react";
import { render, screen, fireEvent, createEvent } from "@testing-library/react";
import SearchBar from "../../../src/components/input/enspect-search-bar";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

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
      />
    );

    const searchBarIcon = screen.getByTitle("enspect-bar-icon");
    const searchBarInput = screen.getByTitle("enspect-bar-input");

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
      />
    );
    const searchBarInput = screen.getByTitle("enspect-bar-input");
    const searchTerm = "abc.eth";

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
      />
    );
    const searchBarInput = screen.getByTitle("enspect-bar-input");
    const searchTerm = "acb.eth";

    fireEvent.change(searchBarInput, { target: { value: searchTerm } });
    expect(searchBarInput.value).toBe(searchTerm);

    fireEvent.keyDown(searchBarInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(window.location.assign).toHaveBeenCalledWith(
      `/enspect/details/${searchTerm}`
    );
  });

  it("It successfully searches a term when input is a ENS name without a TLD", () => {
    render(
      <SearchBar
        baseWidth={baseWidth}
        smWidth={smWidth}
        mdWidth={mdWidth}
        lgWidth={lgWidth}
      />
    );
    const searchBarInput = screen.getByTitle("enspect-bar-input");
    const searchTerm = "abc";
    const expectedSearchTerm = "abc.eth";

    fireEvent.change(searchBarInput, { target: { value: searchTerm } });
    expect(searchBarInput.value).toBe(searchTerm);

    fireEvent.keyDown(searchBarInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(window.location.assign).toHaveBeenCalledWith(
      `/enspect/details/${expectedSearchTerm}`
    );
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
      />
    );
    const searchBarInput = screen.getByTitle("enspect-bar-input");

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
      />
    );
    const searchBarInput = screen.getByTitle("enspect-bar-input");

    fireEvent.change(searchBarInput, { target: { value: "   " } });
    expect(searchBarInput.value).toBe("");

    fireEvent.keyPress(searchBarInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(window.location.assign).toHaveBeenCalledTimes(0);
  });
});
