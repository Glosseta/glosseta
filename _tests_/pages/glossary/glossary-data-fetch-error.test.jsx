import React from "react";
import { render, screen } from "@testing-library/react";
import GlossaryDataFetchError from "../../../src/pages/glossary/glossary-data-fetch-error";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("Data fetch error", () => {
  it("It renders the data fetch error content", () => {
    render(<GlossaryDataFetchError />);

    const glossaryDataFetchErrorContainer = screen.getByTitle("glossary-data-fetch-error");

    expect(glossaryDataFetchErrorContainer).toBeInTheDocument();
    expect(glossaryDataFetchErrorContainer).toHaveTextContent("glossaryTermFetchErrorHeading");
    expect(glossaryDataFetchErrorContainer).toHaveTextContent("glossaryTermFetchErrorText");
  });
});
