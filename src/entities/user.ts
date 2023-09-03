import { WithId } from '../types/id.js';
import { ImgData } from '../types/image.js';

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
  imageData: ImgData;
};

export type User = WithId & UserNoId;
