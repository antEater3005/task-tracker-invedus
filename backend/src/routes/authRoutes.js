import express from 'express';
import { userAuth } from '../userAuthMIddleware.js';
import * as authController from '../controller/authController.js';
const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/profile', userAuth, authController.getProfile);

export default authRouter;
