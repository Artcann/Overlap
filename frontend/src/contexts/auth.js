import { createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { login as apiLogin } from '../api/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password, redirect=undefined) => {
    if (!isLoading) {
      setIsLoading(true)
      try {
        const user = await apiLogin(email, password)
        setUser(user)
        localStorage.setItem('user.token', user.token)
        localStorage.setItem('user.userId', user.userId)
        if (redirect)
          route(redirect)
      } catch (e) {
        setError(e)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    /* TODO: check validity */
    if (localStorage.getItem('user.token') && localStorage.getItem('user.userId')) {
      setUser({
        token: localStorage.getItem('user.token'),
        userId: localStorage.getItem('user.userId')
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, error, isLoading, login }}>
      { children }
    </AuthContext.Provider>
  )
}
