import { TUserProfile } from 'models/type';

export const getUserProfileByEmail = (email: string): TUserProfile | undefined => {
  const item = localStorage.getItem(email);
  try {
    return item ? JSON.parse(item) : undefined;
  } catch (e) {
    console.error('parseError', e);
    return undefined;
  }
};
