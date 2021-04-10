import { h } from 'preact';
import style from './style.css';

import { useContext } from 'preact/hooks';
import { LanguageContext } from '../../translations';

import charactersJSON from '../../characters.json';
const characters = [...charactersJSON, ...charactersJSON]


const Decoration = ({ isReveal }) => {
  const { translations } = useContext(LanguageContext);

  const decorationClass =
    isReveal ?
    [style.decoration, style.revealSide].join(' '):
    style.decoration;

  return (
    <div class={decorationClass}>
      {isReveal ?
        <h2 class={style.revealMsg}>
          {translations.userInfos.emailCheckMessage}
        </h2>
        :
        <div class={style.picturesGrid}>
          {characters.map(character =>
            (
              <figure>
                <img alt={character.name} src={`/assets/profile_pics/square_names/${character.identifier}.jpg`} />
              </figure>
            )
          )}
        </div>
      }
    </div>
  )
}

export default Decoration;
