import { h } from 'preact';
import style from './style.css';
import Formular from './formular';
import Decoration from './decoration';
import Match from 'preact-router/match';

//import { useContext } from 'preact/hooks';
//import { LanguageContext } from '../../translations';

const Register = () => {
  //const { language, translations } = useContext(LanguageContext);

  return (
    <Match path="/start/reveal">
      {
        ({ matches }) => {
          if(!matches) {
            return (
              <div class={style.register}>
                <div class={style.container}>
                  <Formular />
                  <Decoration isReveal={matches} />
                </div>
              </div>
            );
          }
          console.log(style.reveal)
          return (
            <div class={[style.register, style.reveal].join(' ')}>
              <div class={[style.container, style.reveal].join(' ')}>
                <div class={[style.content, style.reveal].join(' ')}>
                  <img class={style.revealImage} alt='Jérémy' src='/assets/profile_pics/vertical/jeremy.jpg' />
                  <h1>Jérémy</h1>
                  <img class={style.ready} alt='Ready to fight' src='/assets/ready-to-fight.png' />
                  <div class={style.revealText}>
                    <p>{"Jérémy cest notre respo com'. Si tu t'aventure dans une conversation avec lui, fait attention à toi. À coup de #hashtags il serait cable de tout te vendre (des tapis fluorescents une tondeuse à parquet ou plus difficile encore: l'autre liste)."}</p>
                    <h2>Check tes mails pour valider ton inscription</h2>
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
