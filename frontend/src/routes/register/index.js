import { h } from 'preact';
import style from './style.css';

const characters = [];

for (let i = 0; i < 20; i++) {
  characters.push({
    name: "Jérémy",
    image: "/assets/profile_pics/square/jeremy.jpg"
  })
}

const Register = () => (
  <div class={style.register}>
    <div class={style.container}>
      <div class={style.decoration}>
				{/* TODO: redo grid system in js */}	
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
      <div class={style.formular}>
      </div>
    </div>
  </div>
);

export default Register;
