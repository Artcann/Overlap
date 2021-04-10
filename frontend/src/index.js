import './style';
import App from './components/app';
import * as buffer from 'buffer';

console.log(`
 ___ _ __ _ __ ___  _ __ 
/ _ \\ '__| '__/ _ \\| '__|
| __/ |  | | | (_) | |   
\\___|_|  |_|  \\___/|_|   \n
/!\\ Error /!\\ Error /!\\ Error /!\\ \n
/!\\  User has found a breach  /!\\ \n
/!\\ Error /!\\ Error /!\\ Error /!\\ \n
/!\\    Please remain calm !   /!\\ \n
/!\\ Error /!\\ Error /!\\ Error /!\\ \n
/!\\ Safety procedure initiated/!\\ \n
/!\\Our agent is backing up all/!\\ \n
/!\\      the pop culture      /!\\ \n
/!\\       On: bknio.cha       /!\\ \n
/!\\  Code: dS8NonoJbD9VJoFa6  /!\\ \n
/!\\ Error /!\\ Error /!\\ Error /!\\ \n
`)

/* Polyfills */
if (typeof window !== "undefined") {
  window.Buffer = buffer;
  window.process = {...process, version: '123456789' }
}


export default App;
