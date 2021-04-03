import { h } from 'preact';
import { Router, route } from 'preact-router';
import Match from 'preact-router/match';
import style from './style.css';
import Quiz from './quiz';
import Menu from './menu';
import Ranking from './Ranking';

import { useContext } from 'preact/hooks';
import { AuthContext } from '../../contexts/auth';
import { LanguageContext } from '../../translations';

const Game = () => {
  const { isLoading, initializing, user, userInfo, isTokenValid, clearAuth } = useContext(AuthContext);
  const { translations } = useContext(LanguageContext);
  
  const handleRoute = async _ => {
    if (!isTokenValid()) {
      console.log(isLoading)
      console.log(initializing)
      console.log('hey')
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
            <Match path="/game/menu">
              { ({ matches }) => matches ? 
                <a href="javascript:history.back()">X</a>
                :
                <a href="/game/menu">Menu</a>
              }
            </Match>
          </div>
        </div>
        <img class={[style.joycon, style.joyconLeft].join(' ')} src="/assets/joycon-left.svg" alt="Nintendo Switch's Joycon" />
        <img class={[style.joycon, style.joyconRight].join(' ')} src="/assets/joycon-right.svg" alt="Nintendo Switch's Joycon" />
        <div class={style.gameRoot}>
        { (isLoading || initializing) ?
          <h1>{translations.connection.initializing}</h1>
          :
          (<Router onChange={handleRoute}>
            <Menu path="/game/menu" />
            <Ranking path="/game/ranking" />
            <Quiz path="/game" />
          </Router>)
        }
        </div>
      </div>
    </div>
  );
}

export default Game;
