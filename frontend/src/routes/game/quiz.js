import { h } from 'preact';
import { useState, useEffect, useRef, useContext } from 'preact/hooks';
import { route } from 'preact-router';
import socketIOClient from 'socket.io-client';
import style from'./style.css';

import { AuthContext } from '../../contexts/auth'
import { LanguageContext } from '../../translations';

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const Quiz = () => {
  const { user, incrementScore } = useContext(AuthContext);
  const { language, translations } = useContext(LanguageContext);

  const socketRef = useRef();
  
  const [connected, setConnected] = useState(false);
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);
  const [answerGlobal, setAnswer] = useState(null);


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
      setError(`${translations.error.default}. ${translations.error.refresh}.`)
    })

    socketRef.current.once('startGameSuccess', () => {
      socketRef.current.emit('nextQuestion')
    })

    socketRef.current.on('nextQuestion', question => {
      setAnswer(null)
      question.answers = shuffle(question.answers[language].map((answer, id) => [id, answer]))
      setQuestion(question)
    })

    socketRef.current.on('endDay', question => {
      route('/game/end_day')
    })

    socketRef.current.on('correction', ({answer, points}) => {
      setAnswer({
        ...answerGlobal,
        correct: answer,
        points
      });
      incrementScore(points)
      setTimeout(() => socketRef.current.emit('nextQuestion'), 5_000)
    })
  })

  const submitAnswer = (index) => {
    setAnswer({
      ours: index,
      correct: null,
      points: null
    })
    socketRef.current.emit('submitAnswer', {answer: index, question})
  }

  if (error)
    return <h1>{error}</h1>

  if (!connected)
    return <h1>{translations.connection.connecting}</h1>

  if (question) {
    return (
      <>
        <div class={style.gameQuestion}>
          <h1>{question.question[language]}</h1>
          <img class={style.gameScreen} src="https://1uyxqn3lzdsa2ytyzj1asxmmmpt-wpengine.netdna-ssl.com/wp-content/uploads/2020/03/Lot-189-Keith-Haring-Retrospect-1-768x426.jpg" />
        </div>
        <div class={style.gameAnswers}>
          {question.answers.map(([index, answer]) => {
            const classNames = [style.gameButton]
            let text = answer

            if (answerGlobal && answerGlobal.correct) {
              if (index == answerGlobal.correct) {
                classNames.push(style.valid)
                text += ' +' + answerGlobal.points
              }
              
              if (index == answerGlobal.ours && index != answerGlobal.correct)
                classNames.push(style.invalid)
            }

            return (
              <button
                class={classNames.join(' ')}
                key={index}
                onClick={() => answerGlobal === null ? submitAnswer(index) : undefined}
              >
                {text}
              </button>
            )
          })}
        </div>
      </>
    )
  }
};

export default Quiz;
