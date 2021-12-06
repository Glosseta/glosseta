import React from "react";
import { render, screen } from "@testing-library/react";
import NavItems from "../../../src/pages/components/nav/nav-items";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("Right side Nav items", () => {
  it("It renders the Search button when on the glossary page", () => {
    render(<NavItems isHomePage={false} isGlossaryPage={true} isSearchPage={false}/>);

    const searchButton = screen.getByTitle('nav-search-button');
    const searchButtonAllyText = screen.getByTitle('nav-search-button-a11y-text')
    const glossaryButton = screen.queryByTitle('nav-glossary-button')

    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveTextContent('search');
    expect(searchButtonAllyText).toHaveTextContent('glossetaNavbarButtonA11yText');
    expect(glossaryButton).not.toBeInTheDocument();
  });

  it("It renders the Glossary button when on the home page", () => {
    render(<NavItems isHomePage={true} isGlossaryPage={false} isSearchPage={false}/>);

    const searchButton = screen.queryByTitle('nav-search-button');
    const glossaryButton = screen.getByTitle('nav-glossary-button')

    expect(searchButton).not.toBeInTheDocument();
    expect(glossaryButton).toBeInTheDocument();
    expect(glossaryButton).toHaveTextContent('glossary');
  });

  it("It renders the Glossary button when on the search page", () => {
    render(<NavItems isHomePage={false} isGlossaryPage={false} isSearchPage={true}/>);

    const glossaryButton = screen.getByTitle('nav-glossary-button');
    const searchButton = screen.queryByTitle('nav-search-button')

    expect(searchButton).not.toBeInTheDocument();
    expect(glossaryButton).toBeInTheDocument();
    expect(glossaryButton).toHaveTextContent('glossary');
  });
});
