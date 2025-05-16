import { useState } from 'react';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';

export default function MoviesPage({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('');

  // Filter movies by selected genre
  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genreId === selectedGenre)
    : movies;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>All Movies</h1>

      <label htmlFor="genre-select">Filter by Genre:</label>
      <select
        id="genre-select"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        style={{ marginLeft: '0.5rem', marginBottom: '1rem' }}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {filteredMovies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <a
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                width: '200px',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <h3>{movie.title}</h3>
              <p><strong>Year:</strong> {movie.releaseYear}</p>
              <p><strong>Rating:</strong> {movie.rating}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'data.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return {
    props: {
      movies: jsonData.movies || [],
      genres: jsonData.genres || [],
    },
    revalidate: 10,
  };
}
