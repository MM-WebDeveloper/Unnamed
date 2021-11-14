import React, { useState } from 'react';
import Footer from '../components/Footer';

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    console.log('happened');
  };
  return (
    <div>
      <form className={'form'} onSubmit={onSubmit}>
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
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className={'form__btn'} type="submit">
          Login
        </button>
      </form>
      <div className={'waves'} />
      <Footer />
    </div>
  );
};
export default login;
