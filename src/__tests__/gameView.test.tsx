import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { _GameView } from "../components/card-game";

describe("Return Render GameView Component", () => {
  const defaultProps = {
    data: {
      btnStart: true,
      option: "red",
      colors: ["red", "blue", "green"],
      handleVerifyColor: jest.fn(),
      handleStartGame: jest.fn(),
    },
  };

  test("should render GameView component", () => {
    render(<_GameView {...defaultProps} />);
    const gameViewContainer = screen.getByTestId("game-view-container");
    expect(gameViewContainer).toBeInTheDocument();
  });
});
