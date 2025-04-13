import express from 'express';

import * as taskController from '../controller/taskController.js';
import { userAuth } from '../userAuthMIddleware.js';

const taskRouter = express.Router();

taskRouter.get('/', userAuth, taskController.getTaskByUserId);
taskRouter.post('/', userAuth, taskController.createTask);
taskRouter.put('/:taskId', userAuth, taskController.editTask);
taskRouter.put('/mark-complete/:taskId', userAuth, taskController.markComplete);
taskRouter.delete('/:taskId', userAuth, taskController.deleteTask);

export default taskRouter;
