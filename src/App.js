import React from 'react';
import { BrowserRouter,Routes, Route, } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Profile from './pages/ProfilePage/Profile';
import Expense from './pages/ExpenseTillNow/Expense';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Expense" element={<Expense />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
