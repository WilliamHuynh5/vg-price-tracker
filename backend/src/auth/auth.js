import { get_data, set_data } from "../data/dataStore.js";
import { registerValidityCheck, getNextUID } from "./auth_helper.js";
import { v4 as uuidv4 } from 'uuid';
import { generate, verify } from "password-hash";

export function auth_login(email, password) {
  const data = get_data();
    
  for (const user of data.users) {
    if (user.email === email && verify(password, user.password) === true) {
      const token = uuidv4();
      const newSession = {token: token, uId: user.uId};
      
      data.sessions.push(newSession);
      set_data(data);
      
      return {token: token};
    }
  }
  return {error: "Error: Invalid Login!"}
}

export function auth_register(email, password, confirmPassword) {
  const data = get_data();
  
  const validityResponse = registerValidityCheck(email, password, confirmPassword)
  if ('error' in validityResponse) {
    return validityResponse;
  }
  
  const uId = getNextUID();

  const new_user = {
    uId: uId,
    email: email,
    password: generate(password),
    tracked_games: []
  } 
  
  const token = uuidv4();
  const newSession = {token: token, uId: uId};
  
  data.users.push(new_user);
  data.sessions.push(newSession);
  set_data(data);
    
  return {token: token};
}

export function auth_logout(token) {
  const data = get_data();
  let indexToRemove = -1;
  for (let i = 0; i < data.sessions.length; i++) {
    if (data.sessions[i].token === token) {
      indexToRemove = data.sessions[i].token;
      break;
    }
  }
  
  if (indexToRemove === -1) {
    return {error: "error"};
  } else {
    data.sessions.splice(indexToRemove);
    set_data(data);
    return {};
  }
  
}
