import { TBusinessDetail } from 'models/type';

export enum BusinessDetailsFormActionType {
  SET_COMPANY_NAME = 'SET_COMPANY_NAME',
  SET_TRADING_NAME = 'SET_TRADING_NAME',
  SET_COMPANY_NUMBER = 'SET_COMPANY_NUMBER',
  SET_COUNTRY = 'SET_COUNTRY',
  SET_ADDRESS = 'SET_ADDRESS',
  SET_REGISTRATION_DATE = 'SET_REGISTRATION_DATE',
}

interface IBusinessDetailsFormAction {
  type: BusinessDetailsFormActionType;
  payload: string;
}

const reducer = (state: TBusinessDetail, { type, payload }: IBusinessDetailsFormAction): TBusinessDetail => {
  switch (type) {
    case BusinessDetailsFormActionType.SET_COMPANY_NAME:
      return {
        ...state,
        companyName: payload,
      };
    case BusinessDetailsFormActionType.SET_COMPANY_NUMBER:
      return {
        ...state,
        companyNumber: payload,
      };
    case BusinessDetailsFormActionType.SET_TRADING_NAME:
      return {
        ...state,
        tradingName: payload,
      };
    case BusinessDetailsFormActionType.SET_ADDRESS:
      return {
        ...state,
        address: payload,
      };
    case BusinessDetailsFormActionType.SET_COUNTRY:
      return {
        ...state,
        country: payload,
      };
    case BusinessDetailsFormActionType.SET_REGISTRATION_DATE:
      return {
        ...state,
        registrationDate: payload,
      };

    default:
      throw Error('Unknown action', type);
  }
};

export default reducer;
