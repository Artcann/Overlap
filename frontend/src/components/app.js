import { h } from 'preact';
import { Router } from 'preact-router';
import { LanguageProvider } from '../translations';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Register from '../routes/register';

const App = () => (
	<div id="app">
    <LanguageProvider>
      <Router>
        <Home path="/" />
        <Register path="/start/:rest*" />
      </Router>
    </LanguageProvider>
	</div>
)

export default App;
