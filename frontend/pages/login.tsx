import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            type={showPassword ? 'password' : 'text'}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {password ? (
            <span title="Show password">
              <FontAwesomeIcon
                className="form_show_password_btn"
                icon={faEye}
                size="2x"
                onClick={() => setShowPassword(!showPassword)}
              />
            </span>
          ) : null}
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
