import { IUser } from '../interfaces/user';
import mongoose from 'mongoose';

/**
 * @Todo Add password hash
 */
const User = new mongoose.Schema(
  {
    username: {
      type: String, 
      lowercase: true, 
      unique: true,
      required: [true, "Can't be blank"], 
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
      index: true
    },
		password: { 
      type: String, 
      required: true 
    },
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<IUser & mongoose.Document>('User', User);
