import { apiKey, ps5, ps4, nSwitch, p_ps, p_sw } from "../server/config.js";
import fetch from "node-fetch";

export function query_game_title(title, platforms) {
  let pPlatforms = '';
  let qPlatforms = '';
  if (platforms.includes('ps5')){
    qPlatforms += (ps5 + ',')
    pPlatforms += (p_ps + ',')
  } else if (platforms.includes('ps4')){
    qPlatforms += (ps4 + ',')
    pPlatforms += (p_ps + ',')
  }
  if (platforms.includes('switch')){
    qPlatforms += (nSwitch + ',')
    pPlatforms += (p_sw + ',')
  }

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  
  console.log(pPlatforms);
  
  let res = fetch('https://api.rawg.io/api/games?search=' + title + '&search_precise=true' + 
  '&parent_platforms=' + pPlatforms + 
  // '&platforms=' + qPlatforms + 
  '&key=' + apiKey, options)
  .then(resp => resp.json())
  .then(({results}) => {
    return (results[0])
  })
  return res;
}
