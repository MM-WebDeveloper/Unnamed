import React, { useState } from 'react';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Register.module.css';

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [revealPassword, setRevealPassword] = useState(true);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <div>
      <form className={'form'} onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="email" />
          <input
            className={'form__input'}
            value={email}
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password" />
          <input
            className={'form__input'}
            value={password}
            type={revealPassword ? 'password' : 'text'}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FontAwesomeIcon
            className={styles.password_btn}
            icon={faEye}
            size="2x"
            onClick={() => setRevealPassword(!revealPassword)}
            title="Show password"
          />
        </div>
        <button className={'form__btn'} type="submit">
          Register
        </button>
      </form>
      <div className={'waves'} />
      <Footer />
    </div>
  );
};
export default register;
