import React from "react";
import { render, screen } from "@testing-library/react";
import ENSpect from "../../../src/pages/enspect/index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
  pathname: jest.fn(),
}));

describe("ENSpect Landing Page", () => {
  it("It renders the ENSpect page with content", () => {
    render(<ENSpect />);

    const enspectContainer = screen.getByTitle("glosseta-enspect-page");
    const enspectHeading = screen.getByText("ENSSearchLandingPageHeading");
    const enspectDescription = screen.getByText("ENSSearchLandingPageDescription");
    const whatIsENSLink = screen.getByText("whatIsEnsLink");

    expect(enspectContainer).toBeInTheDocument();

    expect(whatIsENSLink).toHaveAttribute("href", "/search?term=ens");

    expect(enspectHeading).toBeInTheDocument();

    expect(enspectDescription).toBeInTheDocument();
  });
});
