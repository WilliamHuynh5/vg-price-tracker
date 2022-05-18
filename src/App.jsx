import './App.css';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import { Context } from './helpers/context';



function App() {
  const [trackedGames, setTrackedGames] = useState({});

  const getters = {
    trackedGames
  };
  const setters = {
    setTrackedGames
  };

  return (
    <Context.Provider
    value={{ getters, setters }}
    >
      <HomePage></HomePage>
    </Context.Provider>
  )
}

export default App;
