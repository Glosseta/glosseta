import React from "react";
import { render, screen } from "@testing-library/react";
import LinkComponent from "../../../../src/pages/enspect/details/link-component";
import { FaTwitter } from "react-icons/fa";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
  pathname: jest.fn(),
}));

describe("Link component suite", () => {
  it("It renders the component when identifier present", () => {
    const identifier = "twitter";
    const url = "https://www.twitter.com/glossetadotcom";
    const a11yText = "text";
    const iconTitle = "test-icon";
    const icon = <FaTwitter title={iconTitle} />;

    render(
      <LinkComponent
        title="twitter"
        identifier={identifier}
        url={url}
        a11yText={a11yText}
        icon={icon}
      />
    );

    const linkElement = screen.getByRole("link");
    const iconElement = screen.getByTitle(iconTitle);
    const a11yTextElement = screen.getByText(a11yText);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", url);

    expect(iconElement).toBeInTheDocument();
    expect(a11yTextElement).toBeInTheDocument();
  });

  it("It doesn't render the component when identifier is missing", () => {
    const identifier = null;
    const url = "https://www.twitter.com/glossetadotcom";
    const a11yText = "text";
    const iconTitle = "test-icon";
    const icon = <FaTwitter title={iconTitle} />;

    render(
      <LinkComponent
        title="twitter"
        identifier={identifier}
        url={url}
        a11yText={a11yText}
        icon={icon}
      />
    );

    const linkElement = screen.queryByRole("link");
    const iconElement = screen.queryByTitle(iconTitle);
    const a11yTextElement = screen.queryByText(a11yText);

    expect(linkElement).not.toBeInTheDocument();

    expect(iconElement).not.toBeInTheDocument();
    expect(a11yTextElement).not.toBeInTheDocument();
  });

  it("It doesn't render the component when identifier is equal to NOT_SET", () => {
    const identifier = "NOT_SET";
    const url = "https://www.twitter.com/glossetadotcom";
    const a11yText = "text";
    const iconTitle = "test-icon";
    const icon = <FaTwitter title={iconTitle} />;

    render(
      <LinkComponent
        title="twitter"
        identifier={identifier}
        url={url}
        a11yText={a11yText}
        icon={icon}
      />
    );

    const linkElement = screen.queryByRole("link");
    const iconElement = screen.queryByTitle(iconTitle);
    const a11yTextElement = screen.queryByText(a11yText);

    expect(linkElement).not.toBeInTheDocument();

    expect(iconElement).not.toBeInTheDocument();
    expect(a11yTextElement).not.toBeInTheDocument();
  });
});
