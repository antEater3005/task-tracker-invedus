import * as taskService from '../services/taskService.js';

export const createTask = async (req, res) => {
  const userId = req.user._id;

  const { title, description, dueDate } = req.body;
  try {
    const task = await taskService.createTask({
      userId,
      title,
      description,
      dueDate,
    });
    res.status(200).json({ msg: 'task created', task: task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await taskService.getTasksById(taskId);
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const editTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, dueDate, status } = req.body;
  try {
    const updatedTask = await taskService.editTask({
      taskId,
      description,
      title,
      status,
      dueDate,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    await taskService.deleteTask(taskId);
    res.status(200).json({ msg: 'task deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const getTaskByUserId = async (req, res) => {
  const userId = req.user._id;
  try {
    const tasks = await taskService.getTasksByUserId(userId);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
