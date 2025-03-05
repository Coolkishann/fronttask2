

import React, { useEffect, useState } from "react";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false); // 🔹 State to toggle logout button
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const loggedInUserId = localStorage.getItem("loggedInUserId");
      const { data } = await axios.get(`/api/users/me/${loggedInUserId}`);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`/api/auth/logout`);
      setUser(null);
      toast.success("Logged out successfully");
      navigate(`${import.meta.env.VITE_API_BASE_URL}/auth`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header className="flex items-center justify-center bg-gray-100 px-6 py-3 shadow-md">
      <div className="w-full max-w-5xl flex items-center justify-between bg-gray-200 px-4 py-2 rounded-xl">
        {/* 🔍 Search Input */}
        <div className="relative flex items-center w-full max-w-md">
          <FaSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search Project"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* 👤 User Profile */}
        {user && (
          <div className="relative">
            {/* Profile Button */}
            <button
              className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg border border-gray-300"
              onClick={() => setShowLogout(!showLogout)} // 🔹 Toggle logout button
            >
              <div className="text-left">
                <h1 className="font-semibold text-sm capitalize">{user.username}</h1>
                {/* <p className="text-gray-500 text-xs">{user.email}</p> */}
              </div>
              <FaUserAlt className="text-gray-600" />
            </button>

            {/* 🚪 Logout Button (Visible on Click) */}
            {showLogout && (
              <button
                onClick={handleLogout}
                className="absolute right-0 mt-2 w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white shadow-md"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
