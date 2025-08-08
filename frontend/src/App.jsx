import './App.css';
import { Dashboard } from './Dashboard';
import LiveClock from './LiveClock';
import { useState } from 'react'
import UserPortfolio from "./components/UserPortfolio"
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css'

function App() {
  return (
    <>
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/my-portfolio" element={<UserPortfolio />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
