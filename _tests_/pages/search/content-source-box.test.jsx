import React from "react";
import { render, screen } from "@testing-library/react";
import ContentSourceBox from "../../../src/components/search/content-source-box";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("Content source box", () => {
  it("It renders the content box with expected content", () => {
    const transactionId = "12345";

    render(<ContentSourceBox transactionId={transactionId} />);

    const contentSourceHeading = screen.getByText(
      "searchResultContentSourceHeading"
    );
    const contentSourceDescription = screen.getByText(
      "searchResultContentSourceDescription"
    );
    const contentSourceViewBlockUrl = screen.getByText(
      "searchResultContentSourceTransactionLinkText"
    );
    const contentSourceA11yText = screen.getByText("opensInANewWindow");

    // No need to test the text content as it's implicitly tested while trying to find the element above
    expect(contentSourceHeading).toBeInTheDocument();
    expect(contentSourceDescription).toBeInTheDocument();
    expect(contentSourceViewBlockUrl).toBeInTheDocument();
    expect(contentSourceA11yText).toBeInTheDocument();
  });
});
