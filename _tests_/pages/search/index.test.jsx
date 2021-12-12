import React from "react";
import { render, screen } from "@testing-library/react";
import SearchResults from "../../../src/pages/search/index";
import { getServerSideProps } from "../../../src/pages/search/index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
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

    const searchBarInput = screen.getByTitle("search-bar-input");
    const resultContainer = screen.getByTitle("search-result-content");
    const resultUnavailableContainer = screen.queryByTitle(
      "unavailable-search-result"
    );
    const apiErrorContainer = screen.queryByTitle("api-error-result");

    expect(searchBarInput).toBeInTheDocument();
    expect(resultUnavailableContainer).not.toBeInTheDocument();
    expect(apiErrorContainer).not.toBeInTheDocument();

    expect(resultContainer).toBeInTheDocument();
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

    const searchBarInput = screen.getByTitle("search-bar-input");
    const resultContainer = screen.queryByTitle("search-result-content");
    const resultUnavailableContainer = screen.getByTitle(
      "unavailable-search-result"
    );
    const apiErrorContainer = screen.queryByTitle("api-error-result");

    expect(searchBarInput).toBeInTheDocument();
    expect(resultContainer).not.toBeInTheDocument();
    expect(apiErrorContainer).not.toBeInTheDocument();

    expect(resultUnavailableContainer).toBeInTheDocument();
    expect(resultUnavailableContainer).toHaveTextContent("unavailableSearchResultDescription")
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

    const searchBarInput = screen.getByTitle("search-bar-input");
    const resultContainer = screen.queryByTitle("search-result-content");
    const resultUnavailableContainer = screen.queryByTitle(
      "unavailable-search-result"
    );
    const apiErrorContainer = screen.getByTitle("api-error-result");

    expect(searchBarInput).toBeInTheDocument();
    expect(resultContainer).not.toBeInTheDocument();
    expect(resultUnavailableContainer).not.toBeInTheDocument();

    expect(apiErrorContainer).toBeInTheDocument();
    expect(apiErrorContainer).toHaveTextContent("apiFetchErrorText")
  });
});

describe("GetServerSideProps", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("Returns correct response on successful api call", async () => {
    const term = "term";
    const definition = "definition";
    const isAvailable = true;
    const category = "category";
    const transactionId = "1";
    const isError = false;

    fetchMock.mockOnce(
      JSON.stringify({
        data: {
          transactions: {
            edges: [
              {
                node: {
                  id: "1",
                  tags: [
                    {
                      name: "Content-Type",
                      value: "application/json",
                    },
                    {
                      name: "term",
                      value: "term",
                    },
                    {
                      name: "description",
                      value: "definition",
                    },
                    {
                      name: "locale",
                      value: "en",
                    },
                    {
                      name: "source",
                      value: "GLOSSETA-PROD",
                    },
                    {
                      name: "category",
                      value: "category",
                    },
                  ],
                },
              },
            ],
          },
        },
      })
    );

    const response = await getServerSideProps({
      query: { term: term },
      locale: "en",
    });

    expect(response.props.term).toEqual(term);
    expect(response.props.definition).toEqual(definition);
    expect(response.props.category).toEqual(category);
    expect(response.props.isAvailable).toEqual(isAvailable);
    expect(response.props.transactionId).toEqual(transactionId);
    expect(response.props.isError).toEqual(isError);
  });

  it("Returns correct response when search result not found", async () => {
    const term = "term2";
    const definition = "";
    const isAvailable = false;
    const category = "unavailable";
    const transactionId = "";
    const isError = false;

    fetchMock.mockOnce(
      JSON.stringify({
        data: {
          transactions: {
            edges: [],
          },
        },
      })
    );

    const response = await getServerSideProps({
      query: { term: term },
      locale: "en",
    });

    expect(response.props.term).toEqual(term);
    expect(response.props.definition).toEqual(definition);
    expect(response.props.category).toEqual(category);
    expect(response.props.isAvailable).toEqual(isAvailable);
    expect(response.props.transactionId).toEqual(transactionId);
    expect(response.props.isError).toEqual(isError);
  });

  it("Returns correct response on error api call", async () => {
    const term = "term3";
    const definition = "";
    const isAvailable = false;
    const category = "unavailable";
    const transactionId = "";
    const isError = true;

    fetchMock.mockReject(
      new Error("Error communicating with arweave graphql api")
    );

    const response = await getServerSideProps({
      query: { term: term },
      locale: "en",
    });

    expect(response.props.term).toEqual(term);
    expect(response.props.definition).toEqual(definition);
    expect(response.props.category).toEqual(category);
    expect(response.props.isAvailable).toEqual(isAvailable);
    expect(response.props.transactionId).toEqual(transactionId);
    expect(response.props.isError).toEqual(isError);
  });
});
