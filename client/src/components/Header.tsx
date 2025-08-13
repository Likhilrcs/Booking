import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, User, LogOut, Menu, X, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-[#02c39a] to-[#028090] rounded-lg flex items-center justify-center"
            >
              <Film className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold text-[#05668d]">CinemaHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-[#028090] hover:text-[#02c39a] transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className="text-[#028090] hover:text-[#02c39a] transition-colors duration-200 font-medium"
            >
              Movies
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block">{user.name}</span>
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm text-gray-600">Signed in as</p>
                        <p className="text-sm font-medium text-[#05668d]">{user.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f0f3bd] transition-colors text-[#028090]"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-red-50 transition-colors text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[#028090] hover:text-[#02c39a] font-medium transition-colors duration-200"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#028090]"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-[#028090] hover:text-[#02c39a] transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/movies" 
                  className="text-[#028090] hover:text-[#02c39a] transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Movies
                </Link>
                {!user && (
                  <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full text-left text-[#028090] hover:text-[#02c39a] font-medium transition-colors duration-200">
                        Login
                      </button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;