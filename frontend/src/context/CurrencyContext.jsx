import React, { createContext, useState } from 'react';

export const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  return (
    <CurrencyContext.Provider value={{ selectedCurrencies, setSelectedCurrencies }}>
      {children}
    </CurrencyContext.Provider>
  );
}
