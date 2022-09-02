import { apiKey, ps5, ps4, nSwitch, p_ps, p_sw } from "../server/config.js";
import fetch from "node-fetch";
import DomParser from "dom-parser";
import { get_data, set_data } from "../data/dataStore.js";

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

export async function query_game_track(gameTitle, platforms, digFlag, physFlag) {  
  const data = get_data();
  const searchTerm = gameTitle.toLowerCase().replace(' ', '+');
  const gameObj = [];
  const url = "https://gamedeals.com.au/search.php?search=" + searchTerm + '&' + 'platform=' + platforms;
  let res = fetch(url).then(function (response) {
    return response.text();
  }).then(function (html) {
    let parser = new DomParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = doc.getElementsByTagName('a');
    gameObj[gameTitle] = [];
    for (const x of links) {
      const attributes = x.attributes;
      
      if (attributes[0].name !== 'data' || attributes[1].value === 'mightyape.com.au') {
        continue;
      } else if (digFlag === true && physFlag === false) {
        if (attributes[1].value !== 'store.playstation.au') {
          continue;
        }
      } else if (digFlag === false && physFlag === true) {
        if (attributes[1].value === 'store.playstation.au') {
          continue;
        }
      }
      
      const store = attributes[1].value;
      const currPrice = attributes[2].value;
      const lowestPrice = attributes[3].value;
      const buyNow = attributes[5].value;
      const name = attributes[7].value;
      const date = new Date().toLocaleString();
      const prodObj = {date: date, name: name, store : store, currPrice: currPrice, lowestPrice:lowestPrice, buyNow: buyNow};
      gameObj.push(prodObj);
    }
    data.games[gameTitle] = gameObj;
    set_data(data);
    return gameObj;
  });
  
  return res;
  
}

export function query_game_price(gameTitle) {
  const data = get_data();
  if (data.games[gameTitle] !== undefined) {
    return data.games[gameTitle][0];
  }
  return {error: "error"};
}