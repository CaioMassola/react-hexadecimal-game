import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { _ClearData } from "../components/card-game";

describe("Return Render ClearData Component", () => {
  test("Verify event button click", () => {
    const mockHandleClearData = jest.fn();
    const { getByRole } = render(
      <_ClearData handleClearData={mockHandleClearData} />
    );
    const clearButton = getByRole("button");
    fireEvent.click(clearButton);
    expect(mockHandleClearData).toHaveBeenCalled();
  });
});
