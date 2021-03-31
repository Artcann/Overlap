import { h } from 'preact';
import { Router } from 'preact-router';
import { LanguageProvider } from '../translations';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Register from '../routes/register';
import Game from '../routes/game';

const App = () => (
	<div id="app">
    <LanguageProvider>
      <Router>
        <Register path="/start/:rest*" />
        <Game path="/game/:rest*" />
        <Home path="/:rest*" />
      </Router>
    </LanguageProvider>
	</div>
)

export default App;
