import React from "react";
import { render, screen } from "@testing-library/react";
import SearchResults from "../../../../src/pages/search/term/[id]";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => ({
      definition: 'definition',
      unavailableSearchResultDescription: 'unavailableSearchResultDescription',
      apiFetchErrorText: 'apiFetchErrorText',
      requestThisTerm: 'requestThisTerm',
      // Add other keys as needed
    }[key] || key),
  }),
}));

jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
  pathname: jest.fn(),
}));

describe("Search Results - Success", () => {
  it("It renders the search results page with the search result", async () => {
    const term = "term";
    const definition = "definition";
    const isAvailable = true;
    const category = "category";
    const transactionId = "1";
    const isError = false;

    render(
      <SearchResults
        term={term}
        definition={definition}
        isAvailable={isAvailable}
        category={category}
        transactionId={transactionId}
        isError={isError}
      />
    );

    // Check for the term heading
    const termHeading = screen.getByRole('heading', { name: term.toUpperCase() });
    expect(termHeading).toBeInTheDocument();

    // Check for definition section
    const definitionHeading = screen.getByRole('heading', { name: 'definition' });
    expect(definitionHeading).toBeInTheDocument();
    
    // Use getAllByText and check the specific one we want
    const definitionTexts = screen.getAllByText(definition);
    const definitionContent = definitionTexts.find(
      element => element.tagName.toLowerCase() === 'p'
    );
    expect(definitionContent).toBeInTheDocument();

    // Check that error and unavailable content is not present
    expect(screen.queryByText('unavailableSearchResultDescription')).not.toBeInTheDocument();
    expect(screen.queryByText('apiFetchErrorText')).not.toBeInTheDocument();
  });
});

describe("Search Results - Not found", () => {
  it("It renders the search results page with the unavailability content", () => {
    const term = "term";
    const definition = "";
    const isAvailable = false;
    const category = "unavailable";
    const transactionId = "";
    const isError = false;

    render(
      <SearchResults
        term={term}
        definition={definition}
        isAvailable={isAvailable}
        category={category}
        transactionId={transactionId}
        isError={isError}
      />
    );

    // Check for unavailable content
    const termHeading = screen.getByRole('heading', { name: term.toUpperCase() });
    expect(termHeading).toBeInTheDocument();
    
    expect(screen.getByText('unavailableSearchResultDescription')).toBeInTheDocument();
    expect(screen.getByText('requestThisTerm')).toBeInTheDocument();

    // Check that success content is not present
    expect(screen.queryByRole('heading', { name: 'definition' })).not.toBeInTheDocument();
  });
});

describe("Search Results - Error", () => {
  it("It renders the search results page with the error page", () => {
    const term = "term";
    const definition = "";
    const isAvailable = false;
    const category = "unavailable";
    const transactionId = "";
    const isError = true;

    render(
      <SearchResults
        term={term}
        definition={definition}
        isAvailable={isAvailable}
        category={category}
        transactionId={transactionId}
        isError={isError}
      />
    );

    // Check for error content
    expect(screen.getByText('apiFetchErrorText')).toBeInTheDocument();

    // Check that success and unavailable content is not present
    expect(screen.queryByRole('heading', { name: term.toUpperCase() })).not.toBeInTheDocument();
    expect(screen.queryByText('unavailableSearchResultDescription')).not.toBeInTheDocument();
  });
});
