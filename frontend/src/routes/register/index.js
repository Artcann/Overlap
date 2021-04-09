import { h } from 'preact';
import style from './style.css';
import Formular from './formular';
import Decoration from './decoration';
import Match from 'preact-router/match';

import { useContext, useState } from 'preact/hooks';
import { LanguageContext } from '../../translations';

const Register = () => {
  const { language, translations } = useContext(LanguageContext);

  const [character, setCharacter] = useState(null);

  return (
    <Match path="/start/reveal">
      {
        ({ matches }) => {
          if(!matches) {
            return (
              <div class={style.register}>
                <div class={style.container}>
                  <Formular setCharacter={setCharacter} />
                  <Decoration isReveal={matches} />
                </div>
              </div>
            );
          }
          
          if (character)
            return (
              <div class={[style.register, style.reveal].join(' ')}>
                <div class={[style.container, style.reveal].join(' ')}>
                  <div class={[style.content, style.reveal].join(' ')}>
                    <div class={style.revealImagesContainer}>
                      <img class={style.revealImage} alt={character.name} src={`/assets/profile_pics/square/${character.identifier}.jpg`} />
                    </div>
                    <h1>{character.name}</h1>
                    <div class={style.square}>
                    <img class={style.ready} alt='Ready to fight' src='/assets/ready-to-fight.png' />
                    </div>
                    <div class={style.revealText}>
                      <p>{character.description[language]}</p>
                      <h2>{translations.userInfos.emailCheckMessage}</h2>
                    </div>
                  </div>
                  <Decoration isReveal={matches} />
                </div>
              </div>
            );
        }
      }
    </Match>
  );
}


export default Register;
