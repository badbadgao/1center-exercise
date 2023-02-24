import * as React from 'react';
import { useState, useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { AppContext } from 'containers/AppWrapper';
import Button from 'components/Button';

import './SignIn.css';

import services from 'services';

import 'components/form/index.css';

interface IFormInput {
  password: string;
  confirmPassword: string;
}

const SignIn = (): JSX.Element => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state.email;
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false);

  const { profileService } = services;

  const schema = yup
    .object()
    .shape({
      password: yup.string().required(''),
    })
    .required();

  const { register, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = () => {
    const userAccount = profileService.login(email, password);

    if (userAccount) {
      setLoginError(false);
      appContext.setEmail?.(email);
      navigate('/signup/business-details');
    } else {
      console.error('Failed to login');
      setLoginError(true);
    }
  };

  const onPasswordChangeHandler = (passwordValue: string): void => {
    setPassword(passwordValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="container">
        <div className="signin__form">
          {/* <-- email field --> */}
          <div className="form__field">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input disabled id="email" name="email" className="form__input" value={state?.email} />
          </div>
          {/* <-- password field --> */}
          <div className="form__field">
            <label className="form__label" htmlFor="email">
              Password
            </label>
            <input
              {...register('password')}
              id="password"
              name="password"
              type="password"
              className="form__input"
              onChange={(e): void => {
                const value = e.target.value;
                onPasswordChangeHandler(value);
              }}
              value={password}
            />
            {loginError && (
              <span className={`${loginError ? 'form__error-active' : 'form__error-inactive'}`}>
                Passwords is wrong, please try again.
              </span>
            )}
          </div>
          <Button rootClass="createAcount__submit" onClick={handleSubmit(onSubmitHandler)} disabled={!password}>
            Log in
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
