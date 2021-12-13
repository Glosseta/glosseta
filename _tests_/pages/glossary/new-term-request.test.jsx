import React from "react";
import { render, screen } from "@testing-library/react";
import NewTermRequest from "../../../src/pages/glossary/new-term-request";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("New Term Request", () => {
  it("It renders the new term request text box expected content", () => {
    render(<NewTermRequest />);

    const newTermRequestContainer = screen.getByTitle("glossary-new-term-request");

    expect(newTermRequestContainer).toBeInTheDocument();
    expect(newTermRequestContainer).toHaveTextContent("twitterTermRequestDescription");
  });
});
