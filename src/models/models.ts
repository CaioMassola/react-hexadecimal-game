export type IHistory = {
  guessedColor: string;
  correctColor: string;
  time: number;
  score: number;
};

export type SideBarProps = {
  state: IHistory[];
};

export type IPropsButtonTabView = {
  data: {
    handleHistory: (x: string) => void;
    isCurrentGame: "current" | "lastest";
  };
};

export type IPropsHistory = {
  history: IHistory[];
};

export type CardProps = {
  updateSideBar: (x: IHistory[]) => void;
};

export type IPropsTimer = {
  data: {
    timer: number;
    timerStart: boolean;
  };
};

export type IPropsProgressBar = {
  progressBar: number;
};

export type IPropsRestart = {
  data: {
    handleResetGame: () => void;
    btnStart: boolean;
  };
};

export type IPropsScore = {
  data: {
    score: number;
    highScore: number;
  };
};
export type IPropsStart = {
  handleStartGame: () => void;
};

export type IPropsGameView = {
  data: {
    btnStart: boolean;
    option: string;
    colors: string[];
    handleVerifyColor: (x: string) => void;
    handleStartGame: () => void;
  };
};

export type IPropsClearData = {
  handleClearData: () => void;
};
