import { TUserAccount } from 'models/type';

export const getUserAccount = (email: string): TUserAccount | undefined => {
  const item = localStorage.getItem(email);
  try {
    return item ? JSON.parse(item) : undefined;
  } catch (e) {
    console.error('parseError', e);
    return undefined;
  }
};

export const createAccount = (userAccount: TUserAccount): TUserAccount => {
  // If this is the real service, then the id will be genereated and included in the response
  localStorage.setItem(userAccount.email, JSON.stringify(userAccount));
  return userAccount;
};
