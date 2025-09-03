
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Mainpage from './pages/Mainpage.jsx';
import CurrencyFilterPage from './pages/CurrencyFilterPage.jsx';

function App() {
  return (
    <BrowserRouter>
  {/* Navigationen hanteras nu i headern på respektive sida */}
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/filter" element={<CurrencyFilterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
