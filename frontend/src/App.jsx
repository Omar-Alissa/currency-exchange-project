import { useState } from 'react'
import './App.css'
import CurrencyFilterPage from './pages/CurrencyFilterPage.jsx'
import Mainpage from './pages/Mainpage.jsx'

function App() {
  return (
    <>
     <Mainpage />
      <CurrencyFilterPage />
    </>
  )
}

export default App
