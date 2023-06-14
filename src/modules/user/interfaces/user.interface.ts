import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: {
    title: string;
    first: string;
    last: string;
  };
  readonly gender: string;
  readonly location: {
    country: string;
  };
  readonly email: string;
  readonly phone: string;
  readonly picture: {
    thumbnail: string;
  };
  readonly login: {
    uuid: string;
  };
}
