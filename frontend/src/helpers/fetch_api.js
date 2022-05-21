/**
 * @param path - the path to the API backend NOT INCLUDING '/' 
 * @param method - the type of request get, delete, post, put
 * @param body - the JSON arguments being passed in
 * @returns the response from the backend as a JSON object
 * @usage
 */
export const apiCall = async (path, method, body, token) => {
  const init = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      // We want the user token only for the routes containing logout, quiz
      // or session. In every other case, we don't need any token.
      // Authorization: `Bearer ${token ? token.token : undefined}`,
    },
    body: method === 'GET' ? undefined : JSON.stringify(body),
  };
  try {
    const response = await fetch(`http://localhost:5001/${path}`, init);
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
