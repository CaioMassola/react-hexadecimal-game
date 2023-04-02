import './styles/style.css';
import './styles/media-queries.css';
import { useEffect, useRef, useState } from 'react';
import { colorOption, getColors } from '../../utils';

const CardGame = () => {

    const [btnStart, setBtnStart] = useState<boolean>(false);

    //for progress
    const [progressBar, setProgressBar] = useState<number>(0);
    const [timerProgressBar, setTimeProgressBar] = useState<boolean>(false);
    const progressRef = useRef<number>();

    //for time
    const [timer, setTimer] = useState<number>(30);
    const [timerStart, setTimerStart] = useState<boolean>(false);
    const timerRef = useRef<number>();

    //for colors
    const [colors, setColors] = useState<string[]>([]);
    const [option, setOption] = useState<string>();

    //for score
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<number>(10);

    useEffect(() => {
        if (colors.length) {
            const color = colorOption(colors);
            setOption(color)
        }
    }, [colors])

    useEffect(() => {
        if (timerStart) {
            startTimer();
        } else {
            clearInterval(timerRef.current);
        }
    }, [timerStart]);

    useEffect(() => {
        if (timerProgressBar && progressBar < 100) {
            progressRef.current = setInterval(() => {
                setProgressBar((x) => x + 1);
            }, 100);
        } else {
            clearInterval(progressRef.current);
        }

        return () => clearInterval(progressRef.current);
    }, [timerProgressBar, progressBar]);

    useEffect(() => {
        if (progressBar === 100) {
            handleGetColors();
        }
    }, [progressBar])

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score)
        }
        if (score < 0) {
            setScore(0)
        }
    }, [score])

    const handleVerifyColor = (x: string) => {
        x === option ? setScore((x) => x + 5) : setScore((x) => x - 1)
        handleGetColors();
    }

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

    const handleStartGame = () => {
        setBtnStart(true);
        setTimerStart(true);
        handleGetColors();
    }

    const handleGetColors = () => {
        const data = getColors()
        if (data.length) {
            setColors(data)
            // setTimeProgressBar(true)
        }
    }

    const handleResetGame = () => {
        setBtnStart(false);
        setProgressBar(0);
        setTimer(30);
        setTimerStart(false);
        setTimeProgressBar(false);
        setProgressBar(0);
        setColors([]);
        setScore(0);
    }

    const _TimerView = () => {
        return (
            <div className='timer'>
                <p>REMANING TIME (s)</p>
                <p className='timer-value'
                    style={{ color: timerStart && timer && timer == 0 || timer <= 10 ? 'red' : 'white' }}
                >
                    {timerStart ? timer : '30'}
                </p>
            </div>
        )
    }

    const _RestartView = () => {
        return (
            <button onClick={() => handleResetGame()} className={btnStart ? 'btn-restart' : 'btn-restart-disabled'} disabled={btnStart ? false : true}>Restart</button>
        )
    }

    const _ScoreView = () => {
        return (
            <div className='score-container'>
                <p className='high-score'> HIGH SCORE = {highScore}</p>
                <p className='score'>SCORE = {score}</p>
            </div>
        )
    }

    const _ProgressBarView = () => {
        return (
            <div className='progress-bar-container'>
                <progress value={progressBar} max="100" className='progress-bar'></progress>
            </div>
        )
    }

    const _GameView = () => {

        return (
            <div className='game-view-container'>
                {
                    btnStart ? (
                        <>
                            <div className='color-question' style={{ background: option }}></div>
                            <div className='options'>
                                {
                                    colors.map((x) => {
                                        return (
                                            <button className='btn-options' key={x} onClick={() => handleVerifyColor(x)}>{x}</button>
                                        )
                                    })
                                }
                            </div>
                        </>
                    )
                        :
                        <div className='options' style={{ marginTop: '20%' }}>
                            <button className='btn-start' onClick={() => handleStartGame()}>START</button>
                        </div>
                }
            </div>
        )
    }

    const _ClearData = () => {
        return (
            <button className='btn-delete'>Reset all data</button>
        )
    }
    return (
        <div className='card'>
            <div className='card-game'>
                <p className='card-title'>What is the color?</p>
                <div className='card-info'>
                    <_TimerView />
                    <_RestartView />
                    <_ScoreView />
                </div>
                <div className='card-question'>
                    <_ProgressBarView />
                    <_GameView />
                </div>
                <div className='card-delete-info'>
                    <_ClearData />
                </div>
            </div>
            <div className='card-help'>
                <p>teste</p>
            </div>
        </div>
    )


}

export default CardGame;