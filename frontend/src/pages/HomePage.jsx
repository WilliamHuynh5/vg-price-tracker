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
        // console.log(getters.userToken);
        const data = await apiCall('user/get/games', 'GET', {}, getters.userToken.token);
        // console.log(data);
        // if ("error" in data) {
        //   setters.setHasNewGame(false);
        //   setIsLoading(false);
        //   return () => ac.abort();
        // }
        // console.log(getters.trackedGames);
        if (getters.trackedGames.length === 0) {
          setters.setTrackedGames(data.trackedGames);
        }
        
        for (const game of getters.trackedGames) {
          console.log(game);
          const gameTitle = game.gameTitle;
          const platforms = game.platforms;
          const physicalFlag = game.physical;
          const digitalFlag = game.digital;
          console.log(gameTitle);
          console.log(platforms);
          console.log("starting!")
          let resp = {};
          try {
            resp = await apiCall('game/query/title', 'POST', {'gameTitle': gameTitle, 'gameDetail': platforms});
          } catch {
            continue;
          }
          await apiCall("user/add/game", 'POST', {
            resp,
            platforms,
            physicalFlag,
            digitalFlag
          }, getters.userToken.token);
          const gameCard = (
            <GameCard
              key={resp.id}
              id={resp.id}
              gameTitle={resp.name}
              gameThumbnail={resp.background_image}
              platformPref={platforms}
              physicalPref={physicalFlag}
              digitalPref={digitalFlag}
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