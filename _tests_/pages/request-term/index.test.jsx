import React from "react";
import {render, screen} from "@testing-library/react";

import RequestTerm from "../../../src/pages/request-term";

jest.mock("next-i18next/serverSideTranslations");

describe("Renders RequestTerm page", () => {
  it("Renders Renders RequestTerm page Component with content", () => {
    render(<RequestTerm/>)
    const requestTermTitle = screen.getByTitle("request-a-term")
    const requestTermDescription = screen.getByTitle("request-a-term-description")
    const termLabel = screen.getByTestId("term-label")
    const termInput = screen.getByTestId("term-input")
    const termCategoryLabel = screen.getByTestId("category-label")
    const termCategorySelect = screen.getByTestId("term-category-select")
    const termReasonLabel = screen.getByTestId("reason-label")
    const termReasonInput = screen.getByTestId("term-reason")
    const submitButton = screen.getByTestId("submit-button")
    
    expect(requestTermTitle).toBeInTheDocument()
    expect(requestTermDescription).toBeInTheDocument()
    expect(termLabel).toBeInTheDocument()
    expect(termInput).toBeInTheDocument()
    expect(termCategoryLabel).toBeInTheDocument()
    expect(termCategorySelect).toBeInTheDocument()
    expect(termCategoryLabel).toBeInTheDocument()
    expect(termReasonLabel).toBeInTheDocument()
    expect(termReasonInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
})
