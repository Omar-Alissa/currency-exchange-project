import React from 'react';
import CurrencyListItem from '../componenter/CurrencyListItem';
import './CurrencyFilterPage.css';

const currencies = [
  { code: 'AED', name: 'UAE Dirham' },
  { code: 'AFN', name: 'Afghansk Afghani' },
  { code: 'ALL', name: 'Albansk Lek' },
  { code: 'AMD', name: 'Armenien Dram' },
  { code: 'ANG', name: 'Antillergulden' },
  { code: 'AOA', name: 'Angolansk Kwanza' },
  { code: 'ARS', name: 'Argentinsk Peso' },
  { code: 'AUD', name: 'Australisk Dollar' },
  { code: 'AWG', name: 'Arubagulden' },
  { code: 'AZN', name: 'Azerbajdzjansk Ny Manat' },
  { code: 'BAM', name: 'Bosnien Mark' },
  { code: 'BBD', name: 'Barbadisk Dollar' },
];

function CurrencyFilterPage() {
  return (
    <div className="currency-filter-container">
      <div className="currency-filter-header">
        <span className="currency-filter-title">Välj valutor</span>
      </div>
      <div className="currency-filter-content">
        <input
          type="text"
          placeholder="Sök"
          className="currency-filter-search"
        />
        <div>
          {currencies.map(currency => (
            <CurrencyListItem key={currency.code} code={currency.code} name={currency.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CurrencyFilterPage;