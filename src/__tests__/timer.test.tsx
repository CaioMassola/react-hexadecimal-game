import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { _TimerView } from "../components/card-game";

test("Return Render Timer Component", () => {
  const timer = 20;
  const timerStart = true;
  render(<_TimerView data={{ timer, timerStart }} />);
  const timerValueElement = screen.getByText(/REMANING TIME/i);
  expect(timerValueElement).toBeInTheDocument();
});
