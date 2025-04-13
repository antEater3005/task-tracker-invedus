import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from '../components/Task';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'status'
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = () => {
      const token = localStorage.getItem('token');
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setTasks(res.data))
        .catch((err) => {
          setError(err.message || 'Failed to fetch tasks');
          console.log(err);
        });
    };
    fetchTasks();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Do you want to delete this task?')) return;
    const token = localStorage.getItem('token');
    axios
      .delete(`${import.meta.env.VITE_BASE_URL}/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => setTasks((prev) => prev.filter((task) => task._id !== id)))
      .catch((err) => {
        setError(err.message || 'Failed to delete task');
        console.log(err);
      });
  };

  const handleToggleComplete = (id) => {
    const token = localStorage.getItem('token');
    axios
      .put(
        `${import.meta.env.VITE_BASE_URL}/api/tasks/mark-complete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() =>
        setTasks((prev) =>
          prev.map((task) =>
            task._id === id ? { ...task, status: !task.status } : task
          )
        )
      )
      .catch((err) => {
        setError(err.message || 'Failed to update task');
        console.log(err);
      });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'status') {
      return a.status - b.status;
    }
    return 0;
  });

  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <button
          onClick={() => navigate('/task-form')}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          + Create Task
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className='border px-2 py-1 rounded'
        >
          <option value='date'>Sort by Due Date</option>
          <option value='status'>Sort by Status</option>
        </select>
      </div>

      {error && <p className='text-red-500'>{error}</p>}

      {sortedTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        sortedTasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;
