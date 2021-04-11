import { h } from 'preact';
import { useContext } from 'preact/hooks';
import style from'./style.css';

import { LanguageContext } from '../../translations';


const NotStarted = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <div class={style.endDay}>
      <h1>{translations.dayEnd.title}</h1>
      <h2>{translations.dayEnd.subtitle}</h2>
      <div class={style.socialMedias}>
        <a href="https://www.instagram.com/listebdeoverlap/"><img alt="Instagram" src="/assets/social-medias/logos/instagram.png" /></a>
        <a href="https://www.facebook.com/listebdeoverlap/"><img alt="Facebook" src="/assets/social-medias/logos/facebook.svg" /></a>
        <a href="https://discord.gg/gk4acy7C "><img alt="Discord" src="/assets/social-medias/logos/discord.svg" /></a>
      </div>
    </div>
  )
};

export default NotStarted;
