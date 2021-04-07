import { h } from 'preact';
import { useContext } from 'preact/hooks';
import style from'./style.css';

import { LanguageContext } from '../../translations';


const NotStarted = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <div class={style.endDay}>
      <h1>{translations.notStarted.title}</h1>
      <h2>{translations.notStarted.subtitle}</h2>
      <div class={style.socialMedias}>
        <a href="https://www.instagram.com/ponsaille/"><img alt="Instagram" src="/assets/social-medias/logos/instagram.png" /></a>
        <a href="https://www.facebook.com/arthur.cann.37"><img alt="Facebook" src="/assets/social-medias/logos/facebook.svg" /></a>
        <a href="#"><img alt="Discord" src="/assets/social-medias/logos/discord.svg" /></a>
      </div>
    </div>
  )
};

export default NotStarted;
