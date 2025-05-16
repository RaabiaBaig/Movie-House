import Link from 'next/link';
import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs';

export default function GenresPage({ genres, movies, selectedGenre }) {
  const router = useRouter();

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Genres</h1>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link href={`/genres/${genre.id}`}>
              <a>{genre.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      {selectedGenre && (
        <>
          <h2>Movies in "{selectedGenre.name}"</h2>
          {movies.length === 0 ? (
            <p>No movies found for this genre.</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  <Link href={`/movies/${movie.id}`}>
                    <a>{movie.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params, query } = context;
  const genreId = params?.id || query.genre || null;

  const filePath = path.join(process.cwd(), 'public', 'data', 'data.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const genres = jsonData.genres || [];
  let movies = [];
  let selectedGenre = null;

  if (genreId) {
    selectedGenre = genres.find((g) => g.id === genreId) || null;
    if (selectedGenre) {
      movies = jsonData.movies.filter((movie) => movie.genreId === genreId);
    }
  }

  return {
    props: {
      genres,
      movies,
      selectedGenre,
    },
  };
}
