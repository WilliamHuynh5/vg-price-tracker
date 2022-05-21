import {React, useEffect, useState} from "react";
import DefaultHeader from "../components/Header";
import AddGameModal from "../components/AddGameModal";
import { apiCall } from "../helpers/fetch_api";
import { useContextHook, Context } from '../helpers/context';
import GameCard from "../components/GameCard";

const HomePage = () => {
  const { getters, setters } = useContextHook(Context);
  const [gamesList, setGamesList] = useState([]);
  const gameCardList = []
  useEffect(() => {
    console.log("i fire once")
    const fetchData = async () => {
      const data = await apiCall('util/fetch', 'GET', {});
      try {
        setters.setTrackedGames(data)
        for (const [gameTitle, gameDetail] of Object.entries(data)) {
          const resp = await apiCall('game/query/title', 'POST', {'gameTitle': gameTitle, 'gameDetail': gameDetail})
          console.log(resp)
          const gameCard = (
            <GameCard
              id={resp.id}
              gameTitle={resp.name}
              gameThumbnail={resp.background_image}
              platformPref={gameDetail.platforms}
              physicalPref={gameDetail.physical}
              digitalPref={gameDetail.digital}
            />
          );
          gameCardList.push(gameCard);
        }
        setGamesList(gameCardList);
      }
      catch {
        setters.setTrackedGames({})
      }
    }
    fetchData()
  }, [])  
  


  
 

  return (
    <>
      <DefaultHeader>
      <div>
        <AddGameModal></AddGameModal>
      </div>
      </DefaultHeader>
      <div>{gamesList}</div>
    </>

  )
}

export default HomePage