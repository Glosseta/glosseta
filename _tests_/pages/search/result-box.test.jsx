import React from "react";
import { render, screen } from "@testing-library/react";
import ResultBox from "../../../src/components/search/result-box";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("Result box", () => {
  it("It renders the result box with expected content", () => {
    const term = "bitcoin";
    const category = "protocol";
    const definition = "a definition goes here";

    render(
      <ResultBox definition={definition} category={category} term={term} />
    );

    const resultBoxTermHeading = screen.getByText(term);
    const resultBoxTag = screen.getByText(category);
    const resultBoxDefinition = screen.getByText(definition);

    // No need to test the text content as it's implicitly tested while trying to find the element above
    expect(resultBoxTermHeading).toBeInTheDocument();
    expect(resultBoxTag).toBeInTheDocument();
    expect(resultBoxDefinition).toBeInTheDocument();
  });
});
