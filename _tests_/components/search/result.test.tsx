import { render, screen } from "@testing-library/react";
import Result from "../../../src/components/search/result";

describe("Result Component", () => {
  const mockProps = {
    transactionId: "123",
    definition: "Test definition",
    category: "Test category",
    term: "Test term"
  };

  it("renders the result component with all props", () => {
    render(<Result {...mockProps} />);
    
    const container = screen.getByTitle("search-result-content");
    expect(container).toBeInTheDocument();
    expect(screen.getByText("Test term")).toBeInTheDocument();
    expect(screen.getByText("Test definition")).toBeInTheDocument();
    expect(screen.getByText("Test category")).toBeInTheDocument();
  });

  it("renders with missing props", () => {
    render(<Result term="Test term" />);
    
    const container = screen.getByTitle("search-result-content");
    expect(container).toBeInTheDocument();
    expect(screen.getByText("Test term")).toBeInTheDocument();
  });
}); 