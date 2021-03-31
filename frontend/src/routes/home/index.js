import { h } from 'preact';
import { Link } from 'preact-router/match';
import { Router } from 'preact-router';
import { useForm } from "react-hook-form";
import style from './style.css';

import TextInput from '../../components/register/text-input';

import { useContext } from 'preact/hooks';
import { LanguageContext } from '../../translations';

const characters = [];

for (let i = 0; i < 14; i++) {
  characters.push({
    name: "Jérémy",
    image: "/assets/profile_pics/vertical/jeremy.jpg"
  })
}

const Image = () => (
  <img class={style.logo} alt="Super Overlap Quiz" src="/assets/super_overlap.svg" />
)

const LoginForm = () => {
  const { translations } = useContext(LanguageContext);

  const { register, handleSubmit } = useForm();

  return (
    <form class={style.login}>
      <h1>Login</h1>
      <TextInput name="mail" type="email" register={register} label={translations.userInfos.email.toUpperCase()} pattern=".+@eleve.isep.fr" required />
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
                <img alt={character.name} src={character.image} />
              )
            }
          })
        }
      </div>
      <div class={style.cta}>
        <div class={style.links}>
          <Link class={style.resume} href="#">Press to<br/>resume</Link>
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
                <img alt={character.name} src={character.image} />
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
