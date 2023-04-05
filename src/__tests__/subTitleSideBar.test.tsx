import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { _SubTitleSideBarView } from "../components/sidebar";

describe("_SubTitleSideBarView", () => {
  it("Return Render _SubTitleSideBarView", () => {
    render(<_SubTitleSideBarView />);
    const guessedColor = screen.getByText("Guessed Color");
    const correctColor = screen.getByText("Correct Color");
    const score = screen.getByText("Score");

    expect(guessedColor).toBeInTheDocument();
    expect(correctColor).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  });

  it("Return Render _SubTitleSideBarView and verify if sub-title-sideba exist ", () => {
    render(<_SubTitleSideBarView />);
    const div = screen.getByTestId("sub-title-sidebar");

    expect(div).toHaveClass("sub-title-sidebar");
  });
});
