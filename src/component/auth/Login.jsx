import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await axios.post(`https://back-task2.onrender.com/api/auth/login`, { email, password });
      const { id: loggedInUserId } = response.data;
      localStorage.setItem('loggedInUserId', loggedInUserId);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToRegister = () => {
    navigate('/auth/register');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-96 bg-gray-50 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Login to ToDoFusion</h1>
        <form className="space-y-4" onSubmit={login}>
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-700">Email:</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="Email" 
              required 
              className="w-full px-4 py-2 rounded border bg-gray-100 text-gray-900 focus:outline-none focus:border-gray-900" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700">Password:</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Password" 
              required 
              className="w-full px-4 py-2 rounded border bg-gray-100 text-gray-900 focus:outline-none focus:border-gray-900" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-950 transition duration-300"
          >
            Login
          </button>
          <p 
            className="mt-2 text-gray-600 text-center cursor-pointer hover:text-gray-800" 
            onClick={navigateToRegister}
          >
            Don't have an account? <span className="text-gray-900 hover:underline">Register here.</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
