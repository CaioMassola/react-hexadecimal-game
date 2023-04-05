import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { _StartGame } from "../components/card-game";

describe("Return Render StartGame Component", () => {
  it("Render no errors", () => {
    const { getByTestId } = render(<_StartGame handleStartGame={() => {}} />);
    const startBtn = getByTestId("start");
    expect(startBtn).toBeInTheDocument();
    expect(startBtn).toHaveTextContent("START");
  });

  it("Event button start", () => {
    const mockHandleStartGame = jest.fn();
    const { getByTestId } = render(
      <_StartGame handleStartGame={mockHandleStartGame} />
    );
    const startBtn = getByTestId("start");
    fireEvent.click(startBtn);
    expect(mockHandleStartGame).toHaveBeenCalled();
  });
});
