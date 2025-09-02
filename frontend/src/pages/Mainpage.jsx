import { useState } from 'react'
import './Mainpage.css'

function Mainpage() {
  return (
    <>
      <header className="app-header">
        <div className="app-header__title">valuta converterare</div>
      </header>
      <div className="currency-bar">
        <span className="currency-bar__code">USD</span>
        <div className="currency-bar__value-group">
          <span className="currency-bar__value">0</span>
          <span className="currency-bar__subtext">US Dollar</span>
        </div>
      </div>
      <div className="currency-bar currency-bar--second">
        <span className="currency-bar__code">SEK</span>
        <div className="currency-bar__value-group">
          <span className="currency-bar__value">0</span>
          <span className="currency-bar__subtext">Svensk Krona</span>
        </div>
      </div>
      <div className="currency-bar currency-bar--third">
        <span className="currency-bar__code">DKK</span>
        <div className="currency-bar__value-group">
          <span className="currency-bar__value">0</span>
          <span className="currency-bar__subtext">Dansk Krona</span>
        </div>
      </div>
      <div className="currency-bar currency-bar--fourth">
        <span className="currency-bar__code">NOK</span>
        <div className="currency-bar__value-group">
          <span className="currency-bar__value">0</span>
          <span className="currency-bar__subtext">Norsk Krona</span>
        </div>
      </div>
      <div className="currency-bar currency-bar--fifth">
        <span className="currency-bar__code">EUR</span>
        <div className="currency-bar__value-group">
          <span className="currency-bar__value">0</span>
          <span className="currency-bar__subtext">Euro</span>
        </div>
      </div>
      <div className="currency-bar currency-bar--sixth">
        <span className="currency-bar__code">GBP</span>
        <div className="currency-bar__value-group">
          <span className="currency-bar__value">0</span>
          <span className="currency-bar__subtext">Brittiskt Pund</span>
        </div>
      </div>
      <div className="currency-bar currency-bar--seventh">
        <span className="currency-bar__code">AED</span>
        <div className="currency-bar__value-group">
          <span className="currency-bar__value">0</span>
          <span className="currency-bar__subtext">Emiratisk Dirham</span>
        </div>
      </div>
      <div className="currency-bar currency-bar--eighth">
        <span className="currency-bar__code">CNY</span>
        <div className="currency-bar__value-group">
          <span className="currency-bar__value">0</span>
          <span className="currency-bar__subtext">Kinesisk Yuan</span>
        </div>
      </div>
    </>
  )
}

export default Mainpage
