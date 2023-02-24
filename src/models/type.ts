export type TUserProfile = {
  email: string;
};

export type TBusinessDetail = {
  companyName: string;
  tradingName: string;
  companyNumber: string;
  registrationDate: string;
  country: string;
  address: string;
};

export type TUserAccount = {
  id?: string;
  email: string;
  password: string;
  userProfile?: TUserProfile;
  businessDetail?: TBusinessDetail;
};
