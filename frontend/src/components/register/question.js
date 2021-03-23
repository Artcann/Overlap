import { h } from 'preact';
import style from './question.css';
import Splitter from './splitter';
import { v4 as uuidv4 } from 'uuid';

const Question = ({ question, name, register, required }) => {

  if (!register) {
    register = ({}) => {return;};
  }

  return (
    <section class={style.question}>
      <Splitter className={style.title} borderSize="4px">
        <h2>{question.title}</h2>
      </Splitter>
      {question.answers.map((answer, index) => {
        const id = uuidv4();
        return (
          <>
            <input id={id} type='radio' value={index} name={name} ref={register({ required })} />
            <label for={id} class={style.container} key={index}>
              <Splitter className={style.answerSplitter} innerClass={style.answerBackground} borderSize="1px">
                <div><span>{answer}</span></div>
              </Splitter>
            </label>
          </>
        )}
      )}
    </section>
  );
}

export default Question;
