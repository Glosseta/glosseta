import React from "react";
import { render, screen } from "@testing-library/react";
import NavItems from "../../../src/components/nav/nav-items";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("Right side Nav items", () => {
  it("It renders the Search button when on the glossary page", () => {
    render(<NavItems />);

    const searchButton = screen.getByTitle("nav-search-button");
    const searchButtonAllyText = screen.getByTitle(
      "nav-search-button-a11y-text"
    );
    const glossaryButton = screen.queryByTitle("nav-glossary-button");
    const chainLookupButton = screen.queryByTitle("nav-enspect-button");
    const blogButton = screen.queryByTitle("nav-blog-button");

    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveTextContent("search");
    expect(searchButtonAllyText).toHaveTextContent(
      "glossetaNavbarButtonA11yText"
    );
    expect(glossaryButton).toBeInTheDocument();
    expect(chainLookupButton).toBeInTheDocument();
    expect(blogButton).toBeInTheDocument();
  });
});