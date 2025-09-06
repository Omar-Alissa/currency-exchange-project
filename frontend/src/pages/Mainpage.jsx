import './Mainpage.css';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';
import NumberKeyboard from '../componenter/NumberKeyboard';

function Mainpage() {
  const { selectedCurrencies, removeCurrency, baseAmount, updateBaseAmount, baseCurrency, setAsBaseCurrency } = useContext(CurrencyContext);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // 'base' eller currency code
  const [isMobile, setIsMobile] = useState(false);

  // Kontrollera om det är en mobil enhet
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleEdit = (currency) => {
    setEditingCurrency(currency.code);
    setEditValue(currency.value.toString());
    setActiveInput(currency.code);
    // På mobil: visa tangentbordet automatiskt
    // På desktop: visa tangentbordet endast vid explicit klick
    setShowKeyboard(true);
  };

  const handleSave = (currencyCode) => {
    // Uppdatera basbeloppet baserat på den redigerade valutan
    const amount = parseFloat(editValue) || 0;
    updateBaseAmount(amount);
    setEditingCurrency(null);
    setEditValue('');
    setActiveInput(null);
    setShowKeyboard(false);
  };

  const handleCancel = () => {
    setEditingCurrency(null);
    setEditValue('');
    setActiveInput(null);
    setShowKeyboard(false);
  };

  const handleRemove = (currencyCode) => {
    if (window.confirm('Är du säker på att du vill ta bort denna valuta?')) {
      removeCurrency(currencyCode);
    }
  };

  const handleBaseAmountChange = (e) => {
    updateBaseAmount(e.target.value);
  };

  const handleBaseAmountFocus = () => {
    setActiveInput('base');
    // På mobil: visa tangentbordet automatiskt
    // På desktop: visa tangentbordet endast vid explicit klick
    setShowKeyboard(true);
  };

  const handleSelectAsBase = (currencyCode) => {
    setAsBaseCurrency(currencyCode);
  };

  const handleNumberClick = (number) => {
    if (activeInput === 'base') {
      const newValue = baseAmount.toString() + number;
      updateBaseAmount(newValue);
    } else if (activeInput && editingCurrency) {
      setEditValue(prev => prev + number);
    }
  };

  const handleDelete = () => {
    if (activeInput === 'base') {
      const newValue = baseAmount.toString().slice(0, -1);
      updateBaseAmount(newValue);
    } else if (activeInput && editingCurrency) {
      setEditValue(prev => prev.slice(0, -1));
    }
  };

  const handleClear = () => {
    if (activeInput === 'base') {
      updateBaseAmount(0);
    } else if (activeInput && editingCurrency) {
      setEditValue('0');
    }
  };

  const handleCloseKeyboard = () => {
    setShowKeyboard(false);
    setActiveInput(null);
    if (editingCurrency) {
      setEditingCurrency(null);
      setEditValue('');
    }
  };

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
          <>
            <div className="base-amount-section">
              <label htmlFor="baseAmount" className="base-amount-label">
                Basbelopp ({baseCurrency || 'Välj valuta'}):
              </label>
              <input
                id="baseAmount"
                type="number"
                value={baseAmount}
                onChange={handleBaseAmountChange}
                onFocus={handleBaseAmountFocus}
                className="base-amount-input"
                step="0.01"
                min="0"
                placeholder="Ange belopp"
                readOnly={isMobile} // På mobil: läs endast, på desktop: redigerbar
              />
              <div className="base-currency-info">
                {baseCurrency ? 
                  `Huvudkonverteringsvaluta: ${baseCurrency}. Alla andra valutor konverteras från denna valuta.` :
                  'Välj en valuta som huvudkonverteringsvaluta genom att trycka på "Välj".'
                }
              </div>
            </div>
            {selectedCurrencies.map(currency => (
              <div key={currency.code} className={`currency-bar ${currency.code === baseCurrency ? 'base-currency' : ''}`}>
                <span className="currency-bar__code">
                  {currency.code}
                  {currency.code === baseCurrency && <span className="base-indicator"> (BAS)</span>}
                </span>
                <div className="currency-bar__value-group">
                  {editingCurrency === currency.code ? (
                    <div className="currency-bar__edit-group">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="currency-bar__edit-input"
                        step="0.0001"
                        readOnly={isMobile} // På mobil: läs endast, på desktop: redigerbar
                      />
                      <div className="currency-bar__edit-buttons">
                        <button 
                          onClick={() => handleSave(currency.code)}
                          className="currency-bar__save-btn"
                        >
                          Spara
                        </button>
                        <button 
                          onClick={handleCancel}
                          className="currency-bar__cancel-btn"
                        >
                          Avbryt
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span 
                        className={`currency-bar__value ${currency.value === 0 ? 'zero-value' : ''} clickable-value`}
                        onClick={() => handleEdit(currency)}
                      >
                        {currency.value.toFixed(4)}
                      </span>
                      <span className="currency-bar__subtext">{currency.name}</span>
                    </>
                  )}
                </div>
                <div className="currency-bar__actions">
                  {editingCurrency !== currency.code && (
                    <button 
                      onClick={() => handleSelectAsBase(currency.code)}
                      className={`currency-bar__select-btn ${currency.code === baseCurrency ? 'selected' : ''}`}
                    >
                      {currency.code === baseCurrency ? 'Aktiv' : 'Välj'}
                    </button>
                  )}
                  <button 
                    onClick={() => handleRemove(currency.code)}
                    className="currency-bar__remove-btn"
                  >
                    Ta bort
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      
      <NumberKeyboard
        isVisible={showKeyboard}
        onNumberClick={handleNumberClick}
        onDelete={handleDelete}
        onClear={handleClear}
        onClose={handleCloseKeyboard}
      />
    </>
  );
}

export default Mainpage
