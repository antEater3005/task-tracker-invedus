import React from 'react';
import { useNavigate } from 'react-router-dom';

const Task = ({ task, onDelete, onToggleComplete }) => {
  const navigate = useNavigate();
  return (
    <div className='bg-white p-4 rounded shadow mb-4'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>{task.title}</h3>
        <span
          className={`text-sm px-2 py-1 rounded ${
            task.status
              ? 'bg-green-200 text-green-800'
              : 'bg-yellow-200 text-yellow-800'
          }`}
        >
          {task.status ? 'Completed' : 'Pending'}
        </span>
      </div>

      <p className='text-gray-700 mt-2'>{task.description}</p>

      <div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>

      <div className='flex gap-2 mt-4'>
        <button
          onClick={() => onToggleComplete(task._id)}
          className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
        >
          {task.status ? 'Mark Incomplete' : 'Mark Complete'}
        </button>

        <button
          onClick={() => {
            navigate('/task-form', { state: { task } });
          }}
          className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600'
        >
          Update
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
