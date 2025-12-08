import React from "react";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const isAuthenticated = localStorage.getItem("token");
  const admin = localStorage.getItem("role") === "admin";
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Bloggify
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>

            {isAuthenticated ? (
              <>
               
                <Link to="/create" className="text-gray-700 hover:text-blue-600">Write</Link>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            )}

            {admin && (
              <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                Admin
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <button onClick={logOut} className="text-gray-700 hover:text-blue-600">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
