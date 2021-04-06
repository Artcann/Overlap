import './style';
import App from './components/app';
import * as buffer from 'buffer';

/* Polyfills */
if (typeof window !== "undefined") {
  window.Buffer = buffer;
  window.process = {...process, version: '123456789' }
}


export default App;
