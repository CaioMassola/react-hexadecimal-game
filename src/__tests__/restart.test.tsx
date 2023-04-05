import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { _RestartView } from "../components/card-game";

describe("Return Render Restart Component", () => {
  const handleResetGame = jest.fn();

  const defaultProps = {
    data: {
      btnStart: true,
      handleResetGame,
    },
  };

  it("Render style button", () => {
    const { getByTestId } = render(<_RestartView {...defaultProps} />);
    const restartButton = getByTestId("restart");
    expect(restartButton).toBeInTheDocument();
    expect(restartButton).toHaveAttribute("aria-label", "Restart");
    expect(restartButton).toHaveAttribute("title", "Restart");
    expect(restartButton).not.toBeDisabled();
  });

  it("Button event click", () => {
    const { getByTestId } = render(<_RestartView {...defaultProps} />);
    const restartButton = getByTestId("restart");
    fireEvent.click(restartButton);
    expect(handleResetGame).toHaveBeenCalledTimes(1);
  });

  it("Verify if is disabled button", () => {
    const { getByTestId } = render(
      <_RestartView data={{ btnStart: false, handleResetGame }} />
    );
    const restartButton = getByTestId("restart");
    expect(restartButton).toBeDisabled();
  });
});
