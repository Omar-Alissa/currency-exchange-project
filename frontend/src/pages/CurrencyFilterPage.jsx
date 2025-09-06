
import React, { useState, useContext } from 'react';
import CurrencyListItem from '../componenter/CurrencyListItem';
import { fetchRates } from '../api/exchangeApi';
import './CurrencyFilterPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../context/CurrencyContext';

// Populära valutor med fallback-växelkurser (USD som bas)
const POPULAR_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', value: 1.0 },
  { code: 'EUR', name: 'Euro', value: 0.85 },
  { code: 'GBP', name: 'British Pound', value: 0.73 },
  { code: 'JPY', name: 'Japanese Yen', value: 110.0 },
  { code: 'SEK', name: 'Swedish Krona', value: 10.50 },
  { code: 'NOK', name: 'Norwegian Krone', value: 10.80 },
  { code: 'DKK', name: 'Danish Krone', value: 6.35 },
  { code: 'CHF', name: 'Swiss Franc', value: 0.88 },
  { code: 'CAD', name: 'Canadian Dollar', value: 1.35 },
  { code: 'AUD', name: 'Australian Dollar', value: 1.52 },
  { code: 'CNY', name: 'Chinese Yuan', value: 7.10 },
  { code: 'INR', name: 'Indian Rupee', value: 83.0 },
];

function CurrencyFilterPage() {
  const [currencies, setCurrencies] = useState(POPULAR_CURRENCIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { selectedCurrencies, setSelectedCurrencies } = useContext(CurrencyContext);
  const navigate = useNavigate();

  const handleSearch = async (term) => {
    setSearchTerm(term);
    
    if (term.length > 2) {
      setLoading(true);
      setError('');
      
      try {
        const data = await fetchRates('USD');
        if (data && data.quotes) {
          const searchResults = Object.entries(data.quotes)
            .filter(([code]) => 
              code.toLowerCase().includes(term.toLowerCase()) ||
              code.replace('USD', '').toLowerCase().includes(term.toLowerCase())
            )
            .map(([code, value]) => ({
              code: code.replace('USD', ''),
              name: code.replace('USD', ''),
              value
            }))
            .slice(0, 20); // Begränsa till 20 resultat
          
          // Kombinera populära valutor med sökresultat (ta bort dubbletter)
          const combined = [...POPULAR_CURRENCIES];
          searchResults.forEach(result => {
            if (!combined.some(curr => curr.code === result.code)) {
              combined.push(result);
            }
          });
          
          setCurrencies(combined);
        }
      } catch (err) {
        setError('Kunde inte söka valutor');
      }
      
      setLoading(false);
    } else {
      setCurrencies(POPULAR_CURRENCIES);
    }
  };

  const handleSelectCurrency = async (currency) => {
    setLoading(true);
    setError('');
    
    try {
      // Försök hämta aktuell växelkurs från API först
      const data = await fetchRates('USD');
      
      if (data && data.quotes) {
        const rateKey = `USD${currency.code}`;
        const exchangeRate = data.quotes[rateKey];
        
        if (exchangeRate) {
          currency.value = exchangeRate;
        } else {
          // Använd fallback-värde om kursen inte finns
          currency.value = currency.value || 1.0;
        }
      } else {
        // Använd fallback-värde om API-data är ogiltigt
        currency.value = currency.value || 1.0;
      }
    } catch (error) {
      console.log('API otillgängligt, använder fallback-kurs');
      // Använd fallback-värde om API misslyckas (rate limit etc.)
      currency.value = currency.value || 1.0;
    }
    
    // Lägg bara till om valutan inte redan finns
    if (!selectedCurrencies.some(c => c.code === currency.code)) {
      setSelectedCurrencies([...selectedCurrencies, currency]);
    }
    navigate('/');
    
    setLoading(false);
  };

  const filteredCurrencies = currencies.filter(currency =>
    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="currency-filter-container">
      <div className="currency-filter-header">
        <span className="currency-filter-title">Välj valutor</span>
        <nav className="currency-filter-nav">
          <Link to="/">Home</Link>
          <Link to="/filter">Filter Page</Link>
        </nav>
      </div>
      <div className="currency-filter-content">
        <input
          type="text"
          placeholder="Sök valuta (skriv minst 3 tecken för utökad sökning)"
          className="currency-filter-search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        
        {loading && <div className="loading">Hämtar valutakurs...</div>}
        {error && <div className="error">{error}</div>}
        
        <div className="currency-list">
          {filteredCurrencies.map(currency => (
            <div 
              key={currency.code} 
              onClick={() => handleSelectCurrency(currency)}
              className="currency-item-clickable"
            >
              <CurrencyListItem code={currency.code} name={currency.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CurrencyFilterPage;