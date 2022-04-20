import React from "react";
import { render, screen } from "@testing-library/react";
import DataComponent from "../../../../src/components/details/data-component";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
  pathname: jest.fn(),
}));

describe("Data component suite", () => {
  it("It renders the component when data present", () => {
    const data = "data";
    const label = "label";
    render(<DataComponent label={label} data={data} />);

    const labelElement = screen.getByText(label);
    const dataElement = screen.getByText(data);

    expect(labelElement).toBeInTheDocument();
    expect(dataElement).toBeInTheDocument();
  });

  it("It doesn't render the component when data is missing", () => {
    const data = null;
    const label = "label";
    render(<DataComponent label={label} data={data} />);

    const container = screen.queryByTitle(label);

    expect(container).not.toBeInTheDocument();
  });

  it("It doesn't render the component when data is NOT_SET", () => {
    const data = "NOT_SET";
    const label = "label";
    render(<DataComponent label={label} data={data} />);

    const container = screen.queryByTitle(label);
    
    expect(container).not.toBeInTheDocument();
  });
});
