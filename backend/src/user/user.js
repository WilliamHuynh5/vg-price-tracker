import { get_data, set_data } from "../data/dataStore.js";

export function addGames (token, trackedGames) {
  const data = get_data();
  
  // get token from user
  let uId = -1;
  
  for (const session of data.sessions) {
    if (session.token === token) {
      uId = session.uId;
    }
  }

  if (uId === -1) {
    return {error: "error"};
  }
  
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].uId === uId) {
      data.users[i].tracked_games = trackedGames;
      break;
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

  if (uId === -1) {
    return {error: "error"};
  }
  let trackedGames = {};
  for (const user of data.users) {
    if (user.uId == uId) {
      trackedGames = user.tracked_games;
      return trackedGames;
    }
  }
  
  set_data(data);
  
  return {};
}