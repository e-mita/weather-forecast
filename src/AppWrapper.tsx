import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:cityName" element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppWrapper;
