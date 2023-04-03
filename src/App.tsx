import { useState } from 'react'
import './App.css'
import CardGame from './components/card-game'
import Sidebar from './components/sidebar'
import { IHistory } from './models/history'

const App = () => {
  const [state, setState] = useState<IHistory[]>([]);

  const updateSideBar = (data: IHistory[]) => {
    setState(data);
  };

  return (
    <div className='container'>
      <Sidebar state={state}/>
      <div className='game-container'>
        <CardGame updateSideBar={updateSideBar}/>
      </div>
    </div>

  )
}

export default App;
