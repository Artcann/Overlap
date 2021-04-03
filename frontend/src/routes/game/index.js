import { h } from 'preact';
import { Router, route } from 'preact-router';
import style from './style.css';
import Quiz from './quiz';

import { useContext } from 'preact/hooks';
import { AuthContext } from '../../contexts/auth';
import { LanguageContext } from '../../translations';

const Game = () => {
  const { initializing, user, userInfo, isTokenValid, clearAuth } = useContext(AuthContext);
  const { translations } = useContext(LanguageContext);
  
  const handleRoute = async _ => {
    /* TODO: trigger checking still connected */
    if (!isTokenValid()) {
      clearAuth()
      route('/')
      return;
    }

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
            {userInfo && <span class={style.point}>{userInfo.score} points</span>}
            <a href="#">Menu</a>
          </div>
        </div>
        <img class={[style.joycon, style.joyconLeft].join(' ')} src="/assets/joycon-left.svg" alt="Nintendo Switch's Joycon" />
        <img class={[style.joycon, style.joyconRight].join(' ')} src="/assets/joycon-right.svg" alt="Nintendo Switch's Joycon" />
        <div class={style.gameRoot}>
        { initializing ?
          <h1>{translations.connection.initializing}</h1>
          :
          (<Router onChange={handleRoute}>
            <Quiz path="/game" />
          </Router>)
        }
        </div>
      </div>
    </div>
  );
}

export default Game;
