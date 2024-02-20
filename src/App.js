import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import CoinPage from './components/CoinPage'
import './App.css'

function App() {
  
  return (
    <div className='App'>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>} exact></Route>
          <Route path='/coins/:id' element={<CoinPage/>}></Route>
        </Routes>
    </div>
  )
}

export default App
