import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../../src/components/footer/footer";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("Footer", () => {
  it("It renders the links", () => {
    render(<Footer />);

    const github = screen.getByTitle("github");
    const githubA11yText = screen.getByTitle("footer-github-a11y-text");
    const githubIcon = screen.getByTitle('footer-github-icon');
    const copyright = screen.getByTitle('copyright-text');

    const arweave = screen.getByTitle("arweave");
    const arweaveA11yText = screen.getByTitle("footer-arweave-a11y-text");
    const arweaveIcon = screen.getByTitle('footer-arweave-icon');

    const twitter = screen.getByTitle("twitter");
    const twitterA11yText = screen.getByTitle("footer-twitter-a11y-text");
    const twitterIcon = screen.getByTitle('footer-twitter-icon');

    expect(github).toBeInTheDocument();
    expect(githubA11yText).toHaveTextContent('footerGitHubA11yText');
    expect(githubIcon).toBeInTheDocument();

    expect(arweave).toBeInTheDocument();
    expect(arweaveA11yText).toHaveTextContent('footerArweaveA11yText');
    expect(arweaveIcon).toBeInTheDocument();

    expect(twitter).toBeInTheDocument();
    expect(twitterA11yText).toHaveTextContent('footerTwitterA11yText');
    expect(twitterIcon).toBeInTheDocument();

    expect(copyright).toBeInTheDocument();
    expect(copyright).toHaveTextContent('copyright');
  });
});
