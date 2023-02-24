import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AppContext } from 'containers/AppWrapper';
import Button from 'components/Button';
import services from 'services';
import 'components/form/index.css';
import './UserProfile.css';
import ImageLoader from './ImageLoader';

interface IFormInput {
  firstName: string;
  lastName: string;
  dob: string;
  idNumber: string;
}

const UserProfile = (): JSX.Element => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [idNumber, setIdNumber] = useState<string>('');
  const [imgFileDataURL, setImgFileDataURL] = useState<string>('');
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  useEffect(() => {
    const userProfile = appContext.email && profileService.getUserProfile(appContext.email);
    if (userProfile) {
      const { firstName, lastName, dob, idNumber, imgFileDataURL } = userProfile;
      setFirstName(firstName);
      setLastName(lastName);
      setDob(dob);
      setIdNumber(idNumber);
      setImgFileDataURL(imgFileDataURL);
      // the form need to reset and validate the form with the data, otherwise the form will validate
      // with old empty state.
      reset(userProfile);
    }
  }, [appContext.email]);

  if (!appContext.email) {
    // This should be redirected to login page in real world
    throw Error('User is not logged in!');
  }

  const { profileService } = services;

  const schema = yup
    .object()
    .shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      dob: yup.string().required(),
      idNumber: yup.string().max(10, 'Max 10 characters').required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = () => {
    appContext.email &&
      profileService.updateUserProfile(appContext.email, {
        firstName,
        lastName,
        dob,
        imgFileDataURL,
        idNumber,
      });
    navigate('/signup/application-review');
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="userProfile">
        <h2 className="userProfile__title">Application Details</h2>
        <div className="userProfile__form">
          <ImageLoader imgFileDataURL={imgFileDataURL} setImgFileDataURL={setImgFileDataURL} />
          <div className="userProfile__info">
            {/* <-- first name field --> */}
            <div className="form__field">
              <label className="form__label" htmlFor="firstName">
                First name
              </label>
              <input
                {...register('firstName')}
                id="firstName"
                name="firstName"
                className="form__input"
                onChange={(e): void => {
                  const value = e.target.value;
                  setFirstName(value);
                }}
                value={firstName}
              />
            </div>
            {/* <-- last name field --> */}
            <div className="form__field">
              <label className="form__label" htmlFor="lastName">
                Last name
              </label>
              <input
                {...register('lastName')}
                id="lastName"
                name="lastName"
                className="form__input"
                onChange={(e): void => {
                  const value = e.target.value;
                  setLastName(value);
                }}
                value={lastName}
              />
            </div>
            {/* <-- date of birth field --> */}
            <div className="form__field">
              <label className="form__label" htmlFor="dob">
                Dete of birth
              </label>
              <input
                {...register('dob')}
                id="dob"
                name="dob"
                className="form__input"
                type="date"
                onChange={(e): void => {
                  const value = e.target.value;
                  setDob(value);
                }}
                value={dob}
              />
            </div>
            {/* <-- identification number field --> */}
            <div className="form__field">
              <label className="form__label" htmlFor="idNumber">
                Identification number
              </label>
              <input
                {...register('idNumber')}
                id="idNumber"
                name="idNumber"
                className="form__input"
                onChange={(e): void => {
                  const value = e.target.value;
                  setIdNumber(value);
                }}
                value={idNumber}
              />
              {errors.idNumber && (
                <span className={`${errors.idNumber ? 'form__error-active' : 'form__error-inactive'}`}>
                  {errors.idNumber.message}
                </span>
              )}
            </div>
          </div>
          <Button
            rootClass="userProfile__submit"
            onClick={handleSubmit(onSubmitHandler)}
            disabled={!firstName || !lastName || !dob || !idNumber || !imgFileDataURL}
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserProfile;
