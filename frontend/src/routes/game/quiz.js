import { h } from 'preact';
import { useReducer, useEffect, useRef } from 'preact/hooks';
import socketIOClient from 'socket.io-client';
import gameReducer from './gameReducer';
import style from'./style.css';

const Quiz = () => {
  const socketRef = useRef();
  const [gameState, gameDispatch] = useReducer(gameReducer, {
  })

  useEffect(() => {
    socketRef.current = socketIOClient('http://localhost:3000')

    socketRef.current.emit('test', {
      message: 'test'
    })
  })

  return (
    <>
      <div class={style.gameQuestion}>
        <h1>Question</h1>
        <img class={style.gameScreen} src="https://1uyxqn3lzdsa2ytyzj1asxmmmpt-wpengine.netdna-ssl.com/wp-content/uploads/2020/03/Lot-189-Keith-Haring-Retrospect-1-768x426.jpg" />
      </div>
      <div class={style.gameAnswers}>
        <button class={[style.gameButton, style.valid].join(' ')}>Keith Haring</button>
        <button class={style.gameButton}>Keith Haring</button>
        <button class={[style.gameButton, style.invalid].join(' ')}>Keith Haring</button>
        <button class={style.gameButton}>Keith Haring</button>
      </div>
    </>
  )
};

export default Quiz;
