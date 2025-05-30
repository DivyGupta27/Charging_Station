import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">⚡ EV Charger App</div>

        {/* Hamburger menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-4">
          <Link to="/map" className="hover:bg-gray-700 px-3 py-2 rounded">Map View</Link>
          <Link to="/chargerlist" className="hover:bg-gray-700 px-3 py-2 rounded">Charger List</Link>
          <Link to="/addcharger" className="hover:bg-gray-700 px-3 py-2 rounded">Add Charger</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:bg-gray-700 px-3 py-2 rounded">Logout</button>
          ) : (
            <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="mt-4 flex flex-col md:hidden space-y-2">
          <Link to="/map" className="hover:bg-gray-700 px-3 py-2 rounded" onClick={() => setMenuOpen(false)}>Map View</Link>
          <Link to="/chargerlist" className="hover:bg-gray-700 px-3 py-2 rounded" onClick={() => setMenuOpen(false)}>Charger List</Link>
          <Link to="/addcharger" className="hover:bg-gray-700 px-3 py-2 rounded" onClick={() => setMenuOpen(false)}>Add Charger</Link>
          {isLoggedIn ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="hover:bg-gray-700 px-3 py-2 rounded">Logout</button>
          ) : (
            <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
