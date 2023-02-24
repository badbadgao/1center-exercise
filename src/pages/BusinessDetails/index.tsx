import * as React from 'react';
import { useReducer, useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AppContext } from 'pages/AppWrapper';
import Button from 'components/Button';
import reducer, { BusinessDetailsFormActionType } from './businessDetailsReducer';
import services from 'services';

import 'components/form/index.css';
import './BusinessDetails.css';

interface IFormInput {
  companyName: string;
  tradingName: string;
  companyNumber: string;
  registrationDate: string;
  country: string;
  address: string;
}

const BusinessDetails = (): JSX.Element => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const initialState = {
    companyName: '',
    tradingName: '',
    companyNumber: '',
    registrationDate: '',
    country: '',
    address: '',
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  if (!appContext.email) {
    // This should be redirected to login page in real world
    throw Error('User is not logged in!');
  }

  const { profileService } = services;

  const schema = yup
    .object()
    .shape({
      companyName: yup.string().required(),
      tradingName: yup.string().required(),
      registrationDate: yup.string().required(),
      companyNumber: yup.string().max(10).required(),
      country: yup.string().required(),
      address: yup.string().required(),
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
    appContext.email && profileService.updateBusinessDetail(appContext.email, state);
    navigate('/signup/add-directors');
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="container">
        <h2 className="businessDetails__title">Business Details</h2>
        <div className="businessDetails__form">
          <div className="form__row">
            {/* <-- company name field --> */}
            <div className="form__field">
              <label className="form__label" htmlFor="companyName">
                Company name
              </label>
              <input
                {...register('companyName')}
                id="companyName"
                name="companyName"
                className="form__input"
                onChange={(e): void => {
                  const value = e.target.value;
                  dispatch({ type: BusinessDetailsFormActionType.SET_COMPANY_NAME, payload: value });
                }}
                value={state.companyName}
              />
            </div>
            {/* <-- trading name field --> */}
            <div className="form__field">
              <label className="form__label" htmlFor="email">
                Trading name
              </label>
              <input
                {...register('tradingName')}
                id="tradingName"
                name="tradingName"
                className="form__input"
                onChange={(e): void => {
                  const value = e.target.value;
                  dispatch({ type: BusinessDetailsFormActionType.SET_TRADING_NAME, payload: value });
                }}
                value={state.tradingName}
              />
            </div>
          </div>
          <div className="form__row">
            {/* <-- company number field --> */}
            <div className="form__field">
              <label className="form__label" htmlFor="email">
                Company number
              </label>
              <input
                {...register('companyNumber')}
                id="companyNumber"
                name="companyNumber"
                className="form__input"
                onChange={(e): void => {
                  const value = e.target.value;
                  dispatch({ type: BusinessDetailsFormActionType.SET_COMPANY_NUMBER, payload: value });
                }}
                value={state.companyNumber}
              />
              {errors.companyNumber && (
                <span className={`${errors.companyNumber ? 'form__error-active' : 'form__error-inactive'}`}>
                  Max 10 characters
                </span>
              )}
            </div>
            {/* <-- registration date field --> */}
            <div className="form__field">
              <label className="form__label" htmlFor="email">
                Registration date
              </label>
              <input
                {...register('registrationDate')}
                id="registrationDate"
                name="registrationDate"
                type="date"
                className="form__input"
                onChange={(e): void => {
                  const value = e.target.value;
                  dispatch({ type: BusinessDetailsFormActionType.SET_REGISTRATION_DATE, payload: value });
                }}
                value={state.registrationDate}
              />
            </div>
          </div>
          <div className="form__row">
            {/* <-- country field --> */}
            <div className="form__field">
              <label className="form__label" htmlFor="email">
                Country
              </label>
              <select
                {...register('country')}
                id="country"
                name="country"
                className="form__input"
                onChange={(e): void => {
                  const value = e.target.value;
                  dispatch({ type: BusinessDetailsFormActionType.SET_COUNTRY, payload: value });
                }}
                value={state.country}
              >
                <option value="none">Choose...</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
            {/* <-- address field --> */}
            <div className="form__field">
              <label className="form__label" htmlFor="email">
                Adress
              </label>
              <input
                {...register('address')}
                id="address"
                name="address"
                className="form__input"
                onChange={(e): void => {
                  const value = e.target.value;
                  dispatch({ type: BusinessDetailsFormActionType.SET_ADDRESS, payload: value });
                }}
                value={state.address}
              />
            </div>
          </div>
          <Button
            rootClass="businessDetails__submit"
            onClick={handleSubmit(onSubmitHandler)}
            disabled={
              !state.companyName ||
              !state.companyNumber ||
              !state.tradingName ||
              !state.address ||
              !state.registrationDate ||
              !state.country ||
              state.country === 'none'
            }
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BusinessDetails;
