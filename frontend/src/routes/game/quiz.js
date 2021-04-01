import { h } from 'preact';
import { useState, useEffect, useRef, useContext } from 'preact/hooks';
import socketIOClient from 'socket.io-client';
import style from'./style.css';

import { AuthContext } from '../../contexts/auth'
import { LanguageContext } from '../../translations';
import { socket } from '../../../../backend/socket';

const Quiz = () => {
  const { user } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);

  const socketRef = useRef();
  
  const [connected, setConnected] = useState(false);
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(false);


  useEffect(() => {
    socketRef.current = socketIOClient('http://localhost:3000', {
      extraHeaders: { Authorization: `Bearer ${user.token}` },
      reconnection: true
    })

    socketRef.current.once('connect', () => {
      if (!connected) {
        setConnected(true)
        socketRef.current.emit('startGame')
      }
    });

    socketRef.current.on('error', () => {
      setError(true)
    })

    socketRef.current.on('startGameSuccess', () => {
      socketRef.current.emit('nextQuestion')
    })

    socketRef.current.on('nextQuestion', question => {
      setQuestion(question)
    })
  })

  if (error)
    return <h1>An error has occured. Please refresh.</h1>

  if (!connected)
    return <h1>Connecting...</h1>

  if (question) {
    return (
      <>
        <div class={style.gameQuestion}>
          <h1>{question.question[language]}</h1>
          <img class={style.gameScreen} src="https://1uyxqn3lzdsa2ytyzj1asxmmmpt-wpengine.netdna-ssl.com/wp-content/uploads/2020/03/Lot-189-Keith-Haring-Retrospect-1-768x426.jpg" />
        </div>
        <div class={style.gameAnswers}>
          {question.answers[language].map((answer, index) => (
            <button class={[style.gameButton].join(' ')} key={index}>{answer}</button>
          ))}
        </div>
      </>
    )
  }
};

export default Quiz;
