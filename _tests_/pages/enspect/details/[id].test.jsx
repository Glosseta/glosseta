import React from "react";
import { render, screen } from "@testing-library/react";
import LookUpResult from "../../../../src/pages/enspect/details/[id]";
import { getStaticProps } from "../../../../src/pages/enspect/details/[id]";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
  pathname: jest.fn(),
}));

describe("ENSpect profile details page", () => {
  it("It renders the id profile page with content", () => {
    const ensName = "abc.eth";
    const accountAddress = "0x12345";
    const name = "name";
    const description = "about";
    const twitter = "twitter_handle";
    const github = "github_handle";
    const linkedin = "linkedin_handle";
    const website = "web.site";
    const qrcode = "abc123";
    render(
      <LookUpResult
        ensName={ensName}
        accountAddress={accountAddress}
        name={name}
        description={description}
        twitter={twitter}
        github={github}
        linkedin={linkedin}
        website={website}
        qrcode={qrcode}
        isError={false}
      />
    );

    const container = screen.getByTitle("enspect-details-content");
    const ensSearchBar = screen.getByTitle("enspect-search-bar");

    expect(container).toBeInTheDocument();
    expect(ensSearchBar).toBeInTheDocument();
  });
});

describe("ENSpect profile details page - Error", () => {
  it("Loads the ens-search-error page when the isError flag is truthy", () => {
    render(<LookUpResult isError={true} />);

    const errorTextElement = screen.getByText("ensFetchErrorText");

    expect(errorTextElement).toBeInTheDocument();
  });
});
