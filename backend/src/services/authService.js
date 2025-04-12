import User from '../models/userModel.js';

export const addUser = async ({ email, hashedPassword }) => {
  try {
    const user = new User({ email, password: hashedPassword });
    return await user.save();
  } catch (error) {
    throw Error('cannot create user' + error.message);
  }
};

export const findUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw Error('cannot find user' + error.message);
  }
};
export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw Error('cannot find user' + error.message);
  }
};
