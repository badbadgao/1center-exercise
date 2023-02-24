import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BusinessDetailsReview from './BusinessDetailsReview';
import DirectorsReview from './DirectorsReview';
import UserProfileReview from './UserProfileReview';
import services from 'services';
import { AppContext } from 'containers/AppWrapper';

import './ApplicationReview.css';
import { TUserAccount } from 'models/type';
import Button from 'components/Button';

const ApplicationReview = (): JSX.Element => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [userAccount, setUserAccount] = useState<TUserAccount>();
  const { profileService } = services;

  if (!appContext.email) {
    // This should be redirected to login page in real world
    throw Error('User is not logged in!');
  }

  useEffect(() => {
    const userAccountObj = appContext.email && profileService.getUserAccount(appContext.email);

    if (!userAccountObj) {
      // TODO Need to deal with this situation in real world
      throw Error('User Account not found!');
    } else {
      setUserAccount(userAccountObj);
    }
  }, []);

  const onSubmitHandler = () => {
    appContext.email && profileService.submitApplication(appContext.email);
    navigate('/signup/successful');
  };

  return (
    <div className="container">
      <h2 className="applicationReview__title">Review</h2>
      {userAccount?.businessDetail && <BusinessDetailsReview businessDetail={userAccount.businessDetail} />}
      {userAccount?.directors && <DirectorsReview directors={userAccount.directors} />}
      {userAccount?.userProfile && <UserProfileReview userProfile={userAccount.userProfile} />}
      <div className="applicationReview__submit">
        <Button
          onClick={onSubmitHandler}
          disabled={!userAccount?.businessDetail || !userAccount?.directors || !userAccount?.userProfile}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ApplicationReview;
