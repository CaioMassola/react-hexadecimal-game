import "./styles/style.css";
import "./styles/media-queries.css";
import { useEffect, useRef, useState } from "react";
import {
  CardProps,
  IHistory,
  IPropsClearData,
  IPropsGameView,
  IPropsProgressBar,
  IPropsRestart,
  IPropsScore,
  IPropsStart,
  IPropsTimer,
} from "../../models/models";
import { TUTORIAL } from "../../global/global";
import UtilsClass from "../../utils/utils";

const CardGame = (props: CardProps) => {
  const { updateSideBar } = props;

  //for start game
  const [btnStart, setBtnStart] = useState<boolean>(false);

  //for colors
  const [colors, setColors] = useState<string[]>([]);
  const [option, setOption] = useState<string>("");

  //for score
  const highScoreLocalStorage = localStorage.getItem("high-score");
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(
    highScoreLocalStorage ? Number(highScoreLocalStorage) : 0
  );

  //for history
  const [history, setHistory] = useState<IHistory[]>([]);

  //for progress event
  const [progressBar, setProgressBar] = useState<number>(0);
  const [idProgressBar, setIdProgressBar] = useState<number | undefined>(
    undefined
  );

  //for time event
  const [timer, setTimer] = useState<number>(30);
  const [timerStart, setTimerStart] = useState<boolean>(false);
  const timerRef = useRef<number>();

  const utilsClass = new UtilsClass();

  //remove item duplicate involuntary and verify endgame
  useEffect(() => {
    if (timer === 0) {
      handleEndGame();
      if (
        history.length > 0 &&
        history[0].correctColor === history[1].correctColor
      ) {
        setHistory([history[0], ...history.slice(2)]);
      }
    }

    if (timer === 0 && progressBar !== timer) {
      handleHistory("", score <= 1 ? 1 : 2);
    }
    //set history in sidebar component
    updateSideBar(history);
  }, [history, timer]);

  //set right color
  useEffect(() => {
    if (colors.length) {
      const color = utilsClass.colorOption(colors);
      setOption(color ?? "");
    }
  }, [colors]);

  //start and stop the timer
  useEffect(() => {
    if (timerStart) {
      startTimer();
    } else {
      clearInterval(timerRef.current);
    }
  }, [timerStart]);

  //for update of progress bar
  useEffect(() => {
    if (progressBar === 10) {
      // setScore((x) => x - 2);
      handleHistory("", 2);
    }

    if (progressBar >= 10) {
      setProgressBar(0);
    }
  }, [progressBar, score]);

  //verify new high score
  useEffect(() => {
    if (score < 0) {
      setScore(0);
    }
    if (timer === 0 && history[0].score > highScore) {
      setHighScore(score);
    }
  }, [score]);

  // verify color if selected
  const handleVerifyColor = (x: string) => {
    setProgressBar(0);
    handleHistory(x);
  };

  //set data in history
  const handleHistory = (color: string, valueLost: number = 1) => {
    const data: IHistory = {
      guessedColor: color,
      correctColor: option,
      score: color === option ? score + 5 : score === 0 ? 0 : score - valueLost,
      time: progressBar,
    };
    setScore(data.score);
    setHistory((x) => [data, ...x]);
    setOption("");
    handleGetColors();
  };

  //Timer 30s
  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(timerRef.current);
          handleResetGame();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  //start Game
  const handleStartGame = () => {
    setBtnStart(true);
    setTimerStart(true);
    handleGetColors();
  };

  //Get Random Colors
  const handleGetColors = async () => {
    if (timer !== 0) {
      const data = await utilsClass.getColors();
      if (data.length) {
        setColors(data);
        startProgressBar();
      }
    }
  };

  //start progressBar
  const startProgressBar = () => {
    if (!idProgressBar) {
      const id = window.setInterval(() => {
        setProgressBar((prevTimer) => prevTimer + 1);
      }, 1000);
      setIdProgressBar(id);
    }
  };

  //stop progressBar
  const stopProgressBar = () => {
    if (idProgressBar) {
      window.clearInterval(idProgressBar);
      setProgressBar(0);
      setIdProgressBar(undefined);
    }
  };

  //verify endgame
  const handleEndGame = () => {
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem(
      "high-score",
      JSON.stringify(
        history[0].score > highScore ? history[0].score : highScore
      )
    );
    setProgressBar(0);
    stopProgressBar();
  };

  //reset game
  const handleResetGame = () => {
    stopProgressBar();
    setBtnStart(false);
    setTimer(30);
    setTimerStart(false);
    setColors([]);
    setScore(0);
    setOption("");
    setHistory([]);
  };

  //clear all data
  const handleClearData = () => {
    handleResetGame();
    setHighScore(0);
    localStorage.removeItem("high-score");
    localStorage.removeItem("history");
  };

  return (
    <div className="card" data-testid="app-card-game">
      <div className="card-game">
        <p
          className="card-title"
          aria-label="What is the color?"
          title={TUTORIAL}
        >
          What is the color?
        </p>
        <div className="card-info">
          <_TimerView data={{ timer, timerStart }} />
          <_RestartView data={{ btnStart, handleResetGame }} />
          <_ScoreView data={{ score, highScore }} />
        </div>
        <div className="card-question">
          <_ProgressBarView progressBar={progressBar} />
          <_GameView
            data={{
              btnStart,
              colors,
              option,
              handleStartGame,
              handleVerifyColor,
            }}
          />
        </div>
        <div className="card-delete-info">
          <_ClearData handleClearData={handleClearData} />
        </div>
      </div>
    </div>
  );
};

//TimerComponent
const _TimerView = (props: IPropsTimer) => {
  const { timer, timerStart } = props.data;
  return (
    <div
      className="timer"
      aria-label={`REMANING TIME (s): ${timerStart ? timer : "30"}`}
      title={`REMANING TIME (s): ${timerStart ? timer : "30"}`}
      data-testid="timer"
    >
      <p>REMANING TIME (s)</p>
      <p
        className="timer-value"
        style={{
          color:
            (timerStart && timer && timer == 0) || timer <= 10
              ? "red"
              : "white",
        }}
      >
        {timerStart ? timer : "30"}
      </p>
    </div>
  );
};

//ScoreView
const _ScoreView = (props: IPropsScore) => {
  const { score, highScore } = props.data;
  return (
    <div className="score-container">
      <p
        className="high-score"
        title={`HIGH SCORE = ${highScore}`}
        aria-label={`HIGH SCORE = ${highScore}`}
        data-testid="score"
      >
        HIGH SCORE = {highScore}
      </p>
      <p
        className="score"
        title={`SCORE = ${score}`}
        aria-label={`SCORE = ${score}`}
      >
        SCORE = {score}
      </p>
    </div>
  );
};

//ProgressBarComponent
const _ProgressBarView = (props: IPropsProgressBar) => {
  const { progressBar } = props;
  return (
    <div className="progress-bar-container">
      <progress
        value={progressBar}
        max="10"
        className="progress-bar"
        aria-label={`Time Question: ${progressBar}`}
        title={`Time Question: ${progressBar}`}
        data-testid="progressbar"
      ></progress>
    </div>
  );
};

//RestartGame
const _RestartView = (props: IPropsRestart) => {
  const { btnStart, handleResetGame } = props.data;
  return (
    <button
      onClick={() => handleResetGame()}
      className={btnStart ? "btn-restart" : "btn-restart-disabled"}
      disabled={btnStart ? false : true}
      aria-label="Restart"
      title="Restart"
      data-testid="restart"
    >
      Restart
    </button>
  );
};

//Start Game
const _StartGame = (props: IPropsStart) => {
  const { handleStartGame } = props;
  return (
    <div className="options">
      <button
        type="button"
        className="btn-start"
        onClick={() => handleStartGame()}
        aria-label="Start"
        title="Start"
        data-testid="start"
      >
        START
      </button>
    </div>
  );
};

//Game
const _GameView = (props: IPropsGameView) => {
  const { btnStart, option, colors, handleVerifyColor, handleStartGame } =
    props.data;

  return (
    <div className="game-view-container" data-testid="game-view-container">
      {btnStart ? (
        <>
          {option && (
            <>
              <div
                className="color-question"
                style={{ background: option }}
              ></div>
              <div className="options">
                {colors.map((x, idx) => {
                  return (
                    <button
                      type="button"
                      className="btn-options"
                      key={idx}
                      onClick={() => handleVerifyColor(x)}
                      aria-label={x}
                      title={x}
                    >
                      {x}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </>
      ) : (
        <_StartGame handleStartGame={handleStartGame} />
      )}
    </div>
  );
};

//ClearData
const _ClearData = (props: IPropsClearData) => {
  const { handleClearData } = props;
  return (
    <button
      type="button"
      className="btn-delete"
      aria-label="Reset all data"
      title="Reset all data"
      onClick={() => handleClearData()}
      data-testeid="clear"
    >
      Reset all data
    </button>
  );
};

export default CardGame;
export {
  _TimerView,
  _ProgressBarView,
  _RestartView,
  _ScoreView,
  _GameView,
  _StartGame,
  _ClearData,
};
