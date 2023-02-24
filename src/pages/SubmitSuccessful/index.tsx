import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import './SubmitSuccessful.css';

const SubmitSuccessful = (): JSX.Element => {
  const navigate = useNavigate();

  const onClickHander = () => {
    navigate('/onboard');
  };

  return (
    <div className="container">
      <div className="submitSuccessful__content">
        <h2>Thank you for trading with us!</h2>
        <p>Your applicaiton has been submitted for review</p>
      </div>
      <div className="submitSuccessful__button">
        <Button onClick={onClickHander}>Start again</Button>
      </div>
    </div>
  );
};

export default SubmitSuccessful;
