import { useState } from 'react';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

export default function MoviesPage({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filteredMovies =
    selectedGenre === 'all'
      ? movies
      : movies.filter(movie => movie.genre === selectedGenre);

  return (
    <div>
      <h1>Movies</h1>

      <div>
        <label>Filter by Genre: </label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="all">All</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const movies = data.movies;
  const genres = [...new Set(movies.map((movie) => movie.genre))];

  return {
    props: {
      movies,
      genres,
    },
  };
}
