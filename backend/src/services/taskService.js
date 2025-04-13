import Task from '../models/taskModel.js';

export const createTask = async ({ userId, title, description, dueDate }) => {
  try {
    const task = new Task({ userId, title, description, dueDate });
    await task.save();
    return task;
  } catch (error) {
    throw Error('Cannot create task' + error.message);
  }
};
export const getTasksById = async (taskId) => {
  try {
    return await Task.findById(taskId);
  } catch (error) {
    throw Error('Cannot find task' + error.message);
  }
};

export const changeStatus = async ({ taskId }) => {
  try {
    const task = await Task.findById(taskId);
    task.status = !task.status;
    return await task.save();
  } catch (error) {
    throw Error('Cannot changing status of task' + error.message);
  }
};
export const getTasksByUserId = async (userId) => {
  try {
    return await Task.find({ userId });
  } catch (error) {
    throw Error('Cannot find task' + error.message);
  }
};
export const editTask = async ({
  taskId,
  description,
  title,
  status,
  dueDate,
}) => {
  try {
    return await Task.findByIdAndUpdate(
      taskId,
      {
        description,
        title,
        status,
        dueDate,
      },
      { new: true }
    );
  } catch (error) {
    throw Error('cannot update task' + error.message);
  }
};
export const deleteTask = async (taskId) => {
  try {
    return await Task.findByIdAndDelete(taskId);
  } catch (error) {
    throw Error('cannot delete task' + error.message);
  }
};
