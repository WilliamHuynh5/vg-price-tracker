import { get_data, set_data } from "../data/dataStore.js";

export function addGame(token, gameObj, platforms, physicalFlag, digitalFlag) {
  const data = get_data();

  let uId = -1;
  
  for (const session of data.sessions) {
    if (session.token === token) {
      uId = session.uId;
    }
  }

  if (uId === -1) {
    return {error: "error"};
  }
  
  const newGameObj = {
    id: gameObj.id,
    name: gameObj.name,
    background_image: gameObj.background_image,
    platformPref: platforms,
    physicalPref: physicalFlag,
    digitalPref: digitalFlag
  }
  
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].uId === uId) {
      if (!data.users[i].tracked_games.filter(e => e.id ===  gameObj.id).length > 0) {
        data.users[i].tracked_games.push(newGameObj);
      }
    }
  }
  
  set_data(data);
  
  return {};
  
}

export function getGames (token) {
  const data = get_data();
  // get token from user
  let uId = -1;
  
  for (const session of data.sessions) {
    if (session.token === token) {
      uId = session.uId;
    }
  }

  let trackedGames = [];
  if (uId === -1) {
    return {error: "error"};
  }
  for (const user of data.users) {
    if (user.uId == uId) {
      trackedGames = user.tracked_games;
      return {trackedGames: trackedGames};
    }
  }
  
  set_data(data);
  
  return {};
}

export function removeGame(token, gameId) {
  const data = get_data();
  // get token from user
  let uId = -1;
  
  for (const session of data.sessions) {
    if (session.token === token) {
      uId = session.uId;
    }
  }
  if (uId === -1) {
    return {error: "failed to delete"};
  }
  let elemToRemove = -1;
  let userIndex = -1;
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].uId === uId) {
      userIndex = i;
      for (let j = 0; j < data.users[i].tracked_games.length; j++) {
        if (data.users[i].tracked_games[j].id === gameId) {
          elemToRemove = j;
          i = data.users.length;
          break;
        }
      }
    }
  }
  data.users[userIndex].tracked_games.splice(elemToRemove, 1);
  set_data(data);
  return {};
}