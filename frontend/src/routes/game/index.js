import { h } from 'preact';
import { Router, route } from 'preact-router';
import style from './style.css';
import Quiz from './quiz';

import { useContext } from 'preact/hooks';
import { AuthContext } from '../../contexts/auth';

const Game = () => {
  const { user } = useContext(AuthContext);
  
  const handleRoute = async _ => {
    /* TODO: trigger checking still connected */
    console.log(user)
    if (!user)
      route('/', true);
  }

  return (
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
        <div class={style.gameRoot}>
          <Router onChange={handleRoute}>
            <Quiz path="/game" />
          </Router>
        </div>
      </div>
    </div>
  );
}

export default Game;
