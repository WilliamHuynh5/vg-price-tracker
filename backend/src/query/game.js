import { apiKey, ps5, ps4, nSwitch, p_ps, p_sw } from "../server/config.js";
import fetch from "node-fetch";

export function query_game_title(title, details) {
  let qPlatforms = ''
  let pPlatforms = ''
  
  if (details.platforms.includes('ps5') || details.platforms.includes('ps4')){
    qPlatforms += (ps5 + ',')
    pPlatforms += p_ps
  } else if (details.platforms.includes('ps4')){
    qPlatforms += (ps4 + ',')
    pPlatforms += p_ps
  }
  if (details.platforms.includes('switch')){
    qPlatforms += (nSwitch + ',')
    pPlatforms += p_sw
  }

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  
  let res = fetch('https://api.rawg.io/api/games?search=' + title + '&search_precise=true' + 
  '&parent_platforms=' + pPlatforms + 
  // '&platforms=' + qPlatforms + 
  '&key=' + apiKey, options)
  .then(resp => resp.json())
  .then(({results}) => {
    // console.log(results[0].name);
    return (results[0])
  })

  return res;
}