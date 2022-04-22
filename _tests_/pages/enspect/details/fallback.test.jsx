import React from "react";
import { render, screen } from "@testing-library/react";
import FallBack from "../../../../src/components/details/fallback";

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

describe("ENS search fallback suite", () => {
  it("It renders the fallback page", () => {

    render(<FallBack />);

    const container = screen.getByTitle("glosseta-enspect-search-fallback-page");

    expect(container).toBeInTheDocument();
  });
});
