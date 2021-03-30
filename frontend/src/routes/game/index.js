import { h } from 'preact';
import style from './style.css';

const Game = () => (
  <div class={style.game}>
    <div class={style.gameContainer}>
      <div class={style.menu}>
        <div class={style.profile}>
          <img alt="Picture of your character" src="/assets/profile_pics/square/jeremy.jpg" />
          {/* TODO: Add the overlay */}
        </div>
        <div class={style.menuText}>
          <span class={style.point}>1738 points</span>
          <a href="#">Menu</a>
        </div>
      </div>
      <img class={[style.joycon, style.joyconLeft].join(' ')} src="/assets/joycon-left.svg" alt="Nintendo Switch's Joycon" />
      <img class={[style.joycon, style.joyconRight].join(' ')} src="/assets/joycon-right.svg" alt="Nintendo Switch's Joycon" />
    </div>
  </div>
);

export default Game;
