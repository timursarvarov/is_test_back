import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    title: String,
    first: String,
    last: String,
  },
  gender: String,
  location: {
    country: String,
  },
  email: String,
  phone: String,
  picture: {
    thumbnail: String,
  },
  login: {
    uuid: String,
  },
  created_at: { type: Date, default: Date.now },
});
