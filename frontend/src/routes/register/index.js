import { h } from 'preact';
import { useForm } from "react-hook-form";
import style from './style.css';
import TextInput from '../../components/register/text-input';
import Splitter from '../../components/register/splitter';
import Question from '../../components/register/question';

import { useContext } from 'preact/hooks';
import { LanguageContext } from '../../translations';

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

const Register = () => {
  const { translations } = useContext(LanguageContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <section class={style.character}>
                <img alt="Logo Overlap" src="/assets/overlap-logo-simple.svg" />
                <div class={style.pseudo}>
                  <h1>Lets choose your character</h1>
                  <TextInput className={style.pseudoInput} name="pseudo" register={register} label={translations.userInfos.pseudo.toUpperCase()} required/>
                </div>
              </section>
              <section>
                <Splitter className={style.splitter} borderSize="4px">
                  <h2>{translations.userInfos.title}</h2>
                </Splitter>
                <TextInput name="mail" type="email" register={register} label={translations.userInfos.email.toUpperCase()} pattern=".+@eleve.isep.fr" required />
                <TextInput name="password" type="password" register={register} label={translations.userInfos.password.toUpperCase()} required />
              </section>
              {questions.map((question, index) => <Question key={index} name={index} register={register} question={question} />)}
              <input class={style.submit} type="submit" value="Commencer l'avanture !" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
