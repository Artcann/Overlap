import { h } from 'preact';
import style from './style.css';

import charactersJSON from '../../characters.json';
const characters = [...charactersJSON, ...charactersJSON]


const Decoration = ({ isReveal }) => {
  const decorationClass =
    isReveal ?
    [style.decoration, style.revealSide].join(' '):
    style.decoration;

  return (
    <div class={decorationClass}>
      {isReveal ?
        <h2 class={style.revealMsg}>
          Check tes mails pour valider ton inscription !
        </h2>
        :
        <div class={style.picturesGrid}>
          {characters.map(character =>
            (
              <figure>
                <img alt={character.name} src={`/assets/profile_pics/square/${character.identifier}.jpg`} />
              </figure>
            )
          )}
        </div>
      }
    </div>
  )
}

export default Decoration;
