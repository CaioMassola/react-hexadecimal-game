import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { _NoHistory, _HistoryDataView } from "../components/sidebar";

describe("_NoHistory", () => {
  test("Return Render_NoHistory ", () => {
    render(<_NoHistory />);
    const noHistoryElement = screen.getByText(/no history/i);
    expect(noHistoryElement).toBeInTheDocument();
    expect(noHistoryElement).toHaveClass("no-history");
    expect(noHistoryElement).toHaveAttribute("aria-label", "No History");
    expect(noHistoryElement).toHaveAttribute("title", "No History");
  });
});

describe("_HistoryDataView", () => {
  test("Render History Component ", () => {
    const history = [
      { guessedColor: "red", correctColor: "green", time: 12, score: 4 },
      { guessedColor: "blue", correctColor: "blue", time: 23, score: 3 },
    ];
    const { getByTestId } = render(<_HistoryDataView history={history} />);
    const historyList = getByTestId("ul-history");
    expect(historyList).toBeInTheDocument();
    expect(historyList.children.length).toBe(history.length);
    history.forEach((item, index) => {
      const listItem = historyList.children[index];
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveTextContent(item.guessedColor);
      expect(listItem).toHaveTextContent(item.correctColor);
      expect(listItem).toHaveTextContent(`${item.time}s`);
    });
  });

  test("Return a message when not have history", () => {
    const { getByTestId } = render(<_HistoryDataView history={[]} />);
    const message = getByTestId("no-history");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent("No History");
  });
});
