import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';
import Footer from '../components/Footer';

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const onSubmitHandler = () => {
    console.log('happened');
  };

  return (
    <>
      <form className={'form'} onSubmit={onSubmitHandler}>
        <div className={'form__container'}>
          <div className={'form__logo'}>
            <FontAwesomeIcon
              icon={faCameraRetro}
              size="2x"
              onClick={() => setShowPassword(!showPassword)}
            />
            <h1>PhotoDiary</h1>
          </div>
          <div>
            <label htmlFor="email" />
            <input
              className={'form__input'}
              value={email}
              placeholder="email or username"
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
              type={showPassword ? 'password' : 'text'}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className={'form__btn'} type="submit">
            Login
          </button>
          <div className={'form__account'}>
            <p>Don't have an account?</p>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </div>
        </div>
      </form>

      <div className={'waves'} />
    </>
  );
};
export default login;
