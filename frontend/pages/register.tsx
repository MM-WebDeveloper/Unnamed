import { faEye, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { BackendError } from '../generated/graphql';

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [error, setError] = useState<BackendError>();
  const [updateRegisterResult, register] = useRegisterMutation();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await register({
        email,
        username,
        password,
        confirmPassword,
      });
      const api_error = data?.register.error;
      console.log(data);
      if (api_error) {
        console.log(api_error);
        setError(api_error);
      }
    } catch (error) {
      console.log(error);
    }
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
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="username" />
            <input
              className={'form__input'}
              value={username}
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
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
                  className="form__show_password_btn"
                  icon={faEye}
                  size="2x"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </span>
            ) : null}
          </div>
          <div>
            <label htmlFor="confirmPassword" />
            <input
              className={'form__input'}
              value={confirmPassword}
              type={showConfirmPassword ? 'password' : 'text'}
              placeholder="confirm password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {confirmPassword ? (
              <span title="Show password">
                <FontAwesomeIcon
                  className="form__show_password_btn"
                  icon={faEye}
                  size="2x"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </span>
            ) : null}
          </div>
          <button className={'form__btn'} type="submit">
            Register
          </button>
          {error ? (
            <div className={'form_error_message'}>
              <p>{error.message}</p>
            </div>
          ) : null}
          <div className={'form__account'}>
            <p>Already have an account?</p>
            <Link href="/">
              <a>Login</a>
            </Link>
          </div>
        </div>
      </form>
      <div className={'waves'} />
    </>
  );
};
export default register;
