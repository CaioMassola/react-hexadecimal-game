import { useState } from 'react'
import './App.css'
import CardGame from './components/card-game'
import Sidebar from './components/sidebar'

const App = () => {

  return (
    <div className='container'>
      <Sidebar />
      <div className='game-container'>
        <CardGame />
      </div>
    </div>

  )
}

export default App;
