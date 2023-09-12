import joi from 'joi';

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

export const userSchema = joi.object<User>({
  userName: joi.string().required(),
  email: joi.string().email().required().messages({
    'string.base': `"email" debe ser tipo 'texto'`,
    'string.email': `El "email"  no es válido`,
    'string.empty': `El "email" no puede faltar`,
  }),
  passwd: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required(),
});
