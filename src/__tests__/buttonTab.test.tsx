import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { _ButtonsTabView } from "../components/sidebar";

describe("_ButtonsTabView", () => {
  test("Return Type Button History", () => {
    const handleHistory = jest.fn();
    const isCurrentGame = "current";
    const { getByLabelText } = render(
      <_ButtonsTabView data={{ handleHistory, isCurrentGame }} />
    );
    const currentGameButton = getByLabelText("Current Game");
    const lastestGameButton = getByLabelText("Lastest Game");

    expect(currentGameButton).toHaveClass("button-selected");
    expect(lastestGameButton).toHaveClass("button-not-selected");
  });

  test("verify a function of button", () => {
    const handleHistory = jest.fn();
    const isCurrentGame = "current";
    const { getByLabelText } = render(
      <_ButtonsTabView data={{ handleHistory, isCurrentGame }} />
    );
    const lastestGameButton = getByLabelText("Lastest Game");

    fireEvent.click(lastestGameButton);

    expect(handleHistory).toHaveBeenCalledWith("lastest");
  });
});
