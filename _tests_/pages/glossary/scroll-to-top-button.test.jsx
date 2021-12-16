import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ScrollToTopButton from "../../../src/pages/glossary/scroll-to-top-button";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("Scroll to top button", () => {
  it("It renders the button with no specified anchor", () => {
    render(<ScrollToTopButton />);

    const scrollToTopButton = screen.getByTitle(
      "glossary-scroll-to-top-button"
    );
    const accessibilityText = screen.getByText("scrollToTheTopButton");

    expect(scrollToTopButton).toBeInTheDocument();
    expect(accessibilityText).toBeInTheDocument();
  });

  it("It renders the button with a specified anchor", () => {
    const anchor = "anchor";
    const docSpy = jest.spyOn(document, "getElementById");

    docSpy.mockImplementation(() => ({
      focus: jest.fn(),
    }));

    render(<ScrollToTopButton anchorIdToFocus={anchor} />);

    const scrollToTopButton = screen.getByTitle(
      "glossary-scroll-to-top-button"
    );
    const accessibilityText = screen.getByText("scrollToTheTopButton");

    fireEvent.click(scrollToTopButton);

    expect(scrollToTopButton).toBeInTheDocument();
    expect(docSpy).toBeCalledTimes(1);
    expect(docSpy).toBeCalledWith(anchor);
    expect(accessibilityText).toBeInTheDocument();
  });
});
