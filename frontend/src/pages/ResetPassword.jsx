import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMsg('Passwords do not match');
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/reset-password/${token}`,
        { password }
      );
      setMsg('Password reset successful');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMsg('Error resetting password');
      console.log(err);
    }
  };

  return (
    <div className=' justify-self-center py-4 '>
      <h2 className='text-2xl'>Reset Password</h2>
      <p style={{ color: 'red' }}>{msg}</p>
      <form onSubmit={handleSubmit} className=' justify-self-center '>
        <input
          type='password'
          placeholder='New Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='block p-1 border-2 rounded-sm border-gray-600 my-2'
        />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className='block p-1 border-2 rounded-sm border-gray-600 my-2'
        />
        <button
          type='submit'
          className='bg-blue-600 px-4 rounded text-amber-50 py-2 hover:bg-blue-700 cursor-pointer'
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
