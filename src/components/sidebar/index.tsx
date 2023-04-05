import "./styles/style.css";
import "./styles/media-queries.css";
import { useEffect, useState } from "react";
import {
  IHistory,
  IPropsButtonTabView,
  IPropsHistory,
  SideBarProps,
} from "../../models/models";

const Sidebar = (props: SideBarProps) => {
  const { state } = props;
  const historyLocalStorageJson = localStorage.getItem("history");
  const historyLocalStorage: IHistory[] = historyLocalStorageJson
    ? JSON.parse(historyLocalStorageJson)
    : [];
  const [isCurrentGame, setIsCurrentGame] = useState<"current" | "lastest">(
    "current"
  );
  const [history, setHistory] = useState<IHistory[]>(state);

  useEffect(() => {
    setHistory(isCurrentGame === "current" ? state : historyLocalStorage);
  }, [state, isCurrentGame]);

  const handleHistory = (type: string) => {
    setIsCurrentGame(type === "current" ? "current" : "lastest");
  };

  return (
    <div className="sidebar" data-testid="app-sidebar">
      <div className="header">
        <p>History</p>
        <_ButtonsTabView data={{ isCurrentGame, handleHistory }} />
        <_SubTitleSideBarView />
      </div>
      <_HistoryDataView history={history} />
    </div>
  );
};

//ButtonsTabView Component
const _ButtonsTabView = (props: IPropsButtonTabView) => {
  const { handleHistory, isCurrentGame } = props.data;
  return (
    <div className="btn-tab" data-testid="btn-tab">
      <button
        onClick={() => handleHistory("current")}
        className={
          isCurrentGame === "current"
            ? "button-selected"
            : "button-not-selected"
        }
        aria-label="Current Game"
        title="Current Game"
      >
        Current Game
      </button>
      <button
        onClick={() => handleHistory("lastest")}
        className={
          isCurrentGame === "lastest"
            ? "button-selected"
            : "button-not-selected"
        }
        aria-label="Lastest Game"
        title="Lastest Game"
      >
        Lastest Game
      </button>
    </div>
  );
};

//SubTitleSideBarView Component
const _SubTitleSideBarView = () => {
  return (
    <div className="sub-title-sidebar" data-testid="sub-title-sidebar">
      <p>Guessed Color</p>
      <p>Correct Color</p>
      <p>Score</p>
    </div>
  );
};

//HistoryDataView Component
const _HistoryDataView = (props: IPropsHistory) => {
  const { history } = props;
  return (
    <ul data-testid="ul-history">
      {history.length > 0 ? (
        history.map((x, idx) => {
          return (
            <li key={idx}>
              <div className="history">
                <div
                  className="card-result"
                  style={{ backgroundColor: x.guessedColor }}
                  aria-label={x.guessedColor}
                  title={x.guessedColor}
                >
                  <p>{x.guessedColor}</p>
                </div>
                <div
                  className="card-result"
                  style={{ backgroundColor: x.correctColor }}
                  aria-label={x.correctColor}
                  title={x.correctColor}
                >
                  <p>{x.correctColor}</p>
                </div>
                <div
                  className="scoreText"
                  style={{
                    color:
                      x.correctColor === x.guessedColor ? "#5cd65c" : "#ff4d4d",
                  }}
                  aria-label={String(x.time)}
                  title={String(x.time)}
                >
                  {x.time}s
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <_NoHistory />
      )}
    </ul>
  );
};

//NoHistory Component
const _NoHistory = () => {
  return (
    <li>
      <div
        className="no-history"
        aria-label="No History"
        title="No History"
        data-testid="no-history"
      >
        No History
      </div>
    </li>
  );
};

export default Sidebar;
export { _SubTitleSideBarView, _NoHistory, _ButtonsTabView, _HistoryDataView };
