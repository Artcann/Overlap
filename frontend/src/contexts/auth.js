import { createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { login as apiLogin } from '../api/auth';
import { me } from '../api/user';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const login = async (email, password, redirect=undefined) => {
    if (!isLoading) {
      setIsLoading(true)
      try {
        const user = await apiLogin(email, password)
        setUser(user)
        localStorage.setItem('user.token', user.token)
        localStorage.setItem('user.userId', user.userId)
        // Get the user infos
        await getUserInfo(user.token)
        // Redirect
        if (redirect)
          route(redirect)
      } catch (e) {
        setError(e)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const getUserInfo = async (jwt) => {
    if (!isLoading && !userInfo) {
      setIsLoading(true)
      try {
        const ui = await me(jwt)
        setUserInfo(ui)
        return ui
      } catch (e) {
        console.log(e)
        setError(e)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const isTokenValid = (ui=null) => {
    if (!ui) ui = userInfo
    if (!ui) return false

    return (ui.tokenExp - 60*60)*1000 > Date.now()
  }

  const clearAuth = () => {
    setUser(null);
    setUserInfo(null);
    
    localStorage.removeItem('user.token')
    localStorage.removeItem('user.userId')
  }

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('user.token') && localStorage.getItem('user.userId')) {
        // Check if token is valid for the next hour
        const ui = await getUserInfo(localStorage.getItem('user.token'))

        if (isTokenValid(ui)) {
          setUser({
            token: localStorage.getItem('user.token'),
            userId: localStorage.getItem('user.userId')
          })
        } else {
          clearAuth()
        }
        setError(null) // Reset error state
      }
      setInitializing(false);
    })()
  }, [])

  return (
    <AuthContext.Provider value={{ user, error, isLoading, initializing, userInfo, isTokenValid, clearAuth, login }}>
      { children }
    </AuthContext.Provider>
  )
}
