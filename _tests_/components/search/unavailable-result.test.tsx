import { render, screen } from "@testing-library/react";
import UnavailableResult from "../../../src/components/search/unavailable-result";
import { useTranslation } from "next-i18next";

// Mock next-i18next
jest.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("UnavailableResult Component", () => {
  it("renders the unavailable result component", () => {
    const term = "nonexistent-term";
    render(<UnavailableResult term={term} />);
    
    const container = screen.getByTitle("unavailable-search-result");
    expect(container).toBeInTheDocument();
    expect(screen.getByText(term)).toBeInTheDocument();
    expect(screen.getByText("twitter")).toBeInTheDocument();
    expect(screen.getByText("gitHubIssueText")).toBeInTheDocument();
  });

  it("generates correct twitter link", () => {
    const term = "test-term";
    render(<UnavailableResult term={term} />);
    
    const twitterLink = screen.getByText("twitter").closest("a");
    expect(twitterLink).toHaveAttribute(
      "href",
      expect.stringContaining("Glossetadotcom")
    );
    expect(twitterLink).toHaveAttribute(
      "href",
      expect.stringContaining(term)
    );
  });
}); 