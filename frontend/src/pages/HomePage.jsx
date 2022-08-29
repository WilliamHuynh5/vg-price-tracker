import {React, useEffect, useState, useRef} from "react";
import DefaultHeader from "../components/Header";
import AddGameModal from "../components/AddGameModal";
import { apiCall } from "../helpers/fetch_api";
import { useContextHook, Context } from '../helpers/context';
import GameCard from "../components/GameCard";
import LoadingSpinner from "../components/LoadingSpinner";
import BtnLogOut from '../components/LogOutButton';


const HomePage = () => {
  const { getters, setters } = useContextHook(Context);
  const [gamesList, setGamesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const gameCardList = [];
  
  useEffect(() => {
    const ac = new AbortController();
    // If there is a new quiz, we want to render it
    if (getters.hasNewGame || gamesList.length === 0) {
      (async () => {
        setIsLoading(true);
        const data = await apiCall('user/get/games', 'GET', getters.userToken);
        if ("error" in data) {
          setters.setHasNewGame(false);
          setIsLoading(false);
          return () => ac.abort();
        }
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
          for (const x of gameCardList) {
            if (x.key === gameCard.key) {
              addFlag = false;
            }
          }
          if (addFlag) {
            gameCardList.push(gameCard);
          }
        }
        setGamesList(gameCardList);
        setters.setHasNewGame(false);
        setIsLoading(false);
      })();
    }
    
    return () => ac.abort();
  }, [getters.hasNewGame]);
    
  const gameCardsRender = (
    <div 
    style={{
      gap: '2.5rem',
      width: 'fit-content',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }}>{gamesList}
    </div>
  )
  return (
    <>
      <DefaultHeader>
      
        <div>
          <AddGameModal></AddGameModal>
          <BtnLogOut /> 
        </div>
      
      </DefaultHeader>
      {isLoading ? <LoadingSpinner /> : gameCardsRender}


    </>

  );
};

export default HomePage