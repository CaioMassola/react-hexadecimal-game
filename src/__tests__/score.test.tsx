import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { _ScoreView } from "../components/card-game";

test("Return Render Score Component", () => {
  const mockData = {
    score: 10,
    highScore: 20,
  };
  render(<_ScoreView data={mockData} />);

  const scoreElement = screen.getByText(/SCORE = 10/i);
  expect(scoreElement).toBeInTheDocument();

  const highScoreElement = screen.getByText(/HIGH SCORE = 20/i);
  expect(highScoreElement).toBeInTheDocument();
});
