import { render, screen } from "@testing-library/react";
import SearchPage from "../../../src/pages/search";

// Mock matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
    };
  },
}));

describe("Search Page", () => {
  it("renders the search page", () => {
    render(<SearchPage />);
    
    // Test for main components that should be present
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByTitle("glosseta-search-fallback-page")).toBeInTheDocument();
  });

  it("displays loading skeleton", () => {
    render(<SearchPage />);
    
    // Test for skeleton loading elements using class name
    const skeletons = document.getElementsByClassName("chakra-skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });
}); 