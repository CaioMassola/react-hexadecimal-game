import "./styles/style.css"
import "./styles/media-queries.css"
import { useEffect, useState } from "react";

const Sidebar = () => {

  const [isCurrentGame, setIsCurrentGame] = useState<'current' | 'lastest'>('current');

  useEffect(() => {
    console.log('isCurrentgame', isCurrentGame)
  }, [isCurrentGame])

  const _handleHistory = (type: string) => {
    setIsCurrentGame(type === 'current' ? "lastest" : 'current');
  }

  const _ButtonsTabView = () => {
    return (
      <div className="btn-tab">
        <button onClick={() => _handleHistory("lastest")} className={isCurrentGame === 'current' ? 'button-selected' : 'button-not-selected'}>Current Game</button>
        <button onClick={() => _handleHistory("current")} className={isCurrentGame === 'lastest' ? 'button-selected' : 'button-not-selected'}>Lastest Game</button>
      </div>
    )
  }

  const _SubTitleSideBarView = () => {
    return (
      <div className="sub-title-sidebar">
        <p>Guessed Color</p>
        <p> | </p>
        <p>Correct Color</p>
        <p> | </p>
        <p>Score</p>
      </div>
    )
  }

  const _HistoryDataView = () => {
    return (
      <ul >
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
        <li>Item 6</li>
        <li>Item 7</li>
        <li>Item 8</li>
        <li>Item 9</li>
        <li>Item 10</li>
        <li>Item 11</li>
        <li>Item 12</li>
        <li>Item 13</li>
        <li>Item 14</li>
        <li>Item 15</li>
        <li>Item 16</li>
        <li>Item 17</li>
        <li>Item 18</li>
        <li>Item 19</li>
        <li>Item 17</li>
        <li>Item 18</li>
        <li>Item 19</li>
        <li>Item 13</li>
        <li>Item 14</li>
        <li>Item 15</li>
        <li>Item 16</li>
        <li>Item 17</li>
        <li>Item 18</li>
        <li>Item 19</li>
        <li>Item 17</li>
        <li>Item 18</li>
        <li>Item 19</li>
      </ul>
    )
  }

  return (
    <div className="sidebar" >
      <div className="header">
        <p >History</p>
        <_ButtonsTabView />
        <_SubTitleSideBarView />
      </div>
      <_HistoryDataView />
    </div>
  );
};

export default Sidebar;