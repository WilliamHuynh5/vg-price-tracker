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
        const data = await apiCall('user/get/games', 'GET', {}, getters.userToken.token);
        let skipFlag = false;
        let localData = [];
        if (getters.trackedGames.length === 0) {
          setters.setTrackedGames(data.trackedGames);
          localData = data.trackedGames;
          skipFlag = true;
        } else {
          localData = getters.trackedGames;
        }
        for (const game of localData) {
          const gameTitle = game.gameTitle;
          const platforms = game.platformPref;
          const physicalFlag = game.physicalPref;
          const digitalFlag = game.digitalPref;
          if (game['id'] !== undefined) {
            skipFlag = true;
          }
          let resp = game;
          if (skipFlag === false) {
            try {
              resp = await apiCall('game/query/title', 'POST', {'gameTitle': gameTitle, 'platforms': platforms});
              await apiCall("user/add/game", 'POST', {
                resp,
                platforms,
                physicalFlag,
                digitalFlag
              }, getters.userToken.token);
              const updatedGames = await apiCall('user/get/games', 'GET', {}, getters.userToken.token);
              setters.setTrackedGames(updatedGames.trackedGames);
            } catch {
              continue;
            }
          }
          let trackDetails = {};
          try {
            trackDetails = await apiCall('game/query/price', 'POST', {'gameTitle': resp.name}, getters.userToken.token);
          } catch {
          }


          const gameCard = (
            <GameCard
              key={resp.id}
              id={resp.id}
              gameTitle={resp.name}
              gameThumbnail={resp.background_image}
              platformPref={platforms}
              physicalPref={physicalFlag}
              digitalPref={digitalFlag}
              date={trackDetails.date}
              currPrice={trackDetails.currPrice}
              allTimeLow={trackDetails.lowestPrice}
              buyNow={trackDetails.buyNow}
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
          skipFlag = false;
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