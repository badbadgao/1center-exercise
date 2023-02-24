import * as React from 'react';

import TextView from 'components/TextView';
import { TUserProfile } from 'models/type';
import './UserProfileReview.css';

interface IUserProfileReviewProps {
  userProfile: TUserProfile;
}

const UserProfileReview = ({ userProfile }: IUserProfileReviewProps): JSX.Element => {
  const { firstName, lastName, dob, idNumber, imgFileDataURL } = userProfile;

  return (
    <>
      <h4 className="textview__title">Applicant details</h4>
      <div className="userProfileView__content">
        <div className="userProfileView__img">
          <img src={imgFileDataURL} />
        </div>
        <div className="userProfileView__info">
          <TextView label="First name" value={firstName} />
          <TextView label="Last name" value={lastName} />
          <TextView label="Date of birth" value={dob} />
          <TextView label="Identification number" value={idNumber} />
        </div>
      </div>
    </>
  );
};

export default UserProfileReview;
