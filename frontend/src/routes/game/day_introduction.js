import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import style from'./style.css';

import { LanguageContext } from '../../translations';


const DayIntroduction = ({ day }) => {
  const { translations } = useContext(LanguageContext);

  if (day && day.theme == "notStarted")
    route('/game/not_started')
  
  if (day)
    return (
      <>
        <h1>{translations.dayIntroduction.theme[day.theme]}</h1>
        <a
          class={style.gameButton}
          style={{maxWidth: '230px'}}
          href="/game/quiz"
        >
          {translations.dayIntroduction.button}
        </a>
      </>
    )

  return
};

export default DayIntroduction;
