import { useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar'

function App() {

  return (
    <div className='container'>
      <Sidebar />
      <div className='game-container'>
        <div className='card'>
          <p>Game</p>
        </div>
      </div>
    </div>

  )
}

export default App
