import { h } from 'preact';
import style from'./style.css';

const Quiz = () => (
  <>
    <div class={style.gameQuestion}>
      <h1>Question</h1>
      <img class={style.gameScreen} src="https://1uyxqn3lzdsa2ytyzj1asxmmmpt-wpengine.netdna-ssl.com/wp-content/uploads/2020/03/Lot-189-Keith-Haring-Retrospect-1-768x426.jpg" />
    </div>
    <div class={style.gameAnswers}>
      <button class={[style.gameButton, style.valid].join(' ')}>Keith Haring</button>
      <button class={style.gameButton}>Keith Haring</button>
      <button class={[style.gameButton, style.invalid].join(' ')}>Keith Haring</button>
      <button class={style.gameButton}>Keith Haring</button>
    </div>
  </>
);

export default Quiz;
