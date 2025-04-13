import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className='bg-gray-800 text-white p-3'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
        <div onClick={() => navigate('/')} className='text-xl font-bold'>
          TaskTracker
        </div>
        <button className='md:hidden' onClick={() => setOpen(!open)}>
          ☰
        </button>
        {isAuthenticated ? (
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className='hidden md:block bg-blue-500 px-4 py-2 rounded'
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              navigate('/auth');
              setOpen(false);
            }}
            className='hidden md:block bg-blue-500 px-4 py-2 rounded'
          >
            Login
          </button>
        )}
      </div>

      {open && (
        <div className='md:hidden mt-2'>
          {!isAuthenticated ? (
            <button
              onClick={() => {
                navigate('/auth');
                setOpen(false);
              }}
              className='w-full bg-blue-500 py-2 rounded mb-3'
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className='w-full bg-blue-500 py-2 rounded mb-3'
            >
              Logout
            </button>
          )}
          <button
            onClick={() => {
              navigate('/');
              setOpen(false);
            }}
            className='w-full bg-blue-500 py-2 rounded'
          >
            Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
