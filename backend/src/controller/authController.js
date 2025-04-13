import * as authService from '../services/authService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config/index.js';
import crypto from 'crypto';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await authService.findUserByEmail(email);

    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        const token = await jwt.sign(
          { email: existingUser.email, _id: existingUser._id },
          APP_SECRET,
          {
            expiresIn: '7d',
          }
        );
        res.status(200).json({
          token,
          user: { name: existingUser.name, email: existingUser.email },
        });
      } else {
        res.status(403).json({ msg: 'wrong credentials' });
      }
    } else {
      res.status(404).json({ msg: 'User does not exist!' });
    }
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json('Server Error');
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      res.status(404).json({ msg: 'User already exist' });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await authService.addUser({ email, hashedPassword, name });
      const token = jwt.sign(
        {
          email: user.email,
          _id: user._id,
        },
        APP_SECRET,
        { expiresIn: '7d' }
      );
      res
        .status(201)
        .json({ token, user: { name: user.name, email: user.email } });
    }
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json('Server Error');
  }
};

export const getProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await authService.findUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
};

export const saveResetToken = async (req, res) => {
  const { email } = req.body;
  try { 
    const resetToken = crypto.randomBytes(32).toString('hex');
    const user = await authService.saveResetToken({ email, resetToken });
    res.status(200).json({ msg: 'resetToken saved' });
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
};
export const verifyTokenAndSavePassword = async (req, res) => {
  const resetToken = req.params.token;
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await authService.verifyTokenAndSavePassword({
      resetToken,
      hashedPassword,
    });
    res.status(200).json({ msg: 'Password changed successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
};
