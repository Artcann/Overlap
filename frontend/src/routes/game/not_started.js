import { h } from 'preact';
import { useContext } from 'preact/hooks';
import style from'./style.css';

import { LanguageContext } from '../../translations';


const Menu = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <div class={style.endDay}>
      <h1>{translations.dayEnd.title}</h1>
      <h2>{translations.dayEnd.subtitle}</h2>
      <div class={style.socialMedias}>
        <a href="#"><img alt="Instagram" src="/assets/social-medias/instagram.png" /></a>
        <a href="#"><img alt="Facebook" src="/assets/social-medias/facebook.svg" /></a>
        <a href="#"><img alt="Discord" src="/assets/social-medias/discord.svg" /></a>
      </div>
    </div>
  )
};

export default Menu;
