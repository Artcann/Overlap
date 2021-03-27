import { h } from 'preact';
import style from './style.css';
import Formular from './formular';

//import { useContext } from 'preact/hooks';
//import { LanguageContext } from '../../translations';

const characters = [];

for (let i = 0; i < 20; i++) {
  characters.push({
    name: "Jérémy",
    image: "/assets/profile_pics/square/jeremy.jpg"
  })
}

const Register = () => {
  //const { language, translations } = useContext(LanguageContext);

  return (
    <div class={style.register}>
      <div class={style.container}>
        <div class={style.decoration}>
            <div class={style.picturesGrid}>
              {characters.map(character =>
                (
                  <figure>
                    <img alt={character.name} src={character.image} />
                  </figure>
                )
              )}
            </div>
          <img class={style.overlapTextImage} src="/assets/overlap-text.svg" />
        </div>
        <Formular />
      </div>
    </div>
  );
}


export default Register;
