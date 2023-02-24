export type TUserProfile = {
  firstName: string;
  lastName: string;
  dob: string;
  idNumber: string;
  imgFileDataURL: string;
};

export type TBusinessDetail = {
  companyName: string;
  tradingName: string;
  companyNumber: string;
  registrationDate: string;
  country: string;
  address: string;
};

export type TDirector = {
  id: string;
  directorName: string;
  email: string;
};

export type TUserAccount = {
  id?: string;
  email: string;
  password: string;
  userProfile?: TUserProfile;
  businessDetail?: TBusinessDetail;
  directors?: TDirector[];
  submitted?: boolean;
};
