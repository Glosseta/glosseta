import React from "react";
import { render, screen } from "@testing-library/react";
import EnsSearchError from "../../../../src/pages/enspect/details/ens-search-error";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
  pathname: jest.fn(),
}));

describe("ENS search error suite", () => {
  it("It renders the ENS search error page", () => {
    const ensName = "abc.eth";
    const url = "https://twitter.com/intent/tweet?screen_name=Glossetadotcom";
    const errorText = "ensFetchErrorText";
    const a11yText = "opensInANewWindow";

    render(
      <EnsSearchError
        ensName={ensName}
      />
    );

    const linkElement = screen.getByTitle("ens-search-error-twitter-link");
    const a11yTextElement = screen.getByText(a11yText);
    const errorTextElement = screen.getByText(errorText);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", url);
    
    expect(errorTextElement).toBeInTheDocument();
    expect(a11yTextElement).toBeInTheDocument();
  });
});
