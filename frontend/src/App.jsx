import './App.css';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import { Context } from './helpers/context';



function App() {
  const [trackedGames, setTrackedGames] = useState({});
  const [displayedGames, setDisplayedGames] = useState([]);
  const [hasNewGame, setHasNewGame] = useState(false);

  const getters = {
    trackedGames,
    hasNewGame,
    displayedGames
  };
  const setters = {
    setTrackedGames,
    setHasNewGame,
    setDisplayedGames
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
