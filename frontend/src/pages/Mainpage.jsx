

import './Mainpage.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';


function Mainpage() {
  const { selectedCurrencies } = useContext(CurrencyContext);
  return (
    <>
      <header className="app-header">
        <div className="app-header__title">valuta converterare</div>
        <nav className="app-header__nav">
          <Link to="/filter">Filter Page</Link>
          <Link to="/">Home</Link>
        </nav>
      </header>
      <div className="currency-container">
        {selectedCurrencies.length === 0 ? (
          <div className="empty-state">Inga valutor valda än. Gå till Filter Page för att välja.</div>
        ) : (
          selectedCurrencies.map(currency => (
            <div key={currency.code} className="currency-bar">
              <span className="currency-bar__code">{currency.code}</span>
              <div className="currency-bar__value-group">
                <span className="currency-bar__value">{currency.value}</span>
                <span className="currency-bar__subtext">{currency.name}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Mainpage
