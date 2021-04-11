import { h } from 'preact';
import style from'./style.css';


const Credits = () => {
    return (
      <div class={style.credits} style="padding: 0 30px; width:100%; max-width: unset;" class={style.ranking}>
        <h1 style="color: #FF1E00">Crédits</h1>

        <h2 style="color: #0FCD25">L'équipe</h2>
          <b>Design :</b>&nbsp;
          <a style="color: white;" href="https://www.linkedin.com/in/ponsaille/" target={"_blank"} rel="noopener noreferrer">
            Jules Ponsaillé
          </a>&nbsp;
          sous la supervision de&nbsp;
          <a style="color: white;" href="https://www.linkedin.com/in/maellejumel/" target={"_blank"} rel="noopener noreferrer">
            Maëlle Jumel
          </a><br/>
          <b>Backend :</b>&nbsp;
          <a style="color: white;" href="https://www.linkedin.com/in/arthur-cann-7849711b4/" target={"_blank"} rel="noopener noreferrer">
            Arthur Cann
          </a><br/>
          <b>Front-end :</b>&nbsp;
          <a style="color: white;" href="https://www.linkedin.com/in/ponsaille/" target={"_blank"} rel="noopener noreferrer">
            Jules Ponsaillé
          </a><br/>
          <b>Création artistique :</b>&nbsp;
          <a style="color: white;" href="https://www.linkedin.com/in/maellejumel/" target={"_blank"} rel="noopener noreferrer">
            Maëlle Jumel
          </a> et Elie Attieh
          <br/><br/>

        <h2 style="color: #0FCD25">Ressources</h2>
        <ul>
          <li>
            <a style="color: white;" href="https://unsplash.com/@mansuuu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mansur Omar</a> on <a style="color: white;" href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </li>
          <li>
            <a style="color: white;" href="https://unsplash.com/@nseylubangi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nsey Benajah</a> on <a style="color: white;" href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </li>
          <li>
            <a style="color: white;" href="https://unsplash.com/@lusik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Marcin Lukasik</a> on <a style="color: white;" href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </li>
          <li>
            Icons made by <a style="color: white;" href="https://www.freepik.com" title="Freepik">Freepik</a> from <a style="color: white;" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          </li>
        </ul>
      
        <h2>Toute l'équipe espère que l'application vous plaira !</h2>
      </div>
    )
};

export default Credits;
