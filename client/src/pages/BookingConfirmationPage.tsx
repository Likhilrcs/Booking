import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, MapPin, Mail, MessageSquare, Download, Home } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';

const BookingConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedMovie, selectedTheater, selectedShowtime, selectedSeats, totalAmount, clearBooking } = useBooking();
  const [bookingId] = useState(() => 'BK' + Date.now().toString().slice(-8));

  useEffect(() => {
    if (!selectedMovie || !selectedTheater || !selectedShowtime || selectedSeats.length === 0) {
      navigate('/');
      return;
    }
  }, [selectedMovie, selectedTheater, selectedShowtime, selectedSeats, navigate]);

  const handleNewBooking = () => {
    clearBooking();
    navigate('/movies');
  };

  const handleGoHome = () => {
    clearBooking();
    navigate('/');
  };

  if (!selectedMovie || !selectedTheater || !selectedShowtime || selectedSeats.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-center mb-8"
        >
          <CheckCircle className="w-24 h-24 text-[#02c39a] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#05668d] mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 text-lg">Your tickets have been successfully booked</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ticket Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">E-Ticket</h2>
                  <p className="opacity-90">Booking ID: {bookingId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Amount Paid</p>
                  <p className="text-2xl font-bold">₹{totalAmount}</p>
                </div>
              </div>
            </div>

            {/* Movie Details */}
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="w-20 h-28 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#05668d] mb-2">{selectedMovie.title}</h3>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date().toDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{selectedShowtime.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedTheater.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seat Details */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-[#05668d] mb-3">Seat Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Seats</p>
                    <p className="font-semibold">{selectedSeats.map(seat => seat.id).join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold capitalize">{selectedSeats[0]?.type}</p>
                  </div>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <div className="w-32 h-32 bg-gray-300 mx-auto rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">QR Code</span>
                  </div>
                  <p className="text-sm text-gray-600">Show this QR code at the theater</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* User Details & Actions */}
          <div className="space-y-6">
            {/* User Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-[#05668d] mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Customer Name</p>
                  <p className="font-semibold">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold">{user?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Theater</p>
                  <p className="font-semibold">{selectedTheater.name}</p>
                  <p className="text-sm text-gray-500">{selectedTheater.location}</p>
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-[#f0f3bd] to-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-[#05668d] mb-4">Notifications Sent</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#02c39a] rounded-full p-2">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#028090]">Email Confirmation</p>
                    <p className="text-sm text-gray-600">Sent to {user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-[#00a896] rounded-full p-2">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#028090]">SMS Notification</p>
                    <p className="text-sm text-gray-600">Sent to {user?.phone}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-[#028090] to-[#05668d] text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-200"
              >
                <Download className="w-5 h-5" />
                <span>Download Ticket</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNewBooking}
                className="w-full bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Book Another Movie
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGoHome}
                className="w-full border-2 border-[#028090] text-[#028090] py-3 px-6 rounded-lg font-semibold hover:bg-[#028090] hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Go to Home</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6"
        >
          <h3 className="font-bold text-yellow-800 mb-3">Important Information</h3>
          <ul className="text-yellow-700 space-y-2 text-sm">
            <li>• Please arrive at the theater at least 30 minutes before showtime</li>
            <li>• Carry a valid ID proof along with your e-ticket</li>
            <li>• Outside food and beverages are not allowed</li>
            <li>• Cancellation is allowed up to 2 hours before showtime</li>
            <li>• For any assistance, contact our helpline: +91 1800-123-4567</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;