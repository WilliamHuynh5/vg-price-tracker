import * as EmailValidator from 'email-validator';
import { get_data, set_data } from "../data/dataStore.js";

export function registerValidityCheck(email, password, confirmPassword) {  

  if (EmailValidator.validate(email) === false) {
    return {error: "Error: Please enter a valid email!"}; 
  }
  
  if (password != confirmPassword) {
    return {error: "Error: Passwords do not match!"};
  }
  
  if (isDuplicateEmail === true) {
    return  {error: "Error: Email already taken!"}
  }
  
  return {};

}

export function isDuplicateEmail(email) {
  const data = get_data();
  console.log(email);
  for (const user of data.users) {
    if (user.email === email) {
      return true;
    }
  }
  return false;
}

export function getNextUID() {
  const data = get_data();
  let u_id = -1;
  
  if (data.users[data.users.length - 1] === undefined) {
    u_id = 0;
  } else {
    u_id = data.users[data.users.length - 1].uId;
    u_id++;
  }
  
  return u_id;
}
