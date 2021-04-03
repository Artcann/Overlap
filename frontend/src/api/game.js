import { get } from './index';

export const ranking = async (jwt) => {
  return (await get('/game/ranking', {}, jwt)).body
}

export const day = async () => {
  return (await get('/game/day')).body
}
