import React, { useState } from 'react';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
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
        </div>
        <button className={'form__btn'} type="submit">
          Register
        </button>
        {error ? (
          <div className={'form_error_message'}>
            <p>{error.message}</p>
          </div>
        ) : null}
      </form>
      <div className={'waves'} />
      <Footer />
    </div>
  );
};
export default register;
