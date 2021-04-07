import { useState, useEffect } from 'preact/hooks';
import config from '../../config';

const url = config.domains.api

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

  let response, json;
  try {
    response = await fetch(url + path, options);
    json = await response.json();
  } catch (e) {
    throw {
      success: false,
      errorFrom: 'browser',
      error: e
    }
  }

  if (response.status != 200) {
    throw {
      success: false,
      errorFrom: 'server',
      body: json
    }
  }

  return {
    success: true,
    body: json
  }
}

export default api;

export const get = async (path, config={}, jwt=null) => {
  const options = {
    method: 'GET',
    ...config
  }

  return await api(path, options, jwt);
}

export const post = async (path, body, config={}, jwt=null) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    ...config
  }

  return await api(path, options, jwt)
}

export const useApi = (action, args=[]) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        setResult(await action(...args))
      } catch (e) {
        setError(e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return [result, error, isLoading]
}
