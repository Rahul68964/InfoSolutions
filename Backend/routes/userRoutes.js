import express from 'express';
import { csvDownloader, getAllTasks, loginUser, signupUser } from '../controllers/userController.js';
import authUser from '../middlewares/userAuth.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/signup', signupUser);
userRouter.post('/getAllTasks',authUser,  getAllTasks);
userRouter.post('/downloadcsv', csvDownloader);

export default userRouter;