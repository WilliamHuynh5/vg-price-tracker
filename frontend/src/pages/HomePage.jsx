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
    console.log("fetching games!")
    const fetchData = async () => {
      const data = await apiCall('data/get/tracked/games', 'GET', {});
      //try {
        console.log(data);
        setters.setTrackedGames(data);
        for (const [gameTitle, gameDetail] of Object.entries(data)) {
          // if (gameTitle in getters.trackedGames){
          //   console.log("skipping " + gameTitle);
          //   continue
          // }
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
          // const displayedGames = getters.displayedGames;
          if (!gameCardList.current.includes(gameCard)) {
            gameCardList.current.push(gameCard);
            console.log("pushed!")
            // displayedGames.push
          }
          
        }
        setGamesList(gameCardList);
      //}
      // catch {
      //   console.log("fail!")
      //   setters.setTrackedGames({})
      // }
    }
    fetchData()
    setters.setHasNewGame(false);
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
        }}>{gamesList.current}
      </div>
    </>

  )
}

export default HomePage