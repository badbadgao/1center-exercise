export type TUserProfile = {
  email: string;
};

export type TUserAccount = {
  id?: string;
  email: string;
  password: string;
  userProfile?: TUserProfile;
};
