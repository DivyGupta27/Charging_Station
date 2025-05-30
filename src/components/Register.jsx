import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // ✅ react-router-dom v6 hook for navigation

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData; 

    const userData = { name, email, password };

    try {
      const response = await fetch('https://charging-station-mssh.onrender.com/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 4000,
          theme: "colored",
        });

        setFormData({ name: "", email: "", password: "" }); // ✅ reset form
        navigate('/login'); // ✅ redirect to login
      } else {
        toast.error(data.message || "Signup failed", {
          position: "top-center",
          autoClose: 4000,
          theme: "colored",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="mt-3 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-[20px] rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold mb-2 text-center">Register</h2>
        <p className='flex justify-center text-gray-600 text-xs mb-4'>Sign up to create an account</p>

        <label htmlFor="user" className="block mb-2 font-medium text-gray-800">Username</label>
        <input
          id="user"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          required
        />

        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          required
        />

        <label htmlFor="pass" className="block mb-2 text-sm font-medium text-gray-800">Password</label>
        <input
          id="pass"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-6 border border-gray-300 rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 transition"
        >
          Register
        </button>
        <p className="px-6 text-sm text-center text-gray-600">
              have an account yet?{' '}
              <Link to="/login" className="hover:underline text-black">
                Login
              </Link>.
            </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
