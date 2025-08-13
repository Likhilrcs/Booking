import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Monitor, CreditCard } from 'lucide-react';
import { generateSeats } from '../data/mockData';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import { Seat } from '../types';

const SeatSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedMovie, selectedTheater, selectedShowtime, selectedSeats, setSelectedSeats } = useBooking();
  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    if (!selectedMovie || !selectedTheater || !selectedShowtime) {
      navigate('/movies');
      return;
    }

    const generatedSeats = generateSeats();
    setSeats(generatedSeats);
  }, [selectedMovie, selectedTheater, selectedShowtime, navigate]);

  const handleSeatClick = (seatId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'booked') return;

    const updatedSeats = seats.map(s => {
      if (s.id === seatId) {
        return { ...s, status: s.status === 'selected' ? 'available' : 'selected' } as Seat;
      }
      return s;
    });

    setSeats(updatedSeats);
    
    const newSelectedSeats = updatedSeats.filter(s => s.status === 'selected');
    setSelectedSeats(newSelectedSeats);
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.status === 'booked') return 'bg-red-400 cursor-not-allowed';
    if (seat.status === 'selected') return 'bg-[#02c39a] text-white';
    
    switch (seat.type) {
      case 'vip':
        return 'bg-yellow-200 hover:bg-yellow-300 cursor-pointer';
      case 'premium':
        return 'bg-blue-200 hover:bg-blue-300 cursor-pointer';
      default:
        return 'bg-gray-200 hover:bg-gray-300 cursor-pointer';
    }
  };

  const totalAmount = selectedSeats.reduce((total, seat) => total + seat.price, 0);

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) return;
    navigate('/booking-confirmation');
  };

  if (!selectedMovie || !selectedTheater || !selectedShowtime) {
    return null;
  }

  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 z-10 bg-white/80 backdrop-blur-sm text-[#028090] p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200"
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#05668d] mb-4">
            Select Seats
          </h1>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-[#028090] mb-2">{selectedMovie.title}</h2>
            <p className="text-gray-600">
              {selectedTheater.name} • {selectedShowtime.time} • ₹{selectedShowtime.price}
            </p>
          </div>
        </motion.div>

        {/* Screen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white py-4 rounded-lg mb-4 mx-auto max-w-md">
            <Monitor className="w-8 h-8 mx-auto mb-2" />
            <span className="text-lg font-semibold">SCREEN</span>
          </div>
        </motion.div>

        {/* Seat Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {Object.entries(seatsByRow).map(([row, rowSeats]) => (
                <motion.div
                  key={row}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * row.charCodeAt(0) }}
                  className="flex items-center justify-center mb-4"
                >
                  <span className="w-8 text-center font-bold text-[#05668d] mr-4">{row}</span>
                  <div className="flex space-x-2">
                    {rowSeats.slice(0, 6).map((seat) => (
                      <motion.button
                        key={seat.id}
                        whileHover={{ scale: seat.status !== 'booked' ? 1.1 : 1 }}
                        whileTap={{ scale: seat.status !== 'booked' ? 0.95 : 1 }}
                        onClick={() => handleSeatClick(seat.id)}
                        className={`w-8 h-8 rounded text-xs font-semibold flex items-center justify-center transition-all duration-200 ${getSeatColor(seat)}`}
                        disabled={seat.status === 'booked'}
                      >
                        {seat.number}
                      </motion.button>
                    ))}
                    <div className="w-8" /> {/* Aisle */}
                    {rowSeats.slice(6).map((seat) => (
                      <motion.button
                        key={seat.id}
                        whileHover={{ scale: seat.status !== 'booked' ? 1.1 : 1 }}
                        whileTap={{ scale: seat.status !== 'booked' ? 0.95 : 1 }}
                        onClick={() => handleSeatClick(seat.id)}
                        className={`w-8 h-8 rounded text-xs font-semibold flex items-center justify-center transition-all duration-200 ${getSeatColor(seat)}`}
                        disabled={seat.status === 'booked'}
                      >
                        {seat.number}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center space-x-6 mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <span className="text-sm text-gray-600">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#02c39a] rounded"></div>
              <span className="text-sm text-gray-600">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-400 rounded"></div>
              <span className="text-sm text-gray-600">Booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-200 rounded"></div>
              <span className="text-sm text-gray-600">Premium (₹220)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-yellow-200 rounded"></div>
              <span className="text-sm text-gray-600">VIP (₹300)</span>
            </div>
          </div>
        </motion.div>

        {/* Booking Summary */}
        <AnimatePresence>
          {selectedSeats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 p-6"
            >
              <div className="container mx-auto flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#05668d] mb-1">
                    {selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''} Selected
                  </h3>
                  <p className="text-gray-600">
                    Seats: {selectedSeats.map(seat => seat.id).join(', ')}
                  </p>
                  <p className="text-2xl font-bold text-[#028090] mt-2">
                    Total: ₹{totalAmount}
                  </p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleProceedToPayment}
                  className="bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-xl transition-all duration-200"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Proceed to Payment</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SeatSelectionPage;