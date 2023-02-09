import { model, Schema } from 'mongoose';

export interface UserProps {
  id: string;
  name: string;
  email: string;
  isAdmin: 0 | 1;
  password: string;
}

const User = new Schema<UserProps>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
});

const usersModel = model<UserProps>('users', User);

export default usersModel;
