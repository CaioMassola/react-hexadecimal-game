import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { _ProgressBarView } from "../components/card-game";

test("Return Render ProgressBar Component", () => {
  const progressBar = 10;
  render(<_ProgressBarView progressBar={progressBar} />);
  const progressBarElement = screen.getByTestId("progressbar");
  expect(progressBarElement).toHaveAttribute("value", "10");
});
