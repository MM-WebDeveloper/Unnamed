import { faCameraRetro, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import { useLoginMutation } from '../generated/graphql';
import { UserContext } from '../context/index';

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState('');
  const [updateLoginResult, login] = useLoginMutation();
  const { state, setState } = useContext(UserContext);
  const router = useRouter();

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     router.push('/dashboard');
  //   }
  // }, []);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await login({
        emailOrUsername,
        password,
      });

      const api_error = data?.login.error;

      if (api_error) {
        setError(api_error);
        return;
      }

      if (data?.login.accessToken) {
        localStorage.setItem('token', data.login.accessToken!);
      }

      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className={'form'} onSubmit={onSubmitHandler}>
        <div className={'form__container'}>
          <div className={'form__logo'}>
            <FontAwesomeIcon icon={faCameraRetro} size="2x" />
            <h1>PhotoDiary</h1>
          </div>
          <div>
            <label htmlFor="emailOrUsername" />
            <input
              className={'form__input'}
              value={emailOrUsername}
              placeholder="email or username"
              onChange={(e) => {
                setEmailOrUsername(e.target.value);
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
          <button className={'form__btn'} type="submit">
            Login
          </button>
          {error ? (
            <div className={'form_error_message'}>
              <p>{error}</p>
            </div>
          ) : null}
          <div className={'form__account'}>
            <p>Don't have an account?</p>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </div>
          {JSON.stringify(state)}
        </div>
      </form>

      <div className={'waves'} />
    </>
  );
};
export default login;
