import { h } from 'preact';
import { Router } from 'preact-router';
import { LanguageProvider } from '../translations';
import { AuthProvider } from '../contexts/auth';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Register from '../routes/register';
import Game from '../routes/game';

const App = () => (
	<div id="app">
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Register path="/start/:rest*" />
          <Game path="/game/:rest*" />
          <Home path="/:rest*" />
        </Router>
      </AuthProvider>
    </LanguageProvider>
    <div id="bottom_terms">
      <a href="/game/terms">CGU</a>
      <a href="/game/credits">Crédits</a>
    </div>
	</div>
)

export default App;
