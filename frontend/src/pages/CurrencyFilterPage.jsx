
import React, { useEffect, useState, useContext } from 'react';
import CurrencyListItem from '../componenter/CurrencyListItem';
import { fetchRates } from '../api/exchangeApi';
import './CurrencyFilterPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../context/CurrencyContext';

function CurrencyFilterPage() {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const { selectedCurrencies, setSelectedCurrencies } = useContext(CurrencyContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRates('EUR')
      .then(data => {
        if (data && data.quotes) {
          const arr = Object.entries(data.quotes).map(([code, value]) => ({
            code: code.replace('EUR', ''),
            name: code, // Du kan mappa namn om du vill
            value
          }));
          setCurrencies(arr);
        }
      })
      .catch(err => setError('Kunde inte hämta data'));
  }, []);

  const filtered = currencies.filter(currency =>
    currency.code.toLowerCase().includes(search.toLowerCase()) ||
    currency.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="currency-filter-container">
      <div className="currency-filter-header" style={{ position: 'relative' }}>
        <span className="currency-filter-title">Välj valutor</span>
        <nav style={{ position: 'absolute', right: 20, top: 20 }}>
          <Link to="/" style={{ marginRight: '12px' }}>Home</Link>
          <Link to="/filter">Filter Page</Link>
        </nav>
      </div>
      <div className="currency-filter-content">
        <input
          type="text"
          placeholder="Sök"
          className="currency-filter-search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          {selected ? (
            <div style={{ margin: '24px 0', padding: '16px', background: '#222', borderRadius: '8px', color: '#fff' }}>
              <h3>Vald valuta:</h3>
              <div>Kod: {selected.code}</div>
              <div>Namn: {selected.name}</div>
              <div>Värde: {selected.value}</div>
              <button onClick={() => setSelected(null)} style={{ marginTop: '12px' }}>Tillbaka</button>
            </div>
          ) : (
            filtered.map(currency => (
              <div key={currency.code} onClick={() => {
                // Lägg bara till om valutan inte redan finns
                if (!selectedCurrencies.some(c => c.code === currency.code)) {
                  setSelectedCurrencies([...selectedCurrencies, currency]);
                }
                navigate('/');
              }} style={{ cursor: 'pointer' }}>
                <CurrencyListItem code={currency.code} name={currency.name} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrencyFilterPage;