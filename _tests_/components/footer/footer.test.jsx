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
    const githubIcon = screen.getByTitle("footer-github-icon");
    const copyright = screen.getByTitle("copyright-text");

    const tiktok = screen.getByTitle("tiktok");
    const tiktokA11yText = screen.getByTitle("footer-tiktok-a11y-text");
    const tiktokIcon = screen.getByTitle("footer-tiktok-icon");

    const instagram = screen.getByTitle("instagram");
    const instagramA11yText = screen.getByTitle("footer-instagram-a11y-text");
    const instagramIcon = screen.getByTitle("footer-instagram-icon");

    const twitter = screen.getByTitle("twitter");
    const twitterA11yText = screen.getByTitle("footer-twitter-a11y-text");
    const twitterIcon = screen.getByTitle("footer-twitter-icon");

    expect(github).toBeInTheDocument();
    expect(githubA11yText).toHaveTextContent("footerGitHubA11yText");
    expect(githubIcon).toBeInTheDocument();

    expect(tiktok).toBeInTheDocument();
    expect(tiktokA11yText).toHaveTextContent("footerTiktokA11yText");
    expect(tiktokIcon).toBeInTheDocument();

    expect(instagram).toBeInTheDocument();
    expect(instagramA11yText).toHaveTextContent("footerInstagramA11yText");
    expect(instagramIcon).toBeInTheDocument();

    expect(twitter).toBeInTheDocument();
    expect(twitterA11yText).toHaveTextContent("footerTwitterA11yText");
    expect(twitterIcon).toBeInTheDocument();

    expect(copyright).toBeInTheDocument();
    expect(copyright).toHaveTextContent("copyright");
  });
});
