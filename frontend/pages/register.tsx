import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { BackendError } from '../generated/graphql';

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState<BackendError>();
  const [updateRegisterResult, register] = useRegisterMutation();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await register({ email, password });
      const api_error = data?.register.error;

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
          <h1>PhotoShare</h1>
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
                  className="form__show_password_btn"
                  icon={faEye}
                  size="2x"
                  onClick={() => setShowPassword(!showPassword)}
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
