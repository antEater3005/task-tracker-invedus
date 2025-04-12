import * as authService from '../services/authService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config/index.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await authService.findUserByEmail(email);

    if (existingUser) {
      if (bcrypt.compare(password, existingUser.password)) {
        const token = await jwt.sign(
          { email: existingUser.email, _id: existingUser._id },
          APP_SECRET,
          {
            expiresIn: '7d',
          }
        );
        res.status(200).json(token);
      } else {
        res.status(403).json({ msg: 'wrong credentials' });
      }
    } else {
      res.status(404).json({ msg: 'User does not exist!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      res.status(404).json({ msg: 'User already exist' });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await authService.addUser({ email, hashedPassword });
      const token = jwt.sign(
        {
          email: user.email,
          _id: user._id,
        },
        APP_SECRET,
        { expiresIn: '7d' }
      );
      res.status(201).json(token);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
};

export const getProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await authService.findUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Server Error');
  }
};
