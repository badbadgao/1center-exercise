import * as React from 'react';
import { useState } from 'react';

import EmailField from 'components/form/EmailField';
import Button from 'components/Button';

import services from 'services';

import './OnBoard.css';

const OnBoard = (): JSX.Element => {
  const { profileService } = services;
  const [email, setEmail] = useState<string>('');
  const onSubmitHandler = () => {
    const userProfile = profileService.getUserProfileByEmail(email);

    if (userProfile) {
      console.log('Existing user, go to login page');
    } else {
      console.log('User not found, go to sign up page');
    }
  };

  const onChangeHandler = (value: string): void => {
    setEmail(value);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="onBoard">
        <div className="onBoard__form">
          <EmailField inputClass="onBoard__email-input" onChange={onChangeHandler} value={email} />
          <Button rootClass="onBoard__submit" onClick={onSubmitHandler} disabled={!email}>
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default OnBoard;
