import { get, post } from './index';

export const login = async (email, password) => {
  return (await post('/auth/login', {email, password})).body
}
