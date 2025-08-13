import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BookingContextType, Movie, Theater, Showtime, Seat } from '../types';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const totalAmount = selectedSeats.reduce((total, seat) => total + seat.price, 0);

  const clearBooking = () => {
    setSelectedMovie(null);
    setSelectedTheater(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
  };

  const value = {
    selectedMovie,
    selectedTheater,
    selectedShowtime,
    selectedSeats,
    totalAmount,
    setSelectedMovie,
    setSelectedTheater,
    setSelectedShowtime,
    setSelectedSeats,
    clearBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};