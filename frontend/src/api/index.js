// TODO: edit check prod or dev
const url = "http://localhost:3000/api"

const api = async (path, config={}, jwt=null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': jwt ? `Bearer ${jwt}` : undefined
  }

  const options = {
    mode: 'cors',
    headers,
    ...config
  }

  try {
    const response = await fetch(url + path, options);
    const json = await response.json();

    if (response.status != 200) {
      return {
        success: false,
        errorFrom: 'server',
        body: json
      }
    }

    return {
      success: true,
      body: json
    }
  } catch (e) {
    return {
      success: false,
      errorFrom: 'browser',
      error: e
    }
  }
}

export const get = (path, config={}, jwt=null) => {
  const options = {
    method: 'GET',
    ...config
  }

  return api(path, options, jwt);
}

export const post = (path, body, config={}, jwt=null) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(body)
  }

  return api(path, options, jwt)
}

export default api;
