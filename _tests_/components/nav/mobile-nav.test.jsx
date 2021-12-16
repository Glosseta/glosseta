import React from "react";
import { render, screen } from "@testing-library/react";
import MobileNav from "../../../src/pages/components/nav/mobile-nav";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));


describe("Mobile nav - closed", () => {
    it("It renders the open button when on the glossary page", () => {
      render(<MobileNav isHomePage={false} isGlossaryPage={true} isSearchPage={false}/>);
  
      const mobileNavOpenButton = screen.getByTitle('mobile-nav-open-button');
  
      expect(mobileNavOpenButton).toBeInTheDocument();
    });
  
    it("It renders the open button when on the home page", () => {
      render(<MobileNav isHomePage={true} isGlossaryPage={false} isSearchPage={false}/>);
  
      const mobileNavOpenButton = screen.getByTitle('mobile-nav-open-button');  
  
      expect(mobileNavOpenButton).toBeInTheDocument();
    });
  
    it("It renders the open button when on the search page", () => {
      render(<MobileNav isHomePage={false} isGlossaryPage={false} isSearchPage={true}/>);
  
      const mobileNavOpenButton = screen.getByTitle('mobile-nav-open-button');
  
      expect(mobileNavOpenButton).toBeInTheDocument();
    });
  });


describe("Mobile nav - opened", () => {
  it("It renders the Search button when on the glossary page", () => {
    render(<MobileNav isHomePage={false} isGlossaryPage={true} isSearchPage={false}/>);

    const mobileNavOpenButton = screen.getByTitle('mobile-nav-open-button');

    // Open the nav menu
    mobileNavOpenButton.click();

    const searchButton = screen.getByTitle('nav-search-button');
    const glossaryButton = screen.queryByTitle('nav-glossary-button');
    const closeButton = screen.getByTitle('mobile-nav-close-button');

    expect(searchButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(glossaryButton).not.toBeInTheDocument();
  });

  it("It renders the Glossary button when on the home page", () => {
    render(<MobileNav isHomePage={true} isGlossaryPage={false} isSearchPage={false}/>);

    const mobileNavOpenButton = screen.getByTitle('mobile-nav-open-button');

    // Open the nav menu
    mobileNavOpenButton.click();

    const searchButton = screen.queryByTitle('nav-search-button');
    const glossaryButton = screen.getByTitle('nav-glossary-button');
    const closeButton = screen.getByTitle('mobile-nav-close-button');

    expect(searchButton).not.toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(glossaryButton).toBeInTheDocument();
  });

  it("It renders the Glossary button when on the search page", () => {
    render(<MobileNav isHomePage={false} isGlossaryPage={false} isSearchPage={true}/>);

    const mobileNavOpenButton = screen.getByTitle('mobile-nav-open-button');

    // Open the nav menu
    mobileNavOpenButton.click();

    const glossaryButton = screen.getByTitle('nav-glossary-button');
    const searchButton = screen.queryByTitle('nav-search-button');
    const closeButton = screen.getByTitle('mobile-nav-close-button');

    expect(searchButton).not.toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(glossaryButton).toBeInTheDocument();
  });
});
