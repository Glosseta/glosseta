import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../../src/pages/components/footer/footer";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("Footer", () => {
  it("It renders the links", () => {
    render(<Footer />);

    const github = screen.getByTitle("github");
    const arweave = screen.getByTitle("arweave");
    const twitter = screen.getByTitle("twitter");

    expect(github).toBeInTheDocument();
    expect(arweave).toBeInTheDocument();
    expect(twitter).toBeInTheDocument();
  });
});
