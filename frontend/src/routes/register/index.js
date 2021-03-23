import { h } from 'preact';
import style from './style.css';
import TextInput from '../../components/register/text-input';
import Splitter from '../../components/register/splitter';
import Question from '../../components/register/question';

const characters = [];

for (let i = 0; i < 20; i++) {
  characters.push({
    name: "Jérémy",
    image: "/assets/profile_pics/square/jeremy.jpg"
  })
}

const questions = [];

for (let i = 0; i < 10; i++) {
  questions.push({
    title: "Toi t'es",
    answers: [
      "Link (toujours là pour casser les pots)",
      "Zelda (j'prèfere attendre tranquille)",
      "Mario (j'mange des champi <3)",
      "Luigi (la roue de secours)"
    ]
  })
}

const Register = () => (
  <div class={style.register}>
    <div class={style.container}>
      <div class={style.decoration}>
          <div class={style.picturesGrid}>
            {characters.map(character =>
              (
                <figure>
                  <img alt={character.name} src={character.image} />
                </figure>
              )
            )}
          </div>
        <img class={style.overlapTextImage} src="/assets/overlap-text.svg" />
      </div>
      <div class={[style.formularBackPath, style.formularUnder].join(' ')}>
        <div class={[style.formularBackPath, style.formularBackground].join(' ')}>
          <form>
            <section class={style.character}>
              <img alt="Logo Overlap" src="/assets/overlap-logo-simple.svg" />
              <div class={style.pseudo}>
                <h1>Lets choose your character</h1>
                <TextInput className={style.pseudoInput} name="pseudo" label="TON PSEUDO" required/>
              </div>
            </section>
            <section>
              <Splitter className={style.splitter} borderSize="4px">
                <h2>Tu es qui toi ?</h2>
              </Splitter>
              <TextInput name="mail" type="email" label="TON MAIL ISEP" required />
              <TextInput name="password" type="password" label="TON MOT DE PASSE" required />
            </section>
            {questions.map((question, index) => <Question key={index} name={index} question={question} />)}
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Register;
