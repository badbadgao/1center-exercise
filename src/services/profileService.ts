import { TBusinessDetail, TUserAccount } from 'models/type';

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

/**
 * Update bunisess details for a given email
 * @param email the user's email
 * @param businessDetails the business details to update
 * @returns user account object
 */
export const updateBusinessDetails = (email: string, businessDetails: TBusinessDetail): TUserAccount | undefined => {
  const item = localStorage.getItem(email);

  try {
    const userAccount = item ? JSON.parse(item) : undefined;

    console.log('userAccount', userAccount);
    if (userAccount) {
      const updatedUserAcount = {
        ...userAccount,
        businessDetails,
      };
      console.log('userAccount 2222', updatedUserAcount);

      localStorage.setItem(userAccount.email, JSON.stringify(updatedUserAcount));
    }
  } catch (e) {
    console.error('Failed to update business details', e);
    return undefined;
  }
};
