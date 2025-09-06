import './NumberKeyboard.css';
import { useEffect, useState } from 'react';

function NumberKeyboard({ isVisible, onNumberClick, onDelete, onClear, onClose }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // På desktop: visa bara om isVisible är true
  // På mobil: visa alltid när isVisible är true
  const shouldShow = isVisible && (isMobile || isVisible);

  if (!shouldShow) return null;

  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0', '.', '⌫']
  ];

  const handleNumberClick = (value) => {
    if (value === '⌫') {
      onDelete();
    } else {
      onNumberClick(value);
    }
  };

  return (
    <div className={`keyboard-overlay ${isMobile ? 'mobile-keyboard' : 'desktop-keyboard'}`}>
      <div className="keyboard-container">
        <div className="keyboard-header">
          <button className="keyboard-clear-btn" onClick={onClear}>
            Rensa
          </button>
          <button className="keyboard-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="keyboard-grid">
          {numbers.map((row, rowIndex) => (
            <div key={rowIndex} className="keyboard-row">
              {row.map((number) => (
                <button
                  key={number}
                  className={`keyboard-key ${number === '⌫' ? 'delete-key' : ''}`}
                  onClick={() => handleNumberClick(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NumberKeyboard;
