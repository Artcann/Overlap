import { h } from 'preact';
import { Link } from 'preact-router/match';
import { Router, route } from 'preact-router';
import { useForm } from "react-hook-form";
import style from './style.css';

import TextInput from '../../components/register/text-input';

import { useContext } from 'preact/hooks';
import { LanguageContext } from '../../translations';
import { AuthContext } from '../../contexts/auth';

import characters from '../../characters.json';

const Image = () => (
  <img class={style.logo} alt="Super Overlap Quiz" src="/assets/super_overlap.svg" />
)

const LoginForm = () => {
  const { translations } = useContext(LanguageContext);
  const { isLoading, error, user, login } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();
  const onSubmit = ({email, password}) => {
    login(email, password, 'game')
  }

  /* TODO: check if user is really usable */
  if (user)
    route('/game')
  
  if (isLoading)
    return <h2 class={style.login}>{translations.connection.connecting}</h2>

  let errorMessage;
  if (error) {
    if (error.from == 'server') {
      switch (error.body.type) {
        case 'USER_NOT_FOUND':
          errorMessage = translations.error.userNotFound
          break;
        case 'INCORRECT_PASSWORD':
          errorMessage = translations.error.invalidPassword
          break;
        default:
          errorMessage = translations.error.default
          break;
      }
    } else {
      errorMessage = translations.error.default
    }
  }

  return (
    <form class={style.login} onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      {errorMessage && errorMessage}
      <TextInput name="email" type="email" register={register} label={translations.userInfos.email.toUpperCase()} required />
      <TextInput name="password" type="password" register={register} label={translations.userInfos.password.toUpperCase()} required />
      <input class={style.resume} type="Submit" value="Resume" />
    </form>
  )
}

const Home = () => (
	<div class={style.home}>
    <img
      alt="Background: legs entering in a portal"
      src="/assets/portal-left.svg"
      class={[style.portal, style.portalLeft].join(' ')}
    />
    <div class={style.container}>
      <div class={style.profilePics}>
        {characters.map(
          (character, index) => {
            if (index < 7) {
              return (
                <img alt={character.name} src={`/assets/profile_pics/vertical/${character.identifier}.jpg`} />
              )
            }
          })
        }
      </div>
      <div class={style.cta}>
        <div class={style.links}>
          <Link class={style.resume} href="/login">Press to<br/>resume</Link>
          <Link class={style.start} href="/start">Press to<br/>start</Link>
        </div>
        <Router>
          <Image path="/" />
          <LoginForm path="/login" />
        </Router>
      </div>
      <div class={style.profilePics}>
        {characters.map(
          (character, index) => {
            if (index >= 7) {
              return (
                <img alt={character.name} src={`/assets/profile_pics/vertical/${character.identifier}.jpg`} />
              )
            }
          })
        }
      </div>
    </div>
    <img
      alt="Background: half body comming out a portal"
      src="/assets/portal-right.svg"
      class={[style.portal, style.portalRight].join(' ')}
    />
	</div>
);

export default Home;
