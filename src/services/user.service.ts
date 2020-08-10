// eslint-disable-next-line no-unused-vars
import User, { IUser } from '../models/User';

export const createUser = async (user: IUser): Promise<IUser> => {
   return await new User(user).save();
};

export const getUsers = async (): Promise<IUser[]> => {
   return await User.find();
};

export const findUserByUsername = async ({
   username
}: {
   username: string;
}): Promise<IUser | null> => {
   return await User.findOne({ username });
};
