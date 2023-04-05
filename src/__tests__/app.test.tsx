import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

test("Return Render App", () => {
  const { getByTestId } = render(<App />);
  const appComponent = getByTestId("app");
  expect(appComponent).toBeInTheDocument();
});
