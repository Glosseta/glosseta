import React from "react";
import {render, screen} from "@testing-library/react";

import RequestDefinitions from "../../../src/pages/request-term";
// mock serverSideTranslations

jest.mock("next-i18next/serverSideTranslations");

// build unit tests beyond here:
describe("Renders RequestDefinitions page", () => {
  it("Renders Renders RequestDefinitions page Component with content", () => {
    render(<RequestDefinitions/>)
    const RequestDefinitionsTitle = screen.getByTitle("request-a-term")
    expect(RequestDefinitionsTitle).toBeInTheDocument()
  })
})
