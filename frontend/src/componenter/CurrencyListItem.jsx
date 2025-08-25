import React from 'react';
import './CurrencyListItem.css';

function CurrencyListItem({ code, name }) {
  return (
    <div className="currency-list-item">
      <div className="currency-code">{code}</div>
      <div className="currency-name">{name}</div>
    </div>
  );
}

export default CurrencyListItem;