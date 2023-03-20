import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { CardsPage } from './components/CardsPage';
import { Header } from './components/Header';
import { CardPage } from './components/CardPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<CardsPage />} />
          <Route path=":id" element={<CardPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
