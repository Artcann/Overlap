import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Register from '../routes/register';

const App = () => (
	<div id="app">
		<Router>
			<Home path="/" />
      <Register path="/start" />
		</Router>
	</div>
)

export default App;
