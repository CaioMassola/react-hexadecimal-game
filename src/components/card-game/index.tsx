import './styles/style.css';
import './styles/media-queries.css';
import { useState } from 'react';

const CardGame = () => {

    const [progressBar, setProgressBar] = useState<number>(0);
    const [btnStart, setBtnStart] = useState<boolean>(false);

    const handleStartGame = () => {
        setBtnStart(!btnStart ? true : false);
        setProgressBar(!btnStart ? 10 : 0)
    }

    const _TimerView = () => {
        return (
            <div className='timer'>
                <p>REMANING TIME (s)</p>
                <p className='timer-value'>30</p>
            </div>
        )
    }

    const _RestartView = () => {
        return (
            <button onClick={() => handleStartGame()} className={btnStart ? 'btn-restart' : 'btn-restart-disabled'} disabled={btnStart  ? false : true}>Restart</button>
        )
    }

    const _ScoreView = () => {
        return (
            <div className='score-container'>
                <p className='hight-score'> HIGHT SCORE = 15</p>
                <p className='score'>SCORE = 8</p>
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
        let color = 'red';
        
        return (
            <div className='game-view-container'>
                {
                    btnStart ? (
                        <>
                            <div className='color-question' style={{ background: color }}></div>
                            <div className='options'>
                                <button className='btn-options'>#333</button>
                                <button className='btn-options'>#456</button>
                                <button className='btn-options'>#fff</button>
                            </div>
                        </>

                    )
                        :
                        <div className='options'>
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