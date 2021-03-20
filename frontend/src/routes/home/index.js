import { h } from 'preact';
import style from './style.css';

const characters = [];

for (let i = 0; i < 14; i++) {
  characters.push({
    name: "Jérémy",
    image: "/assets/profile_pics/vertical/jeremy.jpg"
  })
}

const Home = () => (
	<div class={style.home}>
    <div class={style.container}>
      <div class={style.profilePics}>
        {characters.map(
          (character, index) => {
            if (index < 7) {
              return (
                <img alt={character.name} src={character.image} />
              )
            }
          })
        }
      </div>
      <div class={style.cta}>
        <img class={style.logo} alt="Super Overlap Quiz" src="/assets/super_overlap.svg" />
      </div>
      <div class={style.profilePics}>
        {characters.map(
          (character, index) => {
            if (index >= 7) {
              return (
                <img alt={character.name} src={character.image} />
              )
            }
          })
        }
      </div>
    </div>
    <img
      alt="Background: legs entering in a portal"
      src="/assets/portal-left.svg"
      class={[style.portal, style.portalLeft].join(' ')}
    />
    <img
      alt="Background: helf body comming out a portal"
      src="/assets/portal-right.svg"
      class={[style.portal, style.portalRight].join(' ')}
    />
	</div>
);

export default Home;
