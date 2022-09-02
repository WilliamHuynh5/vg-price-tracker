import './App.css';
import { React, useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Context } from './helpers/context';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const [trackedGames, setTrackedGames] = useState([]);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [hasNewGame, setHasNewGame] = useState(false);
  const [userToken, setUserToken] = useState(undefined);

  const getters = {
    userToken,
    trackedGames,
    hasNewGame,
    displayedGames
  };
  const setters = {
    setUserToken,
    setTrackedGames,
    setHasNewGame,
    setDisplayedGames
  };
  useEffect(() => {
    const location = window.location.href;
    if (!getters.userToken && !location.includes('auth')) {
      window.location.href = '/auth/login';
    }
  }, [getters.userToken]);
  return (
    <Context.Provider
    value={{ getters, setters }}
    >
      <BrowserRouter>
        <Routes>
            <Route
              path="*"
              element={<Navigate to={'/auth/login'} replace />}
            ></Route>
            <Route path="/auth/login" element={<LoginPage />}></Route>
            <Route path="/auth/register" element={<RegisterPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App;
