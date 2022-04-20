import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "../../../src/components/nav/index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
  pathname: jest.fn(),
}));

describe("Nav", () => {
  it("It renders the Navigation bar", () => {
    render(<Nav />);

    const nav = screen.getByTitle("glosseta-nav");
    const glossetaIcon = screen.getByTitle("nav-glosseta-icon");
    const homeButton = screen.queryByTitle("nav-glosseta-home-button");

    expect(nav).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
    expect(homeButton).toHaveTextContent("glossetaTitle");
    expect(glossetaIcon).toBeInTheDocument();
  });
});
