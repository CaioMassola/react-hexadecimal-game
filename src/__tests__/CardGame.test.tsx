import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardGame from "../components/card-game";

test("Return Render CardGame", () => {
  const { getByTestId } = render(<CardGame updateSideBar={() => []} />);
  const appComponent = getByTestId("app-card-game");
  expect(appComponent).toBeInTheDocument();
  expect(appComponent).toHaveClass('card');
});





