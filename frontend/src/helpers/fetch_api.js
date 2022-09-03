/**
 * @param path - the path to the API backend NOT INCLUDING '/' 
 * @param method - the type of request get, delete, post, put
 * @param body - the JSON arguments being passed in
 * @returns the response from the backend as a JSON object
 * @usage
 */
export const apiCall = async (path, method, body, token) => {
  console.log(body)
  const init = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: method === 'GET' ? undefined : JSON.stringify(body),
  };
  try {
    const response = await fetchWithTimeout(`/${path}`, init);
    return response.json();
  } catch (err) {
    console.log(err);
    console.log("error here!")
  }
};

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);
  return response;
}