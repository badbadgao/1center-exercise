import * as React from 'react';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Button from 'components/Button';

import services from 'services';

import 'components/form/index.css';
import './OnBoard.css';
interface IFormInput {
  email: string;
  example: number;
}

const OnBoard = (): JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const { profileService } = services;

  const schema = yup
    .object()
    .shape({
      email: yup.string().email('Please input a valid email').required(),
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
    const userProfile = profileService.getUserAccount(email);

    if (userProfile) {
      console.log('Existing user, go to login page');
    } else {
      navigate('/signup/create-account', { state: { email } });
    }
  };

  const onChangeHandler = (value: string): void => {
    setEmail(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="onBoard">
        <div className="onBoard__form">
          <div className="form__field">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input
              {...register('email')}
              id="email"
              name="email"
              className="form__input onBoard__email-input"
              onChange={(e): void => {
                const value = e.target.value;
                onChangeHandler(value);
              }}
              value={email}
            />
            {errors.email && (
              <span className={`${errors.email ? 'form__error-active' : 'form__error-inactive'}`}>
                Please input a valid email
              </span>
            )}
          </div>
          <Button rootClass="onBoard__submit" onClick={handleSubmit(onSubmitHandler)} disabled={!email}>
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default OnBoard;
