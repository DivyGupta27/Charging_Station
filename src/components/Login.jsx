import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://charging-station-mssh.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Login successful!', { position: 'top-center' });
        localStorage.setItem('token', data.token); // Save token to local storage

        navigate('/chargerlist'); // Redirect to home page or dashboard
      } else {
        toast.error(data.message || 'Login failed', { position: 'top-center' });
      }

    } catch (error) {
      console.error(data.message, error);
      toast.error('Something went wrong', { position: 'top-center' });
    }
  };

  return (
    <div className='flex justify-center pt-5'>
      <div className="flex flex-col w-[500px] p-6 rounded-md sm:p-10 bg-white shadow-2xl text-black">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Please Login First</h1>
          <p className="text-sm text-gray-600">Login to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">Password</label>
                <a href="#" className="text-xs hover:underline text-gray-600">Forgot password?</a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
              >
                Sign in
              </button>
            </div>
            <p className="px-6 text-sm text-center text-gray-600">
              Don't have an account yet?{' '}
              <Link to="/register" className="hover:underline text-black">
                Register
              </Link>.
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
