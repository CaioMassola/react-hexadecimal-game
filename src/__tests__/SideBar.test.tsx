import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "../components/sidebar";

test("Return Render SideBar", () => {
  const { getByTestId } = render(<Sidebar state={[]} />);
  const appComponent = getByTestId("app-sidebar");
  expect(appComponent).toBeInTheDocument();
  expect(appComponent).toHaveClass("sidebar")
});
