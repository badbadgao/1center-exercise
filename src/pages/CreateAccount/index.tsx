import * as React from 'react';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Button from 'components/Button';

import './CreateAccount.css';

import services from 'services';

import 'components/form/index.css';

interface IFormInput {
  password: string;
  confirmPassword: string;
}

const BusinessDetails = (): JSX.Element => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state.email;
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfrimPassword] = useState<string>('');

  const { profileService } = services;

  const schema = yup
    .object()
    .shape({
      password: yup.string().required(''),
      confirmPassword: yup
        .string()
        .required('')
        .oneOf([yup.ref('password'), ''], 'Passwords must match'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = () => {
    const userAccount = profileService.createAccount({
      email,
      password,
    });

    if (userAccount) {
      navigate('/signup/business-details');
    } else {
      console.error('Failed to create account');
    }
  };

  const onPasswordChangeHandler = (passwordValue: string): void => {
    setPassword(passwordValue);
  };

  const onConfirmPasswordChangeHandler = (confirmPasswordValue: string): void => {
    setConfrimPassword(confirmPasswordValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="createAccount">
        <div className="createAccount__form">
          {/* <-- email field --> */}
          <div className="form__field">
            <label className="form__label" htmlFor="email">
              Business details
            </label>
            <input disabled id="email" name="email" className="form__input" value={state?.email} />
          </div>
          {/* <-- password field --> */}
          <div className="form__field">
            <label className="form__label" htmlFor="email">
              Create password
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
            {errors.password && (
              <span className={`${errors.password ? 'form__error-active' : 'form__error-inactive'}`}>
                Password does not match
              </span>
            )}
          </div>
          {/* <-- confirm password field --> */}
          <div className="form__field">
            <label className="form__label" htmlFor="email">
              Confirm password
            </label>
            <input
              {...register('confirmPassword')}
              id="confirmPassword"
              name="confirmPassword"
              className="form__input"
              type="password"
              onChange={(e): void => {
                const value = e.target.value;
                onConfirmPasswordChangeHandler(value);
              }}
              value={confirmPassword}
            />
            {errors.confirmPassword && (
              <span className={`${errors.confirmPassword ? 'form__error-active' : 'form__error-inactive'}`}>
                Password must match
              </span>
            )}
          </div>
          <Button
            rootClass="onBoard__submit"
            onClick={handleSubmit(onSubmitHandler)}
            disabled={!email || !password || !confirmPassword}
          >
            Create Account
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BusinessDetails;
