import "./styles/style.css";
import "./styles/media-queries.css";
import { useEffect, useState } from "react";
import { IHistory } from "../../models/history";

type SideBarProps = {
  state: IHistory[];
};

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

  const _handleHistory = (type: string) => {
    setIsCurrentGame(type === "current" ? "lastest" : "current");
  };

  const _ButtonsTabView = () => {
    return (
      <div className="btn-tab">
        <button
          onClick={() => _handleHistory("lastest")}
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
          onClick={() => _handleHistory("current")}
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

  const _SubTitleSideBarView = () => {
    return (
      <div className="sub-title-sidebar">
        <p>Guessed Color</p>
        <p>Correct Color</p>
        <p>Score</p>
      </div>
    );
  };

  const _NoHistory = () => {
    return (
      <li>
        <div className="no-history" aria-label="No History" title="No History">
          No History
        </div>
      </li>
    );
  };

  const _HistoryDataView = () => {
    return (
      <ul>
        {history.length > 0 ? (
          history.reverse().map((x, idx) => {
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
                        x.correctColor === x.guessedColor
                          ? "#5cd65c"
                          : "#ff4d4d",
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

  return (
    <div className="sidebar" data-testid="app-sidebar">
      <div className="header">
        <p>History</p>
        <_ButtonsTabView />
        <_SubTitleSideBarView />
      </div>
      <_HistoryDataView />
    </div>
  );
};

export default Sidebar;
