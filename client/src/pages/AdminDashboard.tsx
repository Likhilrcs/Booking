import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Film, 
  MapPin, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { movies, theaters } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [showAddTheaterModal, setShowAddTheaterModal] = useState(false);

  React.useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login');
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) {
    return null;
  }

  // Mock analytics data
  const analyticsData = {
    totalBookings: 1247,
    totalRevenue: 156890,
    totalMovies: movies.length,
    totalTheaters: theaters.length,
    monthlyBookings: [120, 190, 300, 500, 200, 300, 400, 350, 450, 200, 350, 300],
    revenueData: [15000, 25000, 35000, 45000, 25000, 35000, 45000, 40000, 50000, 30000, 40000, 35000],
  };

  const StatCard = ({ icon: Icon, title, value, trend, color }: any) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center space-x-1 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">{trend}</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-[#05668d] mb-1">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </motion.div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'theaters', label: 'Theaters', icon: MapPin },
    { id: 'bookings', label: 'Bookings', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#05668d] mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}! Here's what's happening with your cinema.</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg mb-8"
        >
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-[#02c39a] border-b-2 border-[#02c39a] bg-[#02c39a]/5'
                    : 'text-gray-600 hover:text-[#028090]'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Users}
                title="Total Bookings"
                value={analyticsData.totalBookings.toLocaleString()}
                trend="+12.5%"
                color="bg-gradient-to-r from-[#02c39a] to-[#00a896]"
              />
              <StatCard
                icon={DollarSign}
                title="Total Revenue"
                value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
                trend="+8.2%"
                color="bg-gradient-to-r from-[#028090] to-[#05668d]"
              />
              <StatCard
                icon={Film}
                title="Active Movies"
                value={analyticsData.totalMovies}
                color="bg-gradient-to-r from-[#00a896] to-[#028090]"
              />
              <StatCard
                icon={MapPin}
                title="Partner Theaters"
                value={analyticsData.totalTheaters}
                color="bg-gradient-to-r from-[#05668d] to-[#02c39a]"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-[#05668d] mb-6">Monthly Bookings</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {analyticsData.monthlyBookings.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${(value / 500) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="bg-gradient-to-t from-[#02c39a] to-[#00a896] rounded-t flex-1 min-h-4"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-sm text-gray-600">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-[#05668d] mb-6">Revenue Trend</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {analyticsData.revenueData.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${(value / 50000) * 100}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="bg-gradient-to-t from-[#028090] to-[#05668d] rounded-t flex-1 min-h-4"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-sm text-gray-600">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Movies Tab */}
        {activeTab === 'movies' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#05668d]">Manage Movies</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddMovieModal(true)}
                className="bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Add Movie</span>
              </motion.button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Movie
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Genre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {movies.map((movie) => (
                      <tr key={movie.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-16 w-12 rounded object-cover"
                              src={movie.poster}
                              alt={movie.title}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{movie.title}</div>
                              <div className="text-sm text-gray-500">{movie.duration} min</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{movie.rating}/10</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{movie.genre.slice(0, 2).join(', ')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            movie.upcoming ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {movie.upcoming ? 'Upcoming' : 'Now Showing'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-[#02c39a] hover:text-[#028090]">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Theaters Tab */}
        {activeTab === 'theaters' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#05668d]">Manage Theaters</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddTheaterModal(true)}
                className="bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Add Theater</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {theaters.map((theater) => (
                <motion.div
                  key={theater.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#05668d] mb-1">{theater.name}</h3>
                      <p className="text-gray-600 text-sm">{theater.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-[#02c39a] hover:text-[#028090]">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Showtimes: {theater.showtimes.length}</p>
                    <div className="flex flex-wrap gap-1">
                      {theater.showtimes.slice(0, 3).map((showtime) => (
                        <span
                          key={showtime.id}
                          className="bg-[#f0f3bd] text-[#028090] px-2 py-1 rounded text-xs"
                        >
                          {showtime.time}
                        </span>
                      ))}
                      {theater.showtimes.length > 3 && (
                        <span className="text-xs text-gray-500">+{theater.showtimes.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-[#05668d]">Recent Bookings</h2>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Movie
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Theater
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Mock booking data */}
                    {[
                      { id: 'BK12345678', customer: 'John Doe', movie: 'Avengers: Endgame', theater: 'CineMax Grand', amount: 450, status: 'Confirmed' },
                      { id: 'BK12345679', customer: 'Jane Smith', movie: 'Spider-Man: No Way Home', theater: 'PVR Phoenix', amount: 520, status: 'Confirmed' },
                      { id: 'BK12345680', customer: 'Mike Johnson', movie: 'The Batman', theater: 'INOX City Centre', amount: 380, status: 'Cancelled' },
                    ].map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.movie}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.theater}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{booking.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;