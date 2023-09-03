import { WithId } from '../types/id.js';

export type LoginData = {
  userName: string;
  passwd: string;
  email: string;
};

export type UserNoId = LoginData & {
  firstName: string;
  surname: string;
  role: 'admin' | 'pro' | 'user';
  isAlive: boolean;
};

export type User = WithId & UserNoId;
