import { get_data, set_data } from "../data/dataStore.js";
import * as EmailValidator from 'email-validator';
import { v4 as uuidv4 } from 'uuid';

export function auth_login(email, password) {
  const data = get_data();
    
  for (const user of data.users) {
    if (user.email == email && user.password == password) {
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
  const email_valid = EmailValidator.validate(email);
  
  if (email_valid == false) {
    return {error: "Error: Please enter a valid email!"}; 
  }
  
  if (password != confirmPassword) {
    return {error: "Error: Passwords do not match!"};
  }
  
  let u_id = -1;
  
  if (data.users[-1] === undefined) {
    u_id = 0;
  } else {
    u_id = data.users[-1].uId;
    u_id++;
  }

  
  const new_user = {
    uId: u_id,
    email: email,
    password: password,
    tracked_games: {}
  } 
  
  const token = uuidv4();
  const newSession = {token: token, uId: u_id};
  
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
