import { Movie, Theater, Seat } from '../types';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Avengers: Endgame',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 8.4,
    duration: 181,
    genre: ['Action', 'Adventure', 'Drama'],
    language: ['English', 'Hindi'],
    releaseDate: '2024-04-26',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth'],
    director: 'Anthony Russo, Joe Russo',
    synopsis: 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos.',
    trending: true
  },
  {
    id: '2',
    title: 'Spider-Man: No Way Home',
    poster: 'https://images.pexels.com/photos/8241328/pexels-photo-8241328.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8241328/pexels-photo-8241328.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 8.7,
    duration: 148,
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    language: ['English', 'Hindi'],
    releaseDate: '2024-12-17',
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch', 'Jacob Batalon'],
    director: 'Jon Watts',
    synopsis: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.',
    trending: true,
    upcoming: true
  },
  {
    id: '3',
    title: 'The Batman',
    poster: 'https://images.pexels.com/photos/8828409/pexels-photo-8828409.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8828409/pexels-photo-8828409.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 7.8,
    duration: 176,
    genre: ['Action', 'Crime', 'Drama'],
    language: ['English', 'Hindi'],
    releaseDate: '2024-03-04',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Jeffrey Wright', 'Colin Farrell'],
    director: 'Matt Reeves',
    synopsis: 'When a killer targets Gotham\'s elite with a series of sadistic machinations, a trail of cryptic clues sends the World\'s Greatest Detective on an investigation into the underworld.',
    trending: true
  },
  {
    id: '4',
    title: 'Dune: Part Two',
    poster: 'https://images.pexels.com/photos/8134589/pexels-photo-8134589.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8134589/pexels-photo-8134589.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 8.5,
    duration: 166,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    language: ['English', 'Hindi'],
    releaseDate: '2024-03-01',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Oscar Isaac'],
    director: 'Denis Villeneuve',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    upcoming: true
  },
  {
    id: '5',
    title: 'Top Gun: Maverick',
    poster: 'https://images.pexels.com/photos/8134545/pexels-photo-8134545.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/8134545/pexels-photo-8134545.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 8.3,
    duration: 130,
    genre: ['Action', 'Drama'],
    language: ['English', 'Hindi'],
    releaseDate: '2024-05-27',
    cast: ['Tom Cruise', 'Miles Teller', 'Jennifer Connelly', 'Jon Hamm'],
    director: 'Joseph Kosinski',
    synopsis: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN\'s elite graduates on a mission.',
    upcoming: true
  },
  {
    id: '6',
    title: 'Black Panther: Wakanda Forever',
    poster: 'https://images.pexels.com/photos/7991438/pexels-photo-7991438.jpeg?auto=compress&cs=tinysrgb&w=400',
    backdrop: 'https://images.pexels.com/photos/7991438/pexels-photo-7991438.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 6.7,
    duration: 161,
    genre: ['Action', 'Adventure', 'Drama'],
    language: ['English', 'Hindi'],
    releaseDate: '2024-11-11',
    cast: ['Letitia Wright', 'Lupita Nyong\'o', 'Danai Gurira', 'Angela Bassett'],
    director: 'Ryan Coogler',
    synopsis: 'The people of Wakanda fight to protect their home from intervening world powers as they mourn the loss of King T\'Challa.',
    upcoming: true
  }
];

export const theaters: Theater[] = [
  {
    id: '1',
    name: 'CineMax Grand',
    location: 'Downtown Plaza, Mumbai',
    totalSeats: 120
  },
  {
    id: '2',
    name: 'PVR Phoenix',
    location: 'Phoenix Mall, Bangalore',
    totalSeats: 120
  },
  {
    id: '3',
    name: 'INOX City Centre',
    location: 'City Centre Mall, Delhi',
    totalSeats: 120
  }
];

export const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  
  rows.forEach((row, rowIndex) => {
    for (let seatNum = 1; seatNum <= 12; seatNum++) {
      const seatType = rowIndex < 3 ? 'vip' : rowIndex < 6 ? 'premium' : 'regular';
      const price = seatType === 'vip' ? 300 : seatType === 'premium' ? 220 : 150;
      const status = Math.random() > 0.7 ? 'booked' : 'available';
      
      seats.push({
        id: `${row}${seatNum}`,
        row,
        number: seatNum,
        type: seatType,
        status: status as 'available' | 'booked',
        price
      });
    }
  });
  
  return seats;
};