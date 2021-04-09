import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { route, Link } from 'preact-router';
import style from'./style.css';

import { AuthContext } from '../../contexts/auth'
import { LanguageContext } from '../../translations';


const Menu = () => {
  const { clearAuth } = useContext(AuthContext);
  const { translations } = useContext(LanguageContext);

  const disconnect = () => {
    clearAuth()
    route("/")
  }

  return (
    <div class={style.gameAnswers}>
      <a class={style.gameButton} href="/game">{translations.menu.game}</a>
      <a class={style.gameButton} href="/game/ranking">{translations.menu.ranking}</a>
      {/*<a class={style.gameButton} href="#">{translations.menu.profil}</a>*/}
      <a class={style.gameButton} href="/game/terms">{translations.menu.terms}</a>
      <a class={style.gameButton} href="/game/terms">{translations.menu.data_management}</a>
      <button class={style.gameButton} onClick={disconnect}>{translations.menu.disconnect}</button>
    </div>
  )
};

export default Menu;
