import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { task } = state || {};

  const [error, setError] = useState('');
  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const [newTask, setNewTask] = useState(
    task
      ? {
          ...task,
          dueDate: formatDate(task.dueDate),
        }
      : {
          title: '',
          description: '',
          dueDate: '',
        }
  );
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newTask.description.length < 4 ||
      newTask.title.length < 4 ||
      newTask.dueDate === ''
    ) {
      setError('Please fill all details!');
      return;
    }

    const token = localStorage.getItem('token');
    const url = task
      ? `${import.meta.env.VITE_BASE_URL}/api/tasks/${task._id}`
      : `${import.meta.env.VITE_BASE_URL}/api/tasks`;

    const method = task ? axios.put : axios.post;

    method(url, newTask, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        setError(err.response?.data?.msg || 'Something went wrong');
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md mx-auto mt-6 p-4 bg-white rounded shadow space-y-4'
    >
      <h2 className='text-xl font-bold text-center'>
        {task ? 'Update Task' : 'Add New Task'}
      </h2>
      <p className='text-red-500'>{error}</p>

      <input
        type='text'
        name='title'
        placeholder='Title'
        value={newTask.title}
        onChange={handleChange}
        className='w-full p-2 border rounded'
        required
      />

      <textarea
        name='description'
        placeholder='Description'
        value={newTask.description}
        onChange={handleChange}
        className='w-full p-2 border rounded'
        required
      />

      <input
        type='date'
        name='dueDate'
        value={newTask.dueDate}
        onChange={handleChange}
        className='w-full p-2 border rounded'
        required
      />

      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
      >
        {task ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default Form;
