import User from '../models/userModel.js';
import { sendResetLink } from '../sendMail.js';

export const addUser = async ({ email, hashedPassword, name }) => {
  try {
    const user = new User({ email, password: hashedPassword, name });
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

export const saveResetToken = async ({ email, resetToken }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw Error('User not found!');

    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000;
    await sendResetLink(user, resetToken);
    await user.save();
  } catch (error) {
    throw Error('cannot save reset token:' + error.message);
  }
};

export const verifyTokenAndSavePassword = async ({
  resetToken,
  hashedPassword,
}) => {
  try {
    const user = await User.findOne({
      resetToken: resetToken,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) throw Error('Token expired or invalid');

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
  } catch (error) {
    throw Error('cannot verify token :' + error.message)
  }
};
