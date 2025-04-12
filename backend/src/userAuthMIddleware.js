import jwt from 'jsonwebtoken';
import { APP_SECRET } from './config/index.js';

export const userAuth = async (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) res.status(403).json({ msg: 'Not authorized!' });

  const jwt_token = token.split(' ')[1];
  const user = jwt.verify(jwt_token, APP_SECRET);

  if (!user) res.status(403).json({ msg: 'Not authorized!' });
  req.user = user;
  next();
};
