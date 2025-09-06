import React, { createContext, useState } from 'react';

export const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [baseAmount, setBaseAmount] = useState(0); // Basbelopp startar på 0
  const [baseCurrency, setBaseCurrency] = useState(''); // Basvaluta - startar tom

  // Funktion för att uppdatera basbeloppet och räkna om alla valutor
  const updateBaseAmount = (newAmount) => {
    const amount = parseFloat(newAmount) || 0;
    setBaseAmount(amount);
    
    setSelectedCurrencies(prevCurrencies =>
      prevCurrencies.map(currency => {
        if (currency.code === baseCurrency) {
          // Basvalutan får samma värde som basbeloppet
          return { ...currency, value: amount };
        } else {
          // Konvertera från basvalutan till denna valuta
          // Om basvalutan är EUR, använd direkt rate
          // Annars konvertera via EUR
          let conversionRate;
          if (baseCurrency === 'EUR') {
            conversionRate = currency.rate;
          } else {
            // Hitta basvalutans rate från EUR
            const baseCurrencyData = prevCurrencies.find(c => c.code === baseCurrency);
            if (baseCurrencyData) {
              // Konvertera: basvaluta -> EUR -> target valuta
              conversionRate = currency.rate / baseCurrencyData.rate;
            } else {
              conversionRate = currency.rate;
            }
          }
          return { ...currency, value: amount * conversionRate };
        }
      })
    );
  };

  // Funktion för att ändra basvaluta och uppdatera basbeloppet till den valda valutans värde
  const setAsBaseCurrency = (currencyCode) => {
    const selectedCurrency = selectedCurrencies.find(c => c.code === currencyCode);
    if (!selectedCurrency) return;

    // Sätt den valda valutan som basvaluta
    setBaseCurrency(currencyCode);
    
    // Uppdatera basbeloppet till den valda valutans nuvarande värde
    setBaseAmount(selectedCurrency.value);

    // Uppdatera alla valutor baserat på den nya basvalutan
    setSelectedCurrencies(prevCurrencies =>
      prevCurrencies.map(currency => {
        if (currency.code === currencyCode) {
          // Den valda valutan får värdet från basbeloppet
          return { ...currency, value: selectedCurrency.value };
        } else {
          // Beräkna nytt värde för andra valutor baserat på den nya basvalutan
          let conversionRate;
          if (currencyCode === 'EUR') {
            conversionRate = currency.rate;
          } else {
            // Konvertera: ny basvaluta -> EUR -> target valuta
            conversionRate = currency.rate / selectedCurrency.rate;
          }
          const newValue = selectedCurrency.value * conversionRate;
          return { ...currency, value: newValue };
        }
      })
    );
  };

  // Funktion för att lägga till en valuta med korrekt rate
  const addCurrency = (currency) => {
    const currencyWithRate = {
      ...currency,
      rate: currency.value, // Spara den ursprungliga växelkursen från EUR
      value: 0 // Starta med 0
    };
    
    setSelectedCurrencies(prevCurrencies => {
      // Kontrollera om valutan redan finns
      if (prevCurrencies.some(c => c.code === currency.code)) {
        return prevCurrencies;
      }
      
      // Om detta är den första valutan, sätt den som basvaluta
      if (prevCurrencies.length === 0) {
        setBaseCurrency(currency.code);
        setBaseAmount(0); // Starta med 0
        return [{
          ...currencyWithRate,
          value: 0 // Den första valutan får också värdet 0
        }];
      }
      
      return [...prevCurrencies, currencyWithRate];
    });
  };

  // Funktion för att ta bort en valuta
  const removeCurrency = (currencyCode) => {
    setSelectedCurrencies(prevCurrencies => {
      const newCurrencies = prevCurrencies.filter(currency => currency.code !== currencyCode);
      
      // Om vi tar bort basvalutan och det finns andra valutor, sätt första kvarvarande som ny basvaluta
      if (currencyCode === baseCurrency && newCurrencies.length > 0) {
        const newBaseCurrency = newCurrencies[0].code;
        setBaseCurrency(newBaseCurrency);
        setBaseAmount(0); // Nollställ basbeloppet
        
        // Nollställ alla valutor
        return newCurrencies.map(currency => ({
          ...currency,
          value: 0
        }));
      }
      
      // Om vi tar bort den sista valutan, nollställ basvaluta
      if (newCurrencies.length === 0) {
        setBaseCurrency('');
        setBaseAmount(0);
      }
      
      return newCurrencies;
    });
  };

  return (
    <CurrencyContext.Provider value={{ 
      selectedCurrencies, 
      setSelectedCurrencies,
      addCurrency,
      removeCurrency,
      baseAmount,
      updateBaseAmount,
      baseCurrency,
      setAsBaseCurrency
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}
