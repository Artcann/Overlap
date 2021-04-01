import { h } from 'preact';
import { useState, useEffect, useRef, useContext } from 'preact/hooks';
import socketIOClient from 'socket.io-client';
import style from'./style.css';

import { AuthContext } from '../../contexts/auth'

const Quiz = () => {
  const { user } = useContext(AuthContext);

  const socketRef = useRef();
  
  const [connected, setConnected] = useState(false);
  const [question, setQuestion] = useState(null);


  useEffect(() => {
    socketRef.current = socketIOClient('http://localhost:3000', {
      extraHeaders: { Authorization: `Bearer ${user.token}` },
      reconnection: true
    })

    socketRef.current.once('connect', function () {
      if (!connected) {
        setConnected(true)
        console.log('hey')
        socketRef.current.emit('startGame')
      }
    });
  })


  if (!connected)
    return <h1>Connecting...</h1>

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
