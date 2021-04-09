import { h } from 'preact';
import style from './style.css';
import Formular from './formular';
import Decoration from './decoration';
import Match from 'preact-router/match';

import { useContext, useState } from 'preact/hooks';
import { LanguageContext } from '../../translations';

const Register = () => {
  const { language, translations } = useContext(LanguageContext);

  //const [character, setCharacter] = useState(null);
  let setCharacter = undefined
  let character = {
    identifier: 'marjorie',
    description: {
      fr: 'Ses convictions lui ont fait tirer un trait sur le saucisson mais heureusement pour elle, il n’y a pas de viande dans la bière. 😎 Vous l’aurez compris, Marjorie aime les soirées (surtout si elles sont arrosées). Partie à l’autre bout du globe pour découvrir de nouvelles traditions (ne vous méprenez pas, on ne parle pas de musées 🥳), elle reste néanmoins fidèle à sa liste même si cela implique des réunions à 5h du matin. 😳'
    },
    name: 'Marjorie'
  }

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
                    <img class={style.revealImage} alt={character.name} src={`/assets/profile_pics/square/${character.identifier}.jpg`} />
                    <h1>{character.name}</h1>
                    <div class={style.square}></div>
                    <div class={style.revealText}>
                      <img class={style.ready} alt='Ready to fight' src='/assets/ready-to-fight.png' />
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
