import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfileCard from "../../../../src/pages/enspect/details/profile-card";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
  pathname: jest.fn(),
}));

//2. test different permutations of partial data load

describe("ENS search result component suite", () => {
  it("It renders the ENS full profile", () => {
    const ensName = "abc.eth";
    const accountAddress = "0x12345";
    const etherscanHref = `https://etherscan.io/address/${accountAddress}`;
    const openseaHref = `https://opensea.io/${accountAddress}`;
    const name = "name";
    const description = "about";
    const twitter = "a_handle";
    const twitterHref = `https://twitter.com/${twitter}`;
    const github = "github_handle";
    const githubHref = `https://github.com/${github}`;
    const linkedin = "linkedin_handle";
    const linkedinHref = `https://www.linkedin.com/in/${linkedin}`;
    const website = "glosseta.com";
    const websiteHref = `http://${website}`;
    const qrcode = "abc123";

    render(
      <ProfileCard
        accountAddress={accountAddress}
        ensName={ensName}
        name={name}
        description={description}
        twitter={twitter}
        github={github}
        linkedin={linkedin}
        website={website}
        qrcode={qrcode}
      />
    );

    const container = screen.getByTitle("ens-result-search-result-container");
    const mainHeading = screen.getByRole("heading");
    const avatar = screen.getByTitle("ens-profile-avatar");
    const twitterLink = screen.getByTitle("twitter");
    const githubLink = screen.getByTitle("github");
    const linkedinLink = screen.getByTitle("linkedin");
    const websiteLink = screen.getByTitle("website");
    const etherscanLink = screen.getByTitle("etherscan");
    const openseaLink = screen.getByTitle("opensea");
    const nameData = screen.getByText(name);
    const aboutData = screen.getByText(description);
    const ethereumAddress = screen.getByText(accountAddress);
    const copyAddressButton = screen.getByTitle("copy-ethereum-address-button");
    const qrCodeImage = screen.getByTitle("qrcode-ethereum-address");

    expect(container).toBeInTheDocument();

    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent(ensName);

    expect(avatar).toBeInTheDocument();

    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute("href", twitterHref);

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", githubHref);

    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute("href", linkedinHref);

    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink).toHaveAttribute("href", websiteHref);

    expect(etherscanLink).toBeInTheDocument();
    expect(etherscanLink).toHaveAttribute("href", etherscanHref);

    expect(openseaLink).toBeInTheDocument();
    expect(openseaLink).toHaveAttribute("href", openseaHref);

    expect(nameData).toBeInTheDocument();
    expect(aboutData).toBeInTheDocument();

    expect(ethereumAddress).toBeInTheDocument();
    expect(copyAddressButton).toBeInTheDocument();
    expect(qrCodeImage).toBeInTheDocument();
  });

  it("Copies the ethereum address from the profile", () => {
    const ensName = "abc.eth";
    const accountAddress = "0x12345";
    const qrcode = "abc123";
    const NOT_SET = "NOT_SET";

    Object.assign(navigator, {
      clipboard: {
        writeText: () => {
          return accountAddress;
        },
      },
    });

    jest.spyOn(navigator.clipboard, "writeText");

    render(
      <ProfileCard
        accountAddress={accountAddress}
        ensName={ensName}
        name={NOT_SET}
        description={NOT_SET}
        twitter={NOT_SET}
        github={NOT_SET}
        linkedin={NOT_SET}
        website={NOT_SET}
        qrcode={qrcode}
      />
    );

    const copyAddressButton = screen.getByTitle("copy-ethereum-address-button");
    fireEvent.click(copyAddressButton);

    expect(copyAddressButton).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(accountAddress);
  });

  it("loads the profile page when ethereum address not set", () => {
    const ensName = "abc.eth";
    const ensHref = `https://app.ens.domains/search/${ensName}`;
    const NOT_SET = "NOT_SET";

    render(
      <ProfileCard
        accountAddress={NOT_SET}
        ensName={ensName}
        name={NOT_SET}
        description={NOT_SET}
        twitter={NOT_SET}
        github={NOT_SET}
        linkedin={NOT_SET}
        website={NOT_SET}
        qrcode={NOT_SET}
      />
    );

    const container = screen.getByTitle("ens-result-search-result-container");
    const mainHeading = screen.getByRole("heading");
    const avatar = screen.getByTitle("ens-profile-avatar");
    const twitterLink = screen.queryByTitle("twitter");
    const githubLink = screen.queryByTitle("github");
    const linkedinLink = screen.queryByTitle("linkedin");
    const websiteLink = screen.queryByTitle("website");
    const etherscanLink = screen.queryByTitle("etherscan");
    const openseaLink = screen.queryByTitle("opensea");
    const nameData = screen.queryByTitle("ensNameLabel");
    const aboutData = screen.queryByTitle("ensAboutLabel");
    const ethereumAddress = screen.queryByTitle("ethereumWalletAddress");
    const copyAddressButton = screen.queryByTitle(
      "copy-ethereum-address-button"
    );
    const qrCodeImage = screen.queryByTitle("qrcode-ethereum-address");
    const ensNotSetMessaging = screen.getByText("ensNameAvailableText");
    const ensLink = screen.getByRole("link");

    expect(container).toBeInTheDocument();

    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent(ensName);

    expect(avatar).toBeInTheDocument();

    expect(ensNotSetMessaging).toBeInTheDocument();
    expect(ensLink).toBeInTheDocument();
    expect(ensLink).toHaveAttribute("href", ensHref);

    expect(twitterLink).not.toBeInTheDocument();
    expect(githubLink).not.toBeInTheDocument();

    expect(linkedinLink).not.toBeInTheDocument();

    expect(websiteLink).not.toBeInTheDocument();

    expect(etherscanLink).not.toBeInTheDocument();

    expect(openseaLink).not.toBeInTheDocument();

    expect(nameData).not.toBeInTheDocument();
    expect(aboutData).not.toBeInTheDocument();

    expect(ethereumAddress).not.toBeInTheDocument();
    expect(copyAddressButton).not.toBeInTheDocument();
    expect(qrCodeImage).not.toBeInTheDocument();
  });

  it("loads the profile card with partial profile metadata - github, twitter", () => {
    const ensName = "abc.eth";
    const accountAddress = "0x12345";
    const etherscanHref = `https://etherscan.io/address/${accountAddress}`;
    const openseaHref = `https://opensea.io/${accountAddress}`;
    const name = "NOT_SET";
    const description = "NOT_SET";
    const twitter = "twitter_handle";
    const twitterHref = `https://twitter.com/${twitter}`;
    const github = "github_handle";
    const githubHref = `https://github.com/${github}`;
    const linkedin = "NOT_SET";
    const website = "NOT_SET";
    const qrcode = "abc123";

    render(
      <ProfileCard
        accountAddress={accountAddress}
        ensName={ensName}
        name={name}
        description={description}
        twitter={twitter}
        github={github}
        linkedin={linkedin}
        website={website}
        qrcode={qrcode}
      />
    );

    const container = screen.getByTitle("ens-result-search-result-container");
    const mainHeading = screen.getByRole("heading");
    const avatar = screen.getByTitle("ens-profile-avatar");
    const twitterLink = screen.getByTitle("twitter");
    const githubLink = screen.getByTitle("github");
    const linkedinLink = screen.queryByTitle("linkedin");
    const websiteLink = screen.queryByTitle("website");
    const etherscanLink = screen.getByTitle("etherscan");
    const openseaLink = screen.getByTitle("opensea");
    const nameData = screen.queryByTitle("ensNameLabel");
    const aboutData = screen.queryByTitle("ensAboutLabel");
    const ethereumAddress = screen.getByTitle("ethereumWalletAddress");
    const copyAddressButton = screen.getByTitle(
      "copy-ethereum-address-button"
    );
    const qrCodeImage = screen.getByTitle("qrcode-ethereum-address");

    expect(container).toBeInTheDocument();

    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent(ensName);

    expect(avatar).toBeInTheDocument();

    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute("href", twitterHref);

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", githubHref);

    expect(linkedinLink).not.toBeInTheDocument();

    expect(websiteLink).not.toBeInTheDocument();

    expect(etherscanLink).toBeInTheDocument();
    expect(etherscanLink).toHaveAttribute("href", etherscanHref);

    expect(openseaLink).toBeInTheDocument();
    expect(openseaLink).toHaveAttribute("href", openseaHref);

    expect(nameData).not.toBeInTheDocument();
    expect(aboutData).not.toBeInTheDocument();

    expect(ethereumAddress).toBeInTheDocument();
    expect(copyAddressButton).toBeInTheDocument();
    expect(qrCodeImage).toBeInTheDocument();
  });
});
