import { User } from 'interfaces';

export const getUserName = (user: User): string => {
  if (user.displayName) return user.displayName;
  if (user.firstName && user.secondName) return `${user.firstName} ${user.secondName}`;
  return user.login;
};
