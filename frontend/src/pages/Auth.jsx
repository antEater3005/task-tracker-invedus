import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgetPass, setIsForgetPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, form)
        .then((res) => {
          login(res.data);
          navigate('/');
        })
        .catch((err) => {
          setError(err.msg);
          console.log(err);
        });
    } else {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, form)
        .then((res) => {
          login(res.data);
          navigate('/');
        })
        .catch((err) => {
          setError(err.msg);
          console.log(err);
        });
    }
  };

  const handleForgetPass = () => {
    if (!window.confirm('Do you want to reset your password?')) return;

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/auth/forget-password`, form)
      .then((res) => {
        window.alert('Password reset link sent to your email!');
        navigate('/');
      })
      .catch((err) => {
        setError(err.msg || 'Cannot reset password, Try later!');
        console.log(err);
      });
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-sm'>
        <p className='text-md text-red-600 font-medium text-center'>{error}</p>
        <h2 className='text-xl font-bold text-center mb-4'>
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <div className='flex justify-center gap-2 mb-4'>
          <button
            onClick={() => {
              setIsLogin(true);
              setIsForgetPass(false);
            }}
            className={`px-4 py-1 border ${
              isLogin ? 'bg-blue-500 text-white' : ''
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setIsForgetPass(false);
            }}
            className={`px-4 py-1 border ${
              !isLogin ? 'bg-blue-500 text-white' : ''
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          {!isLogin && (
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={form.name}
              onChange={handleChange}
              required
              className='border p-2 w-full'
            />
          )}

          <input
            type='email'
            name='email'
            placeholder='Email'
            value={form.email}
            onChange={handleChange}
            required
            className='border p-2 w-full'
          />

          {!isForgetPass && (
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={form.password}
              onChange={handleChange}
              required
              className='border p-2 w-full'
            />
          )}

          <button type='submit' className='bg-blue-500 text-white py-2'>
            {isLogin ? 'Login' : 'Register'}
          </button>
          {isLogin && (
            <button
              type='button'
              onClick={() => {
                isForgetPass ? handleForgetPass() : setIsForgetPass(true);
              }}
              className='bg-red-500 text-white py-2'
            >
              {!isForgetPass ? 'Forget Password' : 'Send reset link'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
