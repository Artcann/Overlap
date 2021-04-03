
import { get } from './index';

export const me = async (jwt) => {
  return (await get('/user/me', {}, jwt)).body
}
