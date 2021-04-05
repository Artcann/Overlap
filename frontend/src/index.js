import './style';
import App from './components/app';

/* Polyfills */
import * as buffer from 'buffer';
window.Buffer = buffer;
window.process = {...process, version: '123456789' }


export default App;
