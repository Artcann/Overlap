import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import style from'./style.css';

import { useApi } from '../../api';
import { ranking } from '../../api/game';
import { AuthContext } from '../../contexts/auth'
import { LanguageContext } from '../../translations';


const Ranking = () => {
  const { user } = useContext(AuthContext);
  const [users, error, isLoading] = useApi(ranking, [user.token]);
  const { translations } = useContext(LanguageContext);

  if (error)
    return <h1>{translations.error.default}</h1>

  if (isLoading)
    return <h1>{translations.connection.loading}</h1>

  if (users)
    return (
      <div class={style.ranking}>
        {users.map((user, index) => <p>#{index} - {user.pseudo} ({user.score}pts)</p>)}
      </div>
    )
};

export default Ranking;
