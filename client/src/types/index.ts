export interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  rating: number;
  duration: number;
  genre: string[];
  language: string[];
  releaseDate: string;
  cast: string[];
  director: string;
  synopsis: string;
  trending?: boolean;
  upcoming?: boolean;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  totalSeats?: number;
}

export interface Showtime {
  id: string;
  time: string;
  price: number;
  availableSeats: number;
  movieId?: string;
  theaterId?: string;
  date?: Date;
  totalSeats?: number;
  isActive?: boolean;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'regular' | 'premium' | 'vip';
  status: 'available' | 'booked' | 'selected';
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  movieId: string;
  theaterId: string;
  showtimeId: string;
  seats: Seat[];
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

export interface BookingContextType {
  selectedMovie: Movie | null;
  selectedTheater: Theater | null;
  selectedShowtime: Showtime | null;
  selectedSeats: Seat[];
  totalAmount: number;
  setSelectedMovie: (movie: Movie | null) => void;
  setSelectedTheater: (theater: Theater | null) => void;
  setSelectedShowtime: (showtime: Showtime | null) => void;
  setSelectedSeats: (seats: Seat[]) => void;
  clearBooking: () => void;
}