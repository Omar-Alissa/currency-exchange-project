

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainpage from './pages/Mainpage.jsx';
import CurrencyFilterPage from './pages/CurrencyFilterPage.jsx';
import { CurrencyProvider } from './context/CurrencyContext';

function App() {
  return (
    <CurrencyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/filter" element={<CurrencyFilterPage />} />
        </Routes>
      </BrowserRouter>
    </CurrencyProvider>
  );
}

export default App;
