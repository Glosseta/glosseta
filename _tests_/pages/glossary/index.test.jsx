import React from "react";
import { render, screen } from "@testing-library/react";
import AllTerms from "../../../src/pages/glossary/index";
import { getStaticProps } from "../../../src/pages/glossary/index";
import { getTermList } from "../../../src/utils/termListUtil";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
  pathname: jest.fn(),
}));

describe("Glossary page - Success", () => {
  it("It renders the glossary page with content", async () => {
    const terms = [];
    const term = {
      term: "term",
      category: "category",
      definition: "definition",
    };

    terms.push(term);

    render(<AllTerms terms={terms} />);

    const glossaryHeading = screen.getByTitle("glossary-list-heading");
    const glossaryContainer = screen.getByTitle("glossary-term-list");
    const scrollToTopButton = screen.getByTitle(
      "glossary-scroll-to-top-button"
    );
    const contentFetchErrorContainer = screen.queryByTitle(
      "glossary-data-fetch-error"
    );
    const newTermRequestContainer = screen.getByTitle(
      "glossary-new-term-request"
    );

    expect(glossaryHeading).toBeInTheDocument();

    expect(glossaryContainer).toBeInTheDocument();
    expect(glossaryContainer).toHaveTextContent(term.term.toUpperCase());
    expect(glossaryContainer).toHaveTextContent(term.category.toUpperCase());
    expect(glossaryContainer).toHaveTextContent(term.definition);

    expect(scrollToTopButton).toBeInTheDocument();
    expect(newTermRequestContainer).toBeInTheDocument();

    expect(contentFetchErrorContainer).not.toBeInTheDocument();
  });
});

describe("Glossary page - Error fetching data", () => {
  it("It renders the glossary page with error message saying something went wrong", () => {
    const terms = [];

    render(<AllTerms terms={terms} />);

    const glossaryHeading = screen.getByTitle("glossary-list-heading");
    const glossaryContainer = screen.queryByTitle("glossary-term-list");
    const scrollToTopButton = screen.queryByTitle(
      "glossary-scroll-to-top-button"
    );
    const contentFetchErrorContainer = screen.getByTitle(
      "glossary-data-fetch-error"
    );
    const newTermRequestContainer = screen.queryByTitle(
      "glossary-new-term-request"
    );

    expect(glossaryHeading).toBeInTheDocument();
    expect(glossaryContainer).toBeInTheDocument();

    expect(scrollToTopButton).not.toBeInTheDocument();
    expect(newTermRequestContainer).not.toBeInTheDocument();
    expect(contentFetchErrorContainer).toBeInTheDocument();
  });
});
