import {React, useEffect, useState, useRef} from "react";
import DefaultHeader from "../components/Header";
import AddGameModal from "../components/AddGameModal";
import { apiCall } from "../helpers/fetch_api";
import { useContextHook, Context } from '../helpers/context';
import GameCard from "../components/GameCard";

const HomePage = () => {
  const { getters, setters } = useContextHook(Context);
  const [gamesList, setGamesList] = useState([]);
  const gameCardList = useRef([])

  useEffect(() => {
    const ac = new AbortController();
    console.log("fetching games!")
    const fetchData = async () => {
      const data = await apiCall('data/get/tracked/games', 'GET', {});
      console.log(data);
      setters.setTrackedGames(data);
      for (const [gameTitle, gameDetail] of Object.entries(data)) {

        const resp = await apiCall('game/query/title', 'POST', {'gameTitle': gameTitle, 'gameDetail': gameDetail});
        console.log(resp);
        const gameCard = (
          <GameCard
            key={resp.id}
            id={resp.id}
            gameTitle={resp.name}
            gameThumbnail={resp.background_image}
            platformPref={gameDetail.platforms}
            physicalPref={gameDetail.physical}
            digitalPref={gameDetail.digital}
          />
        );
        let addFlag = true;
        for (const x of gameCardList.current) {
          if (x.key === gameCard.key) {
            addFlag = false;
          }
        }
        if (addFlag) {
          gameCardList.current.push(gameCard);
          console.log("pushed!")
        }
      }
      setGamesList(gameCardList);
    }
    if (getters.hasNewGame || gameCardList.current.length === 0) {
      fetchData()
      setters.setHasNewGame(false);
    }
    return () => ac.abort();
  }, [getters.hasNewGame])  
  
  return (
    <>
      <DefaultHeader>
      <div>
        <AddGameModal></AddGameModal>
      </div>
      </DefaultHeader>
      <div 
        style={{
          gap: '2.5rem',
          width: 'fit-content',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>{gamesList}
      </div>
    </>

  );
}

export default HomePage