import React from "react";
import {render, screen} from "@testing-library/react";

import RequestTerm from "../../../src/pages/request-term";

jest.mock("next-i18next/serverSideTranslations");

describe("Renders RequestTerm page", () => {
  it("Renders Renders RequestTerm page Component with content", () => {
    render(<RequestTerm/>)
    const RequestATermTitle = screen.getByTitle("request-a-term")
    expect(RequestATermTitle).toBeInTheDocument()
  })
})
