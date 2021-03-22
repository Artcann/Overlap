import { h } from 'preact';
import { v4 as uuidv4 } from 'uuid';
import style from './text-input.css';

const TextInput = ({ label, name, className, register, required }) => { 
  const id = uuidv4();

  if (!register) {
    register = ({}) => {return;};
  }

  return (
    <div class={[style.textInputWrapper, className].join(' ')}>
      <input name={name} id={id} ref={register({ required })} type="text" placeholder="&nbsp;" required={required} />
      <label for={id}>{label}</label>
    </div>
  )
}

export default TextInput;
