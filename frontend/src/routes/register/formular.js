import { h } from 'preact';
import { useForm } from "react-hook-form";
import { route } from 'preact-router';
import style from './style.css';
import TextInput from '../../components/register/text-input';
import Splitter from '../../components/register/splitter';
import Question from '../../components/register/question';
import { signup } from '../../api/auth';

import { useContext, useState } from 'preact/hooks';
import { LanguageContext } from '../../translations';

import questions from './questions.json';

const Formular = ({ setCharacter }) => {
  const { language, translations } = useContext(LanguageContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    setIsLoading(true)

    try {
      const response = await signup(data)
      
      setCharacter(response.character)
      setIsLoading(false)
      
      route('/start/reveal');
    } catch (e) {
      setError(e)
    }

    setIsLoading(false)
  };

  if (error) {
    let errorMessage;

    if (error.errorFrom == 'server') {
      switch (error.body.type) {
        case 'USER_ALREADY_EXIST':
          errorMessage = translations.error.userAlreadyExists
          break;
        default:
          errorMessage = translations.error.default
          break;
      }
    } else {
      errorMessage = translations.error.default
    }

    return (
      <div class={[style.content, style.formularBackPath, style.formularUnder].join(' ')}>
        <div class={[style.formularBackPath, style.formularBackground, style.formularError].join(' ')}>
          <h1>{errorMessage}</h1>
          <a href="#" onClick={() => { setError(null) }} ><h2>{translations.menu.back}</h2></a>
        </div>
      </div>
    )
  }

  if (isLoading)
    return (
      <div class={[style.content, style.formularBackPath, style.formularUnder].join(' ')}>
        <div class={[style.formularBackPath, style.formularBackground].join(' ')}>
          <h1>{translations.connection.initializing}</h1>
        </div>
      </div>
    )

  return (
    <div class={[style.content, style.formularBackPath, style.formularUnder].join(' ')}>
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
            <TextInput name="email" type="email" register={register} label={translations.userInfos.email.toUpperCase()} pattern=".+\..+@eleve.isep.fr" required />
            <TextInput name="password" type="password" register={register} label={translations.userInfos.password.toUpperCase()} required />
          </section>
          {questions.map((question, index) => <Question key={index} name={index} register={register} question={question[language]} required />)}
          <label style="color: white; font-size: 1.3em; margin-bottom: 10px;">
            <input type="checkbox" required />
            J'ai lu et j'accepte les <a href="/game/terms">conditions d'utilisation</a>
          </label>
          <p></p>
          <input class={style.submit} type="submit" value={translations.userInfos.startButton} />
        </form>
      </div>
    </div>
  );
}

export default Formular;
