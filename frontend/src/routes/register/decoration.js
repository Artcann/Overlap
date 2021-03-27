import { h } from 'preact';
import style from './style.css';

const characters = [];

for (let i = 0; i < 20; i++) {
  characters.push({
    name: "Jérémy",
    image: "/assets/profile_pics/square/jeremy.jpg"
  })
}

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
        </h2> :
        <div class={style.picturesGrid}>
          {characters.map(character =>
            (
              <figure>
                <img alt={character.name} src={character.image} />
              </figure>
            )
          )}
        </div>
      }
      <img class={style.overlapTextImage} src="/assets/overlap-text.svg" />
    </div>
  )
}

export default Decoration;
